"use server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UploadedFileData } from "uploadthing/types";

import { db, isCurrentUserAdmin, isUserAdmin } from "~/server/db";
import { images, SelectImage, SelectImages } from "~/server/db/schema";

// Get images by identifier
export async function getImagesByIdentifier(
  identifier: string,
): Promise<SelectImages> {
  return await db.query.images.findMany({
    where: (model, { eq }) => eq(model.identifier, identifier),
  });
}

// Get an image by identifier
export async function getImageByIdentifier(
  identifier: string,
): Promise<SelectImage | undefined> {
  return await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.identifier, identifier),
  });
}

// Update or create an image
export async function updateImage(
  identifier: string,
  file: UploadedFileData,
  user?: any,
): Promise<SelectImage> {
  user = user || auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!(await isUserAdmin(user.userId))) throw new Error("Unauthorized");

  const existing = await getImageByIdentifier(identifier);

  if (existing?.id) {
    const result = await db
      .update(images)
      .set({
        url: file.url,
        description: file.name,
        updatedAt: new Date(),
        updatedBy: user.userId,
      })
      .where(eq(images.id, existing.id))
      .returning();
    console.log("Update result:", result);
    if (result.length === 0 || !result[0])
      throw new Error("Failed to update image");

    // This is sent to the clientside `onClientUploadComplete` callback
    return result[0];
  } else {
    const result = await db
      .insert(images)
      .values({
        identifier,
        url: file.url,
        description: file.name,
        createdBy: user.userId,
      })
      .returning();
    console.log("Insert result:", result);
    if (result.length === 0 || !result[0])
      throw new Error("Failed to create image");

    return result[0];
  }
}

// Delete an image by identifier
export async function deleteImage(identifier: string): Promise<void> {
  if (!(await isCurrentUserAdmin())) throw new Error("Unauthorized");

  const result = await db
    .delete(images)
    .where(eq(images.identifier, identifier));
  console.log("Delete result:", result);
}
