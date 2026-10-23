import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Lets readers install the site to their phone's home screen like an app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Teakadai",
    description: siteConfig.description,
    lang: "ta",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f6f2",
    theme_color: "#17202e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
