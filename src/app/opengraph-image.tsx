import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card for pages without their own image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#17202e",
          color: "#f5f6f2",
        }}
      >
        <div style={{ width: 120, height: 14, background: "#c98a3a", marginBottom: 40 }} />
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>{siteConfig.name}</div>
        <div style={{ fontSize: 40, marginTop: 16, color: "#f3e4cf" }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
