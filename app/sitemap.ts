import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://morent.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cars`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/cars/detail`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
}
