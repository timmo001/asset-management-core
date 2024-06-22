import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
import SignedInContainer from "~/components/signedInContainer";

export default async function Page({ params }: { params: { id: number } }) {
  const post = (
    await db.select().from(posts).where(eq(posts.id, params.id))
  )[0];

  if (!post) notFound();

  return (
    <SignedInContainer>
      <>
        <section className="w-full">
          <h2 className="text-3xl font-semibold">{post.title}</h2>
          <p>{post.subtitle}</p>
        </section>
        <section className="w-full">
          <p>{post.content}</p>
        </section>
        {/* <section className="w-full">
          <img src={post.image?.url} className="rounded-lg" />
        </section> */}
      </>
    </SignedInContainer>
  );
}
