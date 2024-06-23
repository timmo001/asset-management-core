"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UploadedFileData } from "uploadthing/types";

import { db, isCurrentUserAdmin } from "~/server/db";
import { postImage, posts } from "~/server/db/schema";

// export async function createPost(title: string) {
//   const user = auth();
//   if (!(await isUserAdmin(user.userId))) throw new Error("Unauthorized");

//   console.log("Create new post:", {
//     title: title,
//     createdBy: user.userId,
//   });

//   const result = await db.insert(posts).values({
//     title: title,
//     createdBy: user.userId,
//     updatedBy: user.userId,
//   });
//   console.log("Post created:", result);

//   return {};
// }

export async function getPosts() {
  return await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    // with: {
    //   image: true,
    // },
  });
}

export async function getMyPosts() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    // with: {
    //   image: true,
    // },
  });
}

export async function getPost(id: number) {
  return await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    // with: {
    //   image: true,
    // },
  });
}

export async function updatePostImage(
  file: UploadedFileData,
  postId: number,
  userId: string,
) {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const existing = await db.query.postImage.findFirst({
    where: (model, { eq }) => eq(model.postId, postId),
  });

  if (existing?.id) {
    const result = await db
      .update(postImage)
      .set({
        url: file.url,
        description: file.name,
        createdBy: userId,
      })
      .where(eq(postImage.id, existing.id));

    console.log("Updated post image:", result.rows[0]);

    // This is sent to the clientside `onClientUploadComplete` callback
    return result.rows[0];
  } else {
    const result = await db.insert(postImage).values({
      postId: postId,
      url: file.url,
      description: file.name,
      createdBy: userId,
    });

    console.log("Inserted post image:", result.rows[0]);

    // This is sent to the clientside `onClientUploadComplete` callback
    return result.rows[0];
  }
}

export async function deletePost(id: number) {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const result = await db.delete(posts).where(eq(posts.id, id));
  console.log("Deleted post:", result);

  // This will redirect the user to the homepage
  redirect("/");
}
