import localFont from 'next/font/local';

const clashDisplayExtralight = localFont({
  src: './fonts/ClashDisplay-Extralight.woff',
  variable: '--clashDisplay-extralight',
  weight: '200',
  display: 'swap',
});

const clashDisplayBold = localFont({
  src: './fonts/ClashDisplay-Bold.otf',
  variable: '--clashDisplay-bold',
  weight: '700',
  display: 'swap',
});

const clashDisplayMedium = localFont({
  src: './fonts/ClashDisplay-Medium.otf',
  variable: '--clashDisplay-medium',
  weight: '500',
  display: 'swap',
});

const clashDisplayRegular = localFont({
  src: './fonts/ClashDisplay-Regular.otf',
  variable: '--clashDisplay-regular',
  weight: '400',
  display: 'swap',
});

const satoshiBold = localFont({
  src: './fonts/Satoshi-Bold.otf',
  variable: '--satoshi-bold',
  weight: '700',
  display: 'swap',
});

const satoshiRegular = localFont({
  src: './fonts/Satoshi-Regular.woff',
  variable: '--satoshi-regular',
  weight: '400',
  display: 'swap',
});

export {
  clashDisplayExtralight,
  clashDisplayBold,
  clashDisplayMedium,
  clashDisplayRegular,
  satoshiBold,
  satoshiRegular,
};
