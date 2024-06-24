import { notFound } from "next/navigation";
import UpdateAsset from "~/components/updateAsset";

import { getAsset } from "~/server/db/assets";
import { getImagesByIdentifier } from "~/server/db/image";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  const images = await getImagesByIdentifier(`asset-${asset.id}`);

  return <UpdateAsset assetIn={asset} imagesIn={images} />;
}
