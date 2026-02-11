import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // GitHub Pages hosting requirement
  basePath: '/intuition-first-math',
  assetPrefix: '/intuition-first-math/',
  trailingSlash: true,
  images: {
    unoptimized: true, // Image optimization requires a server
  },
};

export default nextConfig;
