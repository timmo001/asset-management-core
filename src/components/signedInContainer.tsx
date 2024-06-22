import { SignedOut, SignInButton, SignedIn } from "@clerk/nextjs";

export default function SignedInContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <section className="w-full py-24">
          <h2 className="text-center text-3xl font-semibold">
            Please{" "}
            <span className="text-violet-600">
              <SignInButton mode="modal">Sign in</SignInButton>
            </span>{" "}
            to continue
          </h2>
        </section>
      </SignedOut>

      <SignedIn>{children}</SignedIn>
    </>
  );
}
