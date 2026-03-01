import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Professional web development services by Muhammad Zeeshan Khan — custom website development, e-commerce solutions, landing pages, React/Next.js applications, API integration, and more.',
  openGraph: {
    title: 'Services — M Zeeshan Khan',
    description:
      'Hire M Zeeshan Khan for custom web development — React, Next.js, e-commerce, landing pages, full-stack applications, and API integrations.',
    images: [
      { url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'M Zeeshan Khan Services' },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Services — M Zeeshan Khan',
    description:
      'Professional web development services — React, Next.js, TypeScript, e-commerce and more.',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
