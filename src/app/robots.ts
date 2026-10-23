import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep crawlers out until indexing is switched on for the live domain.
    rules: siteConfig.allowIndexing
      ? { userAgent: "*", allow: "/", disallow: ["/search"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
