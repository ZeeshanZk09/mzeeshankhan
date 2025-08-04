import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import localFont from 'next/font/local';
import * as React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import UnderConstruction from '@/components/utils/UnderConstruction';
import HydrationFix from '@/utils/HydrationFix';
import { CleanDom } from '@/utils/CleanDom';
import ToastProvider from '@/hooks/ToastProvider';
import { UserProvider } from '@/hooks/UserContext';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/globals.css';
const clashDisplayExtralight = localFont({
  src: './fonts/ClashDisplay-Extralight.woff',
  variable: '--clashDisplay-extralight',
  weight: '100 900',
});

const clashDisplayBold = localFont({
  src: './fonts/ClashDisplay-Bold.otf',
  variable: '--clashDisplay-bold',
  weight: '100 900',
});

const clashDisplayMedium = localFont({
  src: './fonts/ClashDisplay-Medium.otf',
  variable: '--clashDisplay-medium',
  weight: '100 900',
});

const clashDisplayRegular = localFont({
  src: './fonts/ClashDisplay-Regular.otf',
  variable: '--clashDisplay-regular',
  weight: '100 900',
});

const satoshiBold = localFont({
  src: './fonts/Satoshi-Bold.otf',
  variable: '--satoshi-bold',
  weight: '100 900',
});

const satoshiRegular = localFont({
  src: './fonts/Satoshi-Regular.woff',
  variable: '--satoshi-regular',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'M Zeeshan Khan',
  description: 'This is my portfolio website.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
        className={`font-satoshiRegular ${satoshiRegular.variable} ${clashDisplayExtralight.variable} ${satoshiBold.variable} ${clashDisplayBold.variable} ${clashDisplayMedium.variable} ${clashDisplayRegular.variable} [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
          antialiased `}
        suppressHydrationWarning
      >
        <CleanDom />
        <HydrationFix>
          <UserProvider>
            <UnderConstruction />
            <AppSidebar />
            <Header />
            <main className='overflow-hidden min-h-screen'>
              <ToastProvider />
              {children}
            </main>
            <Footer />
          </UserProvider>
          <Analytics />
          <SpeedInsights />
        </HydrationFix>
      </body>
    </html>
  );
}
