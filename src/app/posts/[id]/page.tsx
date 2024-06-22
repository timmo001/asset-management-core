import { notFound } from "next/navigation";

import SignedInContainer from "~/components/signedInContainer";
import { getPost } from "~/server/db/posts";

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
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
