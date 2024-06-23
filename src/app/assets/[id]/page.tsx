import { notFound } from "next/navigation";

import { getAsset } from "~/server/db/assets";
import { getImagesByIdentifier } from "~/server/db/image";
import SignedInContainer from "~/components/signedInContainer";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const images = asset.imageIds
    ? await getImagesByIdentifier(`asset-${asset.id}`)
    : undefined;

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">{asset.name}</h2>
        </section>
        <section className="w-full">
          <p>{asset.description}</p>
        </section>
        <section className="w-full">
          {images?.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.description || "Asset image"}
              className="rounded-lg"
            />
          ))}
        </section>
      </>
    </SignedInContainer>
  );
}
