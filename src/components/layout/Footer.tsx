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
      <footer className=' bg-gradient-to-t from-gray-100 to-[aliceblue] w-full text-black'>
        {/* Main footer content */}
        <div className='px-10 py-10 sm:px-24'>
          <div className='border-black border-t pt-8 flex flex-col sm:flex-row justify-between items-start gap-8'>
            {/* Left section - Brand and links */}
            <div className='flex-1 space-y-8'>
              <div className='space-y-2'>
                <h2 className='font-clashDisplayRegular text-4xl md:text-5xl hover:text-gray-700 transition-colors'>
                  M Zeeshan Khan
                </h2>
                <p className='font-satoshiRegular text-gray-600'>
                  Full Stack Developer & logic building Enthusiast
                </p>
              </div>

              <div className='space-y-4'>
                <h3 className='font-clashDisplayMedium text-xl tracking-widest border-b pb-2'>
                  Quick links:
                </h3>
                <QuickLinks
                  navClassName='w-full'
                  ulClassName='flex flex-col space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0'
                  liClassName='hover:underline hover:text-gray-700 transition-colors'
                />
              </div>

              <div className='space-y-4'>
                <h3 className='font-clashDisplayMedium text-xl tracking-widest border-b pb-2'>
                  Connect with me:
                </h3>
                <NavigationLinksToSocialMediaProfiles
                  className='flex space-x-4'
                  iconClassName='w-6 h-6 hover:scale-110 transition-transform'
                />
              </div>
            </div>

            {/* Right section - Source code button */}
            <div className='flex-shrink-0'>
              <button
                type='button'
                onClick={handleSourceCodeClick}
                className='flex items-center gap-2 rounded-full px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors group'
                aria-label='View source code on GitHub'
              >
                <span className='font-satoshiMedium'>Source Code</span>
                <Image
                  className='w-5 h-5 invert group-hover:rotate-6 transition-transform'
                  src={'/assets/images/social-icons/github.svg'}
                  alt='GitHub icon'
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className='bg-gray-800 py-4 w-full'>
          <div className='container mx-auto px-6 md:px-12 lg:px-24'>
            <p className='text-center font-satoshiRegular text-gray-100 text-sm sm:text-base'>
              © {new Date().getFullYear()}{' '}
              <span className='text-green-300 hover:text-green-200 transition-colors'>
                Muhammad Zeeshan Khan
              </span>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </AnimationWrapper>
  );
}
