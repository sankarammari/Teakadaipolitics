import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js dev badge so local demos look like the real site.
  devIndicators: false,
  // Articles are read from content/ at build time; ship them with any server function too.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
};

export default nextConfig;
