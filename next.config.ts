import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats first — Next.js picks AVIF when supported, else WebP
    formats: ["image/avif", "image/webp"],
    // Allowed quality steps (must include any `quality` prop used in the app)
    qualities: [75, 90],
    // Match layout breakpoints + retina headroom for the 1500px max-width shell
    deviceSizes: [640, 750, 828, 1080, 1200, 1300, 1500, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
