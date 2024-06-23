import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getAsset } from "~/server/db/assets";
import { getImagesByIdentifier } from "~/server/db/image";
import { isCurrentUserAdmin } from "~/server/db";
import SignedInContainer from "~/components/signedInContainer";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const images = asset.imageIds
    ? await getImagesByIdentifier(`asset-${asset.id}`)
    : undefined;

  const isUserAdmin = await isCurrentUserAdmin();

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
            <Image
              className="rounded-lg"
              src={image.url}
              alt={image.description || "Post Image"}
              height={256}
              width={256}
              style={{ objectFit: "cover" }}
            />
          ))}
        </section>
        {isUserAdmin && (
          <section className="w-72">
            <h2 className="pb-4 text-3xl font-semibold">Admin Section</h2>
            <Link href={`/posts/${asset.id}/edit`}>
              <button className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800">
                Edit Asset
              </button>
            </Link>
          </section>
        )}
      </>
    </SignedInContainer>
  );
}
