import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NewItem() {
  return (
    <SignedIn>
      <div>
        <button className="transform rounded-lg bg-slate-900 px-7 py-2 font-normal transition duration-300 hover:bg-slate-800">
          New
        </button>
      </div>
    </SignedIn>
  );
}
