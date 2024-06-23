"use client";
import { useState } from "react";

import { createAsset } from "~/server/db/assets";
import SignedInContainer from "~/components/signedInContainer";

export default function Page() {
  const [name, setName] = useState<string>("");

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">New Asset</h2>
        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold">Name</h3>
          <input
            className="w-full rounded-lg bg-slate-950 p-2 text-white"
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section className="w-full">
          <button
            className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800"
            onClick={() => createAsset(name)}
          >
            Create
          </button>
        </section>
      </>
    </SignedInContainer>
  );
}
