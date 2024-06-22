import { notFound } from "next/navigation";

import { getPost } from "~/server/db/posts";
import UpdatePost from "~/components/updatePost";

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return <UpdatePost postIn={post} />;
}
