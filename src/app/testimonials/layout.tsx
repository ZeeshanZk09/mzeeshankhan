import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read testimonials and see GitHub highlights from Muhammad Zeeshan Khan — client feedback, community recognition, and open-source contributions.',
  openGraph: {
    title: 'Testimonials — M Zeeshan Khan',
    description:
      'Client feedback, community recognition, and GitHub highlights from M Zeeshan Khan.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'M Zeeshan Khan Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Testimonials — M Zeeshan Khan',
    description: 'Testimonials and GitHub highlights from Muhammad Zeeshan Khan.',
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
