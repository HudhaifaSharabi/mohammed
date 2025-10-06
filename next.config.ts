import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

export default nextConfig;
