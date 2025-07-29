'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimationWrapper from '../utils/AnimationWrapper';
import { Button } from '../ui/button';

export default function Welcome() {
  return (
    <AnimationWrapper>
      <section className=' relative h-screen overflow-hidden flex items-start flex-col  space-y-6 text-left '>
        {/* Background Image */}
        <div className='absolute h-screen w-screen bg-white opacity-30 z-0'>
          <Image
            src='/assets/images/welcome-bg-img.jpg'
            alt='welcome-bg-img'
            priority
            fill
            className='object-cover w-full h-full'
          />
        </div>
        <section className='pt-36 sm:pt-28 px-10 sm:px-24 z-30 space-y-6'>
          {/* Heading */}
          <span className='flex items-center gap-2 w-fit  font-satoshiRegular tracking-wider rounded-full border px-2 border-black text-base sm:text-lg z-10 text-gray-800'>
            <Image
              className='w-4 h-4'
              src={'/assets/images/home/stars.png'}
              alt='stars'
              width={1000}
              height={1000}
            />
            <span>Welcome to my Portfolio</span>
          </span>

          {/* Intro Text */}
          <p className='text-black  text-xl sm:text-3xl text-justify max-w-2xl z-10'>
            I’m <strong>M Zeeshan Khan</strong>, a FullStack developer passionate about building
            scalable, responsive, and accessible web applications using modern technologies.
          </p>
          <hr className='invert' />
          <strong className='text-base sm:text-xl'>
            Transforming slow applications into high-performance engines.
          </strong>

          {/* Buttons */}
          <div className='flex items-center gap-4 z-10'>
            <Link href='/projects'>
              <Button className='w-full py-3 text-sm sm:text-base font-medium text-white bg-[#047856] hover:bg-[#03603d] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors '>
                See My Work
              </Button>
            </Link>
            <Link href='#contact'>
              <Button
                type='button'
                className='w-full py-3 text-sm sm:text-base font-medium text-white bg-[#047856] hover:bg-[#03603d] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors '
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </section>
    </AnimationWrapper>
  );
}
