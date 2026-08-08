import type { MetadataRoute } from "next";
import { brandAssets } from "@/content/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/en/lab", "/fr/lab", "/api/"],
    },
    sitemap: `${brandAssets.websiteUrl}/sitemap.xml`,
  };
}
