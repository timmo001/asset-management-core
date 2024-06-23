import { notFound } from "next/navigation";

import { getAsset } from "~/server/db/assets";
// import UpdateAsset from "~/components/updateAsset";

export default async function Page({ params }: { params: { id: number } }) {
  const asset = await getAsset(params.id);
  if (!asset) notFound();

  return <></>;
  // return <UpdateAsset AssetIn={Asset} />;
}
