"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db, isCurrentUserAdmin, isUserAdmin } from "~/server/db";
import {
  assets,
  InsertAsset,
  SelectAsset,
  SelectAssets,
} from "~/server/db/schema";

// Create new asset
export async function createAsset(name: string): Promise<void> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!(await isUserAdmin(user.userId))) throw new Error("Unauthorized");

  console.log("Create new asset:", {
    name,
    createdBy: user.userId,
  });

  const result = await db
    .insert(assets)
    .values({
      name,
      createdBy: user.userId,
    })
    .returning();
  console.log("Insert result:", result);
  if (result.length === 0 || !result[0])
    throw new Error("Failed to create asset");

  redirect(`/assets/${result[0].id}/edit`);
}

// Get all assets
export async function getAssets(): Promise<SelectAssets> {
  return await db.query.assets.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
}

// Get all assets created by the current user
export async function getMyAssets(): Promise<SelectAssets> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.assets.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    // with: {
    //   images: true,
    // },
  });
}

// Get a single asset by ID
export async function getAsset(id: number): Promise<SelectAsset | undefined> {
  return await db.query.assets.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    // with: {
    //   images: true,
    // },
  });
}

// Update an asset by ID
export async function updateAsset(
  asset: InsertAsset & { id: number },
): Promise<void> {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  console.log("Update asset:", asset);

  const result = await db
    .update(assets)
    .set({
      ...asset,
      updatedAt: new Date(),
    })
    .where(eq(assets.id, asset.id));

  console.log("Updated asset:", result);

  // This will redirect the user to the homepage
  redirect(`/assets/${asset.id}`);
}

// Delete an asset by ID
export async function deleteAsset(id: number): Promise<void> {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const result = await db.delete(assets).where(eq(assets.id, id));
  console.log("Asset deleted:", result);

  // This will redirect the user to the homepage
  redirect("/");
}
