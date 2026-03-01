// next.config.ts
import type { NextConfig } from 'next';
import nextPWA from 'next-pwa';

const pwa = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Disable in dev to prevent noisy GenerateSW warnings in watch mode.
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  experimental: {
    globalNotFound: true,
  },
  // Keep an empty turbopack config so Next.js doesn't warn when
  // someone runs with the default (Turbopack) bundler.
  turbopack: {},

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default pwa(nextConfig);
