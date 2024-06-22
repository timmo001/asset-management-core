"use server";
import { auth } from "@clerk/nextjs/server";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function createPost(title: string) {
  const user = auth();

  console.log("Create new post:", {
    title: title,
    createdBy: user.userId,
  });

  const result = await db.insert(posts).values({
    title: title,
    createdBy: user.userId,
    updatedBy: user.userId,
  });
  console.log("Post created:", result);

  return {};
}

export async function getPosts() {
  return await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function getMyPosts() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
  });
}

export async function getPost(id: number) {
  return await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
}
