'use client';

import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className='absolute py-10 w-screen h-28 sm:px-5 bg-transparent '>
      <div
        className='flex w-full px-4 items-center justify-end lg:justify-between'
        aria-label='Global'
      >
        <div className='flex items-center flex-row-reverse lg:flex-row lg:w-fit w-screen justify-between h-5'>
          <Link href='/' className='text-black w-max lg:w-fit'>
            <span className='sr-only'>Zk Muhammad Zeeshan Khan</span>
            <h2 className='w-max font-clashDisplayRegular text-3xl sm:text-4xl justify-self-end'>
              M Zeeshan Khan
            </h2>
          </Link>
        </div>

        {/* Download CV Button */}
        <div className='hidden lg:flex w-fit lg:justify-end'>
          <Link
            href='/assets/docs/ZK Resume.pdf'
            target='_blank'
            download='ZK_Resume.pdf'
            id='download-cv-btn'
            className='relative w-fit px-2 py-1 lg:text-[1.278rem] xl:text-[1.556rem] 2xl:text-[1.944rem] font-semibold bg-[#04AF70] border-none rounded-lg text-white font-satoshiRegular cursor-pointer z-50 overflow-hidden'
          >
            Download CV
          </Link>
        </div>
      </div>
    </header>
  );
}
