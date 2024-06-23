import { notFound } from "next/navigation";

import { getAsset } from "~/server/db/assets";
import { getImagesByIdentifier } from "~/server/db/image";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const images = asset.imageIds
    ? await getImagesByIdentifier(`asset-${asset.id}`)
    : undefined;

  return <></>;
  // return <UpdateAsset AssetIn={Asset} />;
}
