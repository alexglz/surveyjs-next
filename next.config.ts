import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/tech4me/survey',
  assetPrefix: '/tech4me/survey',
  output: 'standalone',

  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  }
};

export default nextConfig;
