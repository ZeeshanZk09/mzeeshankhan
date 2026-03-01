'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimationWrapper from '../utils/AnimationWrapper';
import { Button } from '../ui/button';

export default function Welcome() {
  return (
    <AnimationWrapper>
      <section className='relative min-h-screen overflow-hidden flex items-start flex-col space-y-6 text-left'>
        <section className='pt-36 sm:pt-28 px-6 sm:px-24 z-30 space-y-6 '>
          {/* Heading */}
          <span className='px-2 flex items-center gap-2 w-fit font-satoshiRegular rounded-full  z-10 text-gray-800 bg-white/60'>
            <Image src={'/assets/images/home/stars.png'} alt='stars' width={16} height={16} />
            <span className='pr-2 py-1 leading-none'>Welcome to my Portfolio</span>
          </span>

          <h1 className='text-3xl sm:text-5xl font-clashDisplayMedium leading-tight text-black'>
            Hi, I’m <span className='text-[#06a475]'>M Zeeshan Khan</span>
            <br />
            <span className='text-xl sm:text-2xl font-medium text-gray-300'>
              MERN Stack developer — TypeScript & Next.js
            </span>
          </h1>

          {/* Short, punchy intro */}
          <p className='text-white/70 text-lg sm:text-xl max-w-3xl'>
            I build fast, accessible, and maintainable web applications using React, Next.js, and
            Node.js. I care about performance, developer experience, and shipping delightful
            interfaces that scale.
          </p>

          {/* Skill chips */}
          <div className='flex flex-wrap gap-2'>
            {[
              'TypeScript',
              'React',
              'Next.js',
              'Node.js',
              'Tailwind',
              'MongoDB',
              'PostgreSQL',
              'Prisma',
              'Neon',
            ].map((s) => (
              <span key={s} className='px-3 py-1 bg-white/80 rounded-full text-sm text-gray-800'>
                {s}
              </span>
            ))}
          </div>

          <hr />

          {/* Buttons */}
          <div className='flex  items-center gap-4 z-10'>
            <Link href='/projects'>
              <Button className='w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium text-white bg-[#047856] hover:bg-[#03603d] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors'>
                See My Work
              </Button>
            </Link>
            <Link href='#contact'>
              <Button
                type='button'
                className='w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium text-white bg-[#0b7f5a] hover:bg-[#06583f] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors'
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
