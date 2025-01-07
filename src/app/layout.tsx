import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";
import * as React from "react";
import Loading from "./loading";
import Script from "next/script";
import GoogleAnalytic from "@/components/GoogleAnalytics";

const clashDisplayExtralight = localFont({
  src: "./fonts/ClashDisplay-Extralight.woff",
  variable: "--clashDisplay-extralight",
  weight: "100 900",
});

const clashDisplayBold = localFont({
  src: "./fonts/ClashDisplay-Bold.otf",
  variable: "--clashDisplay-bold",
  weight: "100 900",
});

const clashDisplayMedium = localFont({
  src: "./fonts/ClashDisplay-Medium.otf",
  variable: "--clashDisplay-medium",
  weight: "100 900",
});

const clashDisplayRegular = localFont({
  src: "./fonts/ClashDisplay-Regular.otf",
  variable: "--clashDisplay-regular",
  weight: "100 900",
});

const satoshiBold = localFont({
  src: "./fonts/Satoshi-Bold.otf",
  variable: "--satoshi-bold",
  weight: "100 900",
});

const satoshiRegular = localFont({
  src: "./fonts/Satoshi-Regular.woff",
  variable: "--satoshi-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "M Zeeshan Khan",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-be-installed="true">
      <Script
        src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"
        strategy="afterInteractive"
        data-be-installed="true"
      />
      <Script
        id="usercentrics-cmp"
        src="https://web.cmp.usercentrics.eu/ui/loader.js"
        data-settings-id="Jh81HSJUoIDyWi"
        strategy="afterInteractive"
        data-be-installed="true"
      />
      <GoogleTagManager data-be-installed="true" gtmId="GTM-TN2SFZ67" />
      <GoogleAnalytic
        data-be-installed="true"
        GA_MEASUREMENT_ID="G-9DL20C6P7Y"
      />
      <body
        className={`font-satoshiRegular ${satoshiRegular.variable} ${clashDisplayExtralight.variable} ${satoshiBold.variable} ${clashDisplayBold.variable} ${clashDisplayMedium.variable} ${clashDisplayRegular.variable} antialiased `}
        data-be-installed="true"
        data-liner-extension-version="7.16.2"
        data-new-gr-c-s-check-loaded="14.1215.0"
        data-gr-ext-installed=""
        style={{ width: "100%" }}
      >
        <React.Suspense data-be-installed="true" fallback={<Loading />}>
          <Header data-be-installed="true" />
          {children}
          <Footer data-be-installed="true" />
        </React.Suspense>
      </body>
    </html>
  );
}
