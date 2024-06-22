"use client";
import { ChangeEvent, useState } from "react";

import SignedInContainer from "~/components/signedInContainer";

export default function UpdatePost({ postIn }: { postIn: any }) {
  const [post, setPost] = useState(postIn);

  const updatePost = async (
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
            value={post.title}
            onChange={updatePost}
          />
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            name="subtitle"
            value={post.subtitle}
            onChange={updatePost}
          />
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Content</h3>
          <textarea
            className="h-32 w-full rounded-lg bg-slate-950 p-2 text-white"
            name="content"
            value={post.content}
            onChange={updatePost}
          />
        </section>
        {/* <section className="w-full">
            <h3 className="text-xl font-semibold">Image</h3>
            <UploadDropzone
              endpoint="assetImagesUploader"
              onClientUploadComplete={(result) => {
                console.log("Image uploaded", result);
              }}
            />
          </section> */}
        <section className="w-full">
          <button className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800">
            Update
          </button>
        </section>
      </>
    </SignedInContainer>
  );
}
