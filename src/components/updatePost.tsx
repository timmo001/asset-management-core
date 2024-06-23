"use client";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { SelectImage, SelectPost } from "~/server/db/schema";
import { updateImage } from "~/server/db/image";
import { updatePost } from "~/server/db/posts";
import { UploadButton } from "~/utils/uploadthing";
import SignedInContainer from "~/components/signedInContainer";

export default function UpdatePost({
  imageIn,
  postIn,
}: {
  imageIn?: SelectImage;
  postIn: SelectPost;
}) {
  const [image, setImage] = useState<SelectImage | undefined>(imageIn);
  const [post, setPost] = useState<SelectPost>(postIn);

  const updateData = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">Edit Post</h2>
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Title</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            name="title"
            value={post.title || ""}
            onChange={updateData}
          />
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Subtitle</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            name="subtitle"
            value={post.subtitle || ""}
            onChange={updateData}
          />
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Content</h3>
          <textarea
            className="h-32 w-full rounded-lg bg-slate-950 p-2 text-white"
            name="content"
            value={post.content || ""}
            onChange={updateData}
          />
        </section>
        <section className="flex w-full flex-col gap-4">
          <h3 className="text-xl font-semibold">Image</h3>
          <UploadButton
            appearance={{
              button:
                "w-full transform rounded-lg bg-slate-800 px-7 py-2 font-normal transition duration-300 hover:bg-slate-700",
            }}
            endpoint="postImageUploader"
            onClientUploadComplete={(r) => {
              const serverData = r[0]?.serverData;
              console.log("Client upload complete:", serverData);
              if (!serverData) return;
              updateImage(`post-${post.id}`, serverData.file).then((d) => {
                console.log("Updated post image:", d);
                setImage(d);
                setPost({ ...post, imageId: d.id });
              });
            }}
          />
          {image ? (
            <Image
              className="rounded-lg"
              src={image.url}
              alt={image.description || "Post Image"}
              height={256}
              width={256}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="h-64 w-full rounded-lg bg-gray-300"></div>
          )}
        </section>
        <section className="w-full">
          <button
            className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800"
            onClick={() => updatePost(post)}
          >
            Update
          </button>
        </section>
      </>
    </SignedInContainer>
  );
}
