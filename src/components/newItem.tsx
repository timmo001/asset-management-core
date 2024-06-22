"use client";
import { useState } from "react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function NewItem() {
  const [newItem, setNewItem] = useState<boolean>(false);

  return (
    <SignedIn>
      <>
        <div>
          <button
            className="transform rounded-lg bg-slate-900 px-7 py-2 font-normal transition duration-300 hover:bg-slate-800"
            onClick={() => setNewItem(true)}
          >
            New
          </button>
        </div>

        {newItem && (
          <dialog
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
            onClick={() => setNewItem(false)}
          >
            <div className="rounded-lg bg-slate-950 p-4 text-white">
              <h2 className="text-2xl font-semibold">New item</h2>
              <div className="flex flex-col gap-4 py-4">
                <Link href="/assets/new">
                  <button className="w-72 transform rounded-lg bg-slate-900 px-7 py-2 font-normal transition duration-300 hover:bg-slate-800">
                    Asset
                  </button>
                </Link>
                <Link href="/posts/new">
                  <button className="w-72 transform rounded-lg bg-slate-900 px-7 py-2 font-normal transition duration-300 hover:bg-slate-800">
                    Post
                  </button>
                </Link>
              </div>
            </div>
          </dialog>
        )}
      </>
    </SignedIn>
  );
}
