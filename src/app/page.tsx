import Link from "next/link";

import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  const assets = await db.query.assets.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: { images: true },
  });

  return (
    <>
      <section>
        <h2 className="text-3xl font-semibold">News</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="block rounded-lg bg-violet-900 bg-opacity-35 p-4 shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-medium">{post.title}</h3>
                <p className="overflow-hidden truncate text-ellipsis text-wrap text-gray-500">
                  {post.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold">Assets</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {assets.map((asset, index) => (
            <Link key={asset.id} href={`/asset/${asset.id}`}>
              <div
                key={index}
                className="transform shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img src={asset.images[0]?.url} className="rounded-lg" />
                <div className="absolute bottom-0 start-0 w-full rounded-bl-lg rounded-br-lg bg-slate-950 bg-opacity-40 px-2 py-2">
                  <h3 className="text-lg font-medium">{asset.name}</h3>
                  <p className="overflow-hidden truncate text-ellipsis text-wrap text-sm text-gray-500">
                    {asset.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
