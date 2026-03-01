import Link from 'next/link';
import {
  clashDisplayBold,
  clashDisplayExtralight,
  clashDisplayMedium,
  clashDisplayRegular,
  satoshiBold,
  satoshiRegular,
} from './font';
import { AppSidebar } from '@/components/layout/AppSidebar';
import '@/styles/globals.css';

export default function NotFound() {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`font-satoshiRegular ${satoshiRegular.variable} ${clashDisplayExtralight.variable} ${satoshiBold.variable} ${clashDisplayBold.variable} ${clashDisplayMedium.variable} ${clashDisplayRegular.variable} relative [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
          antialiased `}
        suppressHydrationWarning
      >
        <AppSidebar />
        <section className='w-screen flex  flex-col items-center justify-center min-h-screen py-40 text-black text-center px-24'>
          <h1 className='text-6xl font-bold animate-bounce'>404</h1>
          <h2 className='text-2xl mt-4'>Hang tight! 🚧</h2>
          <p className='mt-2 text-lg'>
            I am working on creating this page. Check back soon, or explore something else in the
            meantime!
          </p>
          <iframe
            src='https://lottie.host/embed/6b40397d-4f1a-4abf-970d-3f9c927f887a/PL1lgS4Rji.lottie'
            title='Lottie Animation'
            width='400'
            height='200'
            sandbox='allow-scripts allow-same-origin'
            className='w-full h-full border-0'
          ></iframe>
          <Link
            href='/'
            className='mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl'
          >
            Take Me Home 🏠
          </Link>
        </section>
      </body>
    </html>
  );
}
