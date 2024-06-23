import { notFound } from "next/navigation";

import { getImageByIdentifier } from "~/server/db/image";
import { getPost } from "~/server/db/posts";
import UpdatePost from "~/components/updatePost";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  const image = post.imageId
    ? await getImageByIdentifier(`post-${post.id}`)
    : undefined;

  return <UpdatePost imageIn={image} postIn={post} />;
}
