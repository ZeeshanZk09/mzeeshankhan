// next.config.ts
import type { NextConfig } from 'next';
// import nextPWA from 'next-pwa';

// const pwa = nextPWA({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
// });

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
