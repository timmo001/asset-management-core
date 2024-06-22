import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import UpdatePost from "~/components/updatePost";

export default async function Page({ params }: { params: { id: number } }) {
  const post = (
    await db.select().from(posts).where(eq(posts.id, params.id))
  )[0];

  if (!post) notFound();

  return <UpdatePost postIn={post} />;
}
