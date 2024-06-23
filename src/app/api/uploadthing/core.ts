import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

async function middleware({}) {
  // This code runs on your server before upload
  const user = auth();

  // If you throw, the user will not be able to upload
  if (!user.userId) throw new UploadThingError("Unauthorized");

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: user.userId };
}

async function uploadComplete({ metadata, file }) {
  // This code runs on your server after upload
  console.log("Upload complete for userId:", metadata.userId);
  console.log("File url:", file.url);

  return { file, userId: metadata.userId };
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
