'use client';

import Link from 'next/link';
import React from 'react';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function Header() {
  return (
    <AnimationWrapper>
      <header className='absolute py-10 w-screen h-28 px-10 sm:px-24 bg-transparent '>
        <div className='flex w-full px-4 items-center justify-end ' aria-label='Global'>
          <div className='flex items-center flex-row-reverse lg:flex-row lg:w-fit w-screen justify-between h-5 z-10'>
            <Link href='/' className='text-black w-max lg:w-fit'>
              <span className='sr-only'>Zk Muhammad Zeeshan Khan</span>
              <h2 className='w-max font-clashDisplayRegular text-3xl sm:text-4xl justify-self-end'>
                M Zeeshan Khan
              </h2>
            </Link>
          </div>
        </div>
      </header>
    </AnimationWrapper>
  );
}
