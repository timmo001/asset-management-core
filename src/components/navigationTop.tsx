import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function NavigationTop() {
  return (
    <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-start gap-4 px-8 py-3 text-lg font-light">
      <div>
        <Link href="/">Asset Management</Link>
      </div>
      <div>/</div>
      <div>
        <Link href="/">Lorem ipsum</Link>
      </div>
      <div className="flex-1" />
      <SignedOut>
        <div className="transform rounded-md bg-violet-900 bg-opacity-60 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
