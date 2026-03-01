import type { Metadata, Viewport } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import * as React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import ToastProvider from '@/components/providers/ToastProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Image from 'next/image';
import {
  clashDisplayBold,
  clashDisplayExtralight,
  clashDisplayMedium,
  clashDisplayRegular,
  satoshiBold,
  satoshiRegular,
} from './font';
import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'M Zeeshan Khan — MERN Stack Developer & Portfolio',
    template: '%s | M Zeeshan Khan',
  },
  description:
    'Portfolio of Muhammad Zeeshan Khan — a MERN Stack developer specializing in React, Next.js, TypeScript, Node.js, and Tailwind CSS. Explore projects, services, and more.',
  keywords: [
    'M Zeeshan Khan',
    'MERN Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Portfolio',
    'Web Developer Karachi',
    'Frontend Developer',
    'Full Stack Developer',
    'Zebotix',
  ],
  authors: [{ name: 'Muhammad Zeeshan Khan', url: 'https://github.com/ZeeshanZk09' }],
  creator: 'Muhammad Zeeshan Khan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://mzeeshankhan.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'M Zeeshan Khan — Portfolio',
    title: 'M Zeeshan Khan — MERN Stack Developer & Portfolio',
    description:
      'Explore the portfolio of Muhammad Zeeshan Khan — projects, services, and expertise in React, Next.js, TypeScript and more.',
    images: [{ url: '/icons/icon-512x512.png', width: 512, height: 512, alt: 'M Zeeshan Khan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M Zeeshan Khan — MERN Stack Developer',
    description:
      'Portfolio of Muhammad Zeeshan Khan — MERN Stack developer specializing in React, Next.js, TypeScript, Node.js.',
    images: ['/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`font-satoshiRegular ${satoshiRegular.variable} ${clashDisplayExtralight.variable} ${satoshiBold.variable} ${clashDisplayBold.variable} ${clashDisplayMedium.variable} ${clashDisplayRegular.variable} relative antialiased [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <Header />
          {/* Background Image + theme-aware overlay */}
          <div className='fixed inset-0 z-0'>
            <Image
              src='/assets/images/welcome-bg-img.jpg'
              alt=''
              role='presentation'
              priority
              fill
              className='object-cover w-full h-full brightness-75 dark:brightness-75'
            />
            {/* Dark theme: dark overlay | Light theme: light overlay */}
            <div className='absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/20 dark:from-black/50 dark:via-black/30 dark:to-black/5 pointer-events-none' />
          </div>
          <main className='relative z-10 overflow-hidden min-h-screen'>
            <AppSidebar />
            <ToastProvider />
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
