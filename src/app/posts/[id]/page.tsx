import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getImageByIdentifier } from "~/server/db/image";
import { getPost } from "~/server/db/posts";
import { isCurrentUserAdmin } from "~/server/db";
import SignedInContainer from "~/components/signedInContainer";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  const image = post.imageId
    ? await getImageByIdentifier(`post-${post.id}`)
    : undefined;

  const isUserAdmin = await isCurrentUserAdmin();

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
        <section className="w-full">
          {image ? (
            <Image
              className="rounded-lg"
              src={image.url}
              alt={image.description || "Post Image"}
              height={256}
              width={256}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="h-64 w-full rounded-lg bg-gray-300"></div>
          )}
        </section>
        {isUserAdmin && (
          <section className="w-72">
            <h2 className="pb-4 text-3xl font-semibold">Admin Section</h2>
            <Link href={`/posts/${post.id}/edit`}>
              <button className="w-full transform rounded-lg bg-violet-900 px-7 py-2 font-normal transition duration-300 hover:bg-violet-800">
                Edit Post
              </button>
            </Link>
          </section>
        )}
      </>
    </SignedInContainer>
  );
}
