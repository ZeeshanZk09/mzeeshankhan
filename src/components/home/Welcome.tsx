'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function Welcome() {
  return (
    <AnimationWrapper>
      <section className='relative h-screen overflow-hidden flex items-center space-y-10 flex-col justify-center'>
        {/* Background Image with fade-in animation */}
        <div className='absolute h-screen w-screen bg-white opacity-40'>
          <Image
            src='/assets/images/welcome-bg-img.jpg'
            alt='welcome-bg-img'
            fill
            className='object-cover w-full h-full'
          />
        </div>

        {/* Heading Animation */}
        <h1 className='font-clashDisplayMedium tracking-widest text-center text-4xl px-2 sm:p-0 sm:text-6xl z-10'>
          Welcome to visit my portfolio
        </h1>

        {/* Scroll Down Text & Gif */}
        <div className='sm:items-center w-2/3 gap-10 sm:gap-0 lg:w-1/3 flex flex-col sm:flex-row items-start sm:justify-between z-10'>
          <p className='text-lg justify-self-start font-satoshiBold underline'>
            Scroll down to see more:
          </p>

          {/* Bouncing Arrow Animation */}
          <Link href={`#hero`}>
            <div>
              <Image
                src='/assets/giffs/down.gif'
                width={100}
                height={100}
                alt='down.gif'
                className='object-cover rounded-full w-10 h-10 bg-[aliceblue]'
                unoptimized
              />
            </div>
          </Link>
        </div>
      </section>
    </AnimationWrapper>
  );
}
