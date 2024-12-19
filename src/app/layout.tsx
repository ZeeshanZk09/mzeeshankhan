import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import localFont from "next/font/local";

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
    <html lang="en">
      <body className={`${satoshiRegular.variable} ${clashDisplayExtralight.variable} ${satoshiBold.variable} ${clashDisplayBold.variable} ${clashDisplayMedium.variable} ${clashDisplayRegular.variable} antialiased `} >
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}



