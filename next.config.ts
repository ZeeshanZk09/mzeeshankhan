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
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
