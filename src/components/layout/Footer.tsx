'use client';
import React from 'react';
import NavigationLinksToSocialMediaProfiles from '../utils/NavigationLinksToSocialMediaProfiles';
import QuickLinks from '../utils/QuickLinks';
import AnimationWrapper from '../utils/AnimationWrapper';
import Image from 'next/image';

export default function Footer() {
  const handleSourceCodeClick = () => {
    window.open(
      'https://github.com/ZeeshanZk09/personal-portfolio-website-using-nextjs',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <AnimationWrapper>
      <footer className='relative  w-full text-white'>
        {/* Main footer content */}
        <div className='px-6 py-12 sm:px-24'>
          <div className=' pt-8 flex flex-col md:flex-row justify-between items-start gap-8 '>
            {/* Left section - Brand and links */}
            <div className='flex-1 space-y-6'>
              <div className='space-y-2 border-b border-white/6 pb-4'>
                <h2 className='font-clashDisplayRegular text-3xl md:text-4xl'>M Zeeshan Khan</h2>
                <p className='font-satoshiRegular tracking-wide text-white/70'>
                  Full-stack developer focused on performant, accessible, and maintainable web
                  experiences.
                </p>
              </div>

              <div className='space-y-4'>
                <h3 className='font-clashDisplayMedium text-lg'>Quick Links</h3>
                <QuickLinks
                  navClassName='w-full'
                  ulClassName='flex flex-col space-y-2 sm:flex-row sm:space-x-6 tracking-wide sm:items-center'
                  liClassName='text-white/70 hover:text-white transition-colors'
                />
              </div>
            </div>

            {/* Right section - Source code button */}
            <div className='flex-shrink-0 flex flex-col items-end gap-4'>
              <button
                type='button'
                onClick={handleSourceCodeClick}
                className='flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-white/10 text-white hover:ring-white/20 transition-colors group'
                aria-label='View source code on GitHub'
              >
                <Image
                  className='w-4 h-4 invert group-hover:rotate-6 transition-transform'
                  src={'/assets/images/social-icons/github.svg'}
                  alt='GitHub icon'
                  width={18}
                  height={18}
                />
                <span className='font-satoshiMedium text-sm'>Source</span>
              </button>

              <a
                href='/assets/docs/m-zeeshan-khan.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full px-5 py-2 ring-1 ring-white/8 text-sm text-white hover:ring-white/20 transition'
              >
                View Resume
              </a>
            </div>
          </div>

          <div className='mt-4 w-full space-y-4'>
            <h3 className='font-clashDisplayMedium text-lg'>Connect</h3>
            <div className='w-full flex flex-col justify-between sm:flex-row sm:items-center sm:space-x-6'>
              <NavigationLinksToSocialMediaProfiles
                className='flex space-x-4'
                iconClassName='w-6 h-6 text-white/85 hover:scale-110 transition-transform'
              />
              <a
                href='mailto:hello@zeeshankhan.dev'
                className='mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/10 text-white hover:ring-white/20 transition-colors'
                aria-label='Email M Zeeshan Khan'
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className='py-6 w-full'>
          <div className='container mx-auto px-6 md:px-12 lg:px-24'>
            <p className='text-center font-satoshiRegular text-white/60 text-sm sm:text-base'>
              © {new Date().getFullYear()} <span className='font-medium'>M Zeeshan Khan</span>. All
              rights reserved. • Built with Next.js
            </p>
          </div>
        </div>
      </footer>
    </AnimationWrapper>
  );
}
