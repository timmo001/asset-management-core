import Link from "next/link";

import { db } from "~/server/db";

let mockImages = [
  "https://utfs.io/f/079fe122-f29c-4f53-9316-cc344ac5c82f-5nw3rt.png",
  "https://utfs.io/f/bcdf2cba-a07a-4d5d-bd26-e8db15a087ef-kc0ia5.png",
  "https://utfs.io/f/c4d353eb-91de-4970-b726-0d590cd5a3df-se5sys.png",
  "https://utfs.io/f/dafd034c-b1b3-4811-9151-e43c537d7014-e6hk9p.png",
];
mockImages = [...mockImages, ...mockImages, ...mockImages, ...mockImages];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <>
      <section>
        <h2 className="text-3xl font-semibold">News</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <div className="block rounded-lg bg-violet-900 bg-opacity-35 p-4 shadow-xl transition duration-300 hover:shadow-2xl">
                <h3 className="text-xl font-medium">{post.title}</h3>
                <p className="overflow-hidden truncate text-ellipsis text-wrap text-gray-500">
                  {post.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockImages.map((image, index) => (
          <div
            key={index}
            className="w-64 transform shadow-lg transition duration-300 hover:scale-105"
          >
            <img src={image} className="rounded-lg" />
          </div>
        ))}
      </section>
    </>
  );
}
