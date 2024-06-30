import Image from "next/image";
import Link from "next/link";

import SignedInContainer from "~/components/signedInContainer";
import { getAssets } from "~/server/db/assets";
import { getImageByIdentifier } from "~/server/db/image";
import { getPosts } from "~/server/db/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const assets = await getAssets();
  const posts = await getPosts();

  return (
    <>
      <section className="w-full">
        <h2 className="text-3xl font-semibold">News</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map(async (post) => {
            const image = await getImageByIdentifier(`post-${post.id}`);
            return (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <div className="relative h-52 transform bg-violet-950 bg-opacity-30 shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl">
                  {image ? (
                    <Image
                      className="rounded-lg"
                      src={image.url}
                      alt={image.description || "Asset Image"}
                      height={208}
                      width={520}
                      style={{
                        height: "13rem",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="h-40 w-full rounded-lg bg-gray-300"></div>
                  )}
                  <div className="absolute bottom-0 start-0 w-full rounded-bl-lg rounded-br-lg bg-slate-950 bg-opacity-40 px-2 py-2">
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    <p className="overflow-hidden truncate text-ellipsis text-wrap text-sm text-gray-500">
                      {post.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SignedInContainer>
        <>
          <section className="w-full">
            <h2 className="text-3xl font-semibold">Assets</h2>
            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {assets.map(async (asset) => {
                const image = await getImageByIdentifier(`asset-${asset.id}`);
                return (
                  <Link key={asset.id} href={`/assets/${asset.id}`}>
                    <div className="relative h-52 transform bg-violet-950 bg-opacity-30 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl">
                      {image ? (
                        <Image
                          className="rounded-lg"
                          src={image.url}
                          alt={image.description || "Asset Image"}
                          height={208}
                          width={520}
                          style={{
                            height: "13rem",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="h-40 w-full rounded-lg bg-gray-300"></div>
                      )}
                      <div className="absolute bottom-0 start-0 w-full rounded-bl-lg rounded-br-lg bg-slate-950 bg-opacity-40 px-2 py-2">
                        <h3 className="text-lg font-medium">{asset.name}</h3>
                        <p className="overflow-hidden truncate text-ellipsis text-wrap text-sm text-gray-500">
                          {asset.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      </SignedInContainer>
    </>
  );
}
