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
