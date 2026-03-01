import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn about Muhammad Zeeshan Khan — a passionate MERN Stack developer based in Karachi, Pakistan. Founder of Zebotix and Apna Campus, specializing in React, Next.js, TypeScript, and modern web technologies.',
  openGraph: {
    title: 'About — M Zeeshan Khan',
    description:
      'Learn about Muhammad Zeeshan Khan — MERN Stack developer, founder of Zebotix, specializing in React, Next.js, and TypeScript.',
    images: [{ url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'M Zeeshan Khan' }],
  },
  twitter: {
    card: 'summary',
    title: 'About — M Zeeshan Khan',
    description: 'Learn about Muhammad Zeeshan Khan — MERN Stack developer from Karachi, Pakistan.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
