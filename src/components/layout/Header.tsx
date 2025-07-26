'use client';

import Link from 'next/link';
import React from 'react';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function Header() {
  return (
    <AnimationWrapper>
      <header className='absolute py-5 flex justify-center sm:justify-end w-screen sm:px-24 bg-transparent z-30'>
        <Link href='/' className='text-black w-max lg:w-fit'>
          <span className='sr-only'>Zk Muhammad Zeeshan Khan</span>
          <h2 className='w-max font-clashDisplayRegular text-3xl sm:text-4xl justify-self-end'>
            M Zeeshan Khan
          </h2>
        </Link>
      </header>
    </AnimationWrapper>
  );
}
