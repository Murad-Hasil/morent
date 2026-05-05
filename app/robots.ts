import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/cars", "/cars/"],
        disallow: ["/checkout", "/dashboard", "/api/"],
      },
    ],
    sitemap: "https://morent.vercel.app/sitemap.xml",
  };
}
