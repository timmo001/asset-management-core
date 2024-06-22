import { db } from "~/server/db";
import SignedInContainer from "~/components/signedInContainer";

export default async function Page() {
  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">New Post</h2>
        </section>
      </>
    </SignedInContainer>
  );
}
