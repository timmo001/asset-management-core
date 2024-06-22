import { MetadataRoute } from "next";

export const baseUrl = "https://asset-managment.timmo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  return result;
}
