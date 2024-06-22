import SignedInContainer from "~/components/signedInContainer";

export default async function Page() {
  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">New Asset</h2>
        </section>
      </>
    </SignedInContainer>
  );
}
