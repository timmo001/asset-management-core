"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useBreadcrumbStore } from "~/stores/breadcrumb";
import NewItem from "~/components/newItem";
import { useEffect } from "react";

export default function NavigationTop() {
  const pathname = usePathname();

  const breadcrumbs = useBreadcrumbStore();

  useEffect(() => {
    breadcrumbs.updatePathname(pathname);
  }, [pathname]);

  const paths = pathname.split("/");

  return (
    <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-start gap-4 px-8 py-3 text-lg font-light">
      <Link href="/">Asset Management</Link>
      {breadcrumbs.path?.map((t: string, i: number, path: Array<string>) => {
        if (t === "[name]") t = breadcrumbs.name || "";
        return (
          <div key={i} className="flex flex-row gap-4">
            <div>/</div>
            <div>
              <Link href={paths.slice(0, i + 1 - path.length).join("/")}>
                {t}
              </Link>
            </div>
          </div>
        );
      })}
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
