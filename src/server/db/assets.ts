"use server";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db, isCurrentUserAdmin } from "~/server/db";
import { assets } from "~/server/db/schema";

// export async function createAsset(name: string) {
//   const user = auth();
//   if (!(await isUserAdmin(user.userId))) throw new Error("Unauthorized");

//   console.log("Create new asset:", {
//     name: name,
//     createdBy: user.userId,
//   });

//   const result = await db.insert(assets).values({
//     name: name,
//     createdBy: user.userId,
//     updatedBy: user.userId,
//   });
//   console.log("Asset created:", result);

//   return {};
// }

export async function getAssets() {
  return await db.query.assets.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: {
      images: true,
    },
  });
}

export async function getMyAssets() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  return await db.query.assets.findMany({
    where: (model, { eq }) => eq(model.createdBy, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: {
      images: true,
    },
  });
}

export async function getAsset(id: number) {
  return await db.query.assets.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      images: true,
    },
  });
}

export async function deleteAsset(id: number) {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const result = await db.delete(assets).where(eq(assets.id, id));
  console.log("Asset deleted:", result);

  // This will redirect the user to the homepage
  redirect("/");
}
