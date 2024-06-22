"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import SignedInContainer from "~/components/signedInContainer";
import { createPost } from "~/serverActions/db/asset";

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">New Post</h2>
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Title</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>
        <section className="w-full">
          <button
            className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800"
            onClick={() => {
              createPost(title).then((post) => {
                console.log("Post created", post);
                // router.replace(`/posts/edit/${post.id}`);
              });
            }}
          >
            Create
          </button>
        </section>
      </>
    </SignedInContainer>
  );
}
