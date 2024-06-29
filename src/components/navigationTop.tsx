"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import NewItem from "~/components/newItem";

const paths: { [key: string]: string[] | undefined } = {
  "/": [],
  "/assets/new": ["Assets", "New Asset"],
  "/assets/[id]/edit": ["Assets", "Asset", "Edit"],
  "/assets/[id]": ["Assets", "Asset"],
  "/assets": ["Assets"],
  "/posts/new": ["Posts", "New Post"],
  "/posts/[id]/edit": ["Posts", "Post", "Edit"],
  "/posts/[id]": ["Posts", "Post"],
  "/posts": ["Posts"],
};

export default function NavigationTop() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const path = Object.entries(paths).find(([r, t]) => {
      const re = new RegExp(`^${r.replace(/\[.*?\]/g, ".*")}$`);
      return re.test(pathname);
    })?.[1];
    if (!path) return null;
    return path.map((t, i) => (
      <>
        <div>/</div>
        <div key={i}>
          {i === path.length - 1 ? <Link href={pathname}>{t}</Link> : t}
        </div>
      </>
    ));
  }, [pathname]);

  return (
    <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-start gap-4 px-8 py-3 text-lg font-light">
      <div>
        <Link href="/">Asset Management</Link>
      </div>
      {breadcrumbs}
      <div className="flex-1" />
      <div className="flex flex-row gap-4">
        <SignedOut>
          <div className="transform rounded-md bg-violet-900 bg-opacity-60 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105">
            <SignInButton mode="modal" />
          </div>
        </SignedOut>
        <SignedIn>
          <NewItem />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
