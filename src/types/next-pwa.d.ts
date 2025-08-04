declare module 'next-pwa' {
  import { NextConfig } from 'next';

  // You can define a more specific type for config if you know the shape,
  // but as a general improvement, use 'unknown' instead of 'any'
  export default function nextPWA(
    config: Record<string, unknown>
  ): (nextConfig: NextConfig) => NextConfig;
}
