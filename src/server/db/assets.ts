"use server";
import { auth } from "@clerk/nextjs/server";

import { db } from "~/server/db";
import { assets } from "~/server/db/schema";

export async function createAsset(name: string) {
  const user = auth();

  console.log("Create new asset:", {
    name: name,
    createdBy: user.userId,
  });

  const result = await db.insert(assets).values({
    name: name,
    createdBy: user.userId,
    updatedBy: user.userId,
  });
  console.log("Asset created:", result);

  return {};
}

export async function getAssets() {
  return await db.query.assets.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function getMyAssets() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.assets.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

export async function getAsset(id: number) {
  return await db.query.assets.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
}
