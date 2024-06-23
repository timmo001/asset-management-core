"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db, isCurrentUserAdmin, isUserAdmin } from "~/server/db";
import {
  images,
  InsertPost,
  posts,
  SelectPost,
  SelectPosts,
} from "~/server/db/schema";

// ------------------------------------------------
// CRUD
// ------------------------------------------------

// Create a new post
export async function createPost(title: string): Promise<void> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!(await isUserAdmin(user.userId))) throw new Error("Unauthorized");

  console.log("Create new post:", {
    title,
    createdBy: user.userId,
  });

  const result = await db
    .insert(posts)
    .values({
      title,
      createdBy: user.userId,
    })
    .returning();
  console.log("Insert result:", result);
  if (result.length === 0 || !result[0])
    throw new Error("Failed to create post");

  redirect(`/posts/${result[0].id}/edit`);
}

// Get all posts
export async function getPosts(): Promise<SelectPosts> {
  return await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

// Get all posts created by the current user
export async function getMyPosts(): Promise<SelectPosts> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

// Get a single post by ID
export async function getPost(id: number): Promise<SelectPost | undefined> {
  return await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
}

// Update a post by ID
export async function updatePost(
  post: InsertPost & { id: number },
): Promise<void> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  console.log("Update post:", post);

  const result = await db
    .update(posts)
    .set({
      ...post,
      updatedBy: user.userId,
    })
    .where(eq(posts.id, post.id));
  console.log("Update result:", result);

  redirect(`/posts/${post.id}`);
}

// Delete a post by ID
export async function deletePost(id: number): Promise<void> {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const result = await db.delete(posts).where(eq(posts.id, id));
  console.log("Delete result:", result);

  // This will redirect the user to the homepage
  redirect("/");
}
