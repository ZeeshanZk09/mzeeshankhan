'use client';

import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className='absolute py-5 flex justify-center sm:justify-end w-screen sm:px-24 bg-transparent z-20'>
      <Link href='/' className='text-white/80 w-max lg:w-fit'>
        <span className='sr-only'>Zk Muhammad Zeeshan Khan</span>
        <h2 className='w-max font-clashDisplayRegular text-3xl sm:text-4xl justify-self-end'>
          M Zeeshan Khan
        </h2>
      </Link>
    </header>
  );
}
