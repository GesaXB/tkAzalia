import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  /** Tree-shake impor dari barrel (lucide-react, dsb.) — bundle lebih kecil */
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
