/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages hosting requirement
  basePath: '/intuition-first-math',
  assetPrefix: '/intuition-first-math/',
  trailingSlash: true,
  images: {
    unoptimized: true, // Image optimization requires a server
  },
};

module.exports = nextConfig;
