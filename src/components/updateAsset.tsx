"use client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { SelectAsset, SelectImage, SelectImages } from "~/server/db/schema";
import { updateImage } from "~/server/db/image";
import { updateAsset } from "~/server/db/assets";
import { UploadDropzone } from "~/utils/uploadthing";
import SignedInContainer from "~/components/signedInContainer";
import { ClientUploadedFileData } from "uploadthing/types";

export default function UpdateAsset({
  assetIn,
  imagesIn,
}: {
  assetIn: SelectAsset;
  imagesIn: SelectImages;
}) {
  const [images, setImages] = useState<SelectImages>(imagesIn);
  const [asset, setAsset] = useState<SelectAsset>(assetIn);

  const updateData = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">Edit Asset</h2>
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Title</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            name="name"
            value={asset.name || ""}
            onChange={updateData}
          />
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Description</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            name="description"
            value={asset.description || ""}
            onChange={updateData}
          />
        </section>
        <section className="flex w-full flex-col gap-4">
          <h3 className="text-xl font-semibold">Image</h3>
          <UploadDropzone
            appearance={{
              button:
                "w-full transform rounded-lg bg-slate-800 px-7 py-2 font-normal transition duration-300 hover:bg-slate-700",
            }}
            endpoint="assetImagesUploader"
            headers={{
              "X-Identifier": `asset-${asset.id}`,
            }}
            onClientUploadComplete={(res) => {
              const newImages = res.map(
                (r) =>
                  r.serverData as unknown as {
                    assetId: string;
                    image: SelectImage;
                  },
              );
              console.log("Client upload complete:", newImages);
              setImages(newImages.map((r) => r.image));
              setAsset({
                ...asset,
                imageIds: newImages.map((r) => r.image.id),
              });
            }}
          />
          {images?.map((image) => (
            <Image
              className="rounded-lg"
              src={image.url}
              alt={image.description || "Post Image"}
              height={256}
              width={256}
              style={{ objectFit: "cover" }}
            />
          ))}
        </section>
        <section className="w-full">
          <button
            className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800"
            onClick={() => updateAsset(asset)}
          >
            Update
          </button>
        </section>
      </>
    </SignedInContainer>
  );
}
