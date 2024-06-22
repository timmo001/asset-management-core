import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { db } from "~/server/db";
import { assetImages } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  assetImagesUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const request = (await req.json()) as {
        assetId: number;
        description?: string;
      };

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { ...request, userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File url:", file.url);

      const result = await db.insert(assetImages).values({
        assetId: metadata.assetId,
        url: file.url,
        description: metadata.description,
        createdBy: metadata.userId,
      });

      console.log("Inserted asset image:", result.rows[0]);

      // This is sent to the clientside `onClientUploadComplete` callback
      return result.rows[0];
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
