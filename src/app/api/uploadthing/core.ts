import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UploadedFileData } from "uploadthing/types";

import { isUserAdmin } from "~/server/db";
import { updateImage } from "~/server/db/image";

const f = createUploadthing();

async function middleware({ req }: { req: Request }): Promise<{
  identifier: string;
  user: any;
}> {
  // This code runs on your server before upload
  const user = auth();
  if (!user.userId) throw new UploadThingError("Unauthorized");

  // Only admins are allowed to upload
  if (!(await isUserAdmin(user.userId)))
    throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return {
    identifier: req.headers.get("X-Identifier")!,
    user,
  };
}

async function uploadComplete({
  metadata,
  file,
}: {
  metadata: {
    identifier: string;
    user: any;
  };
  file: UploadedFileData;
}) {
  // This code runs on your server after upload
  console.log("Upload complete:", { metadata, file });

  const image = await updateImage(metadata.identifier, file, metadata.user);

  // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  return {
    identifier: metadata.identifier,
    image,
  };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  assetImagesUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
    // Set permissions and file types for this FileRoute
    .middleware(middleware)
    .onUploadComplete(uploadComplete),
  postImageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(middleware)
    .onUploadComplete(uploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
