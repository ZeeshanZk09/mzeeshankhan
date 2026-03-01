import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore the project portfolio of Muhammad Zeeshan Khan — featuring real-world web applications built with React, Next.js, TypeScript, Node.js, MongoDB, and more.',
  openGraph: {
    title: 'Projects — M Zeeshan Khan',
    description:
      'Discover web development projects by M Zeeshan Khan — e-commerce platforms, educational apps, and innovative full-stack solutions.',
    images: [
      { url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'M Zeeshan Khan Projects' },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Projects — M Zeeshan Khan',
    description:
      'Portfolio projects by Muhammad Zeeshan Khan — React, Next.js, TypeScript, and full-stack applications.',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
