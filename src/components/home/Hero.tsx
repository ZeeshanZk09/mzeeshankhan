'use client';

import Link from 'next/link';
import NavigationLinksToSocialMediaProfiles from '../utils/NavigationLinksToSocialMediaProfiles';
import Image from 'next/image';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function Hero() {
  return (
    <AnimationWrapper>
      <section
        id='hero'
        className='z-50 flex flex-col md:flex-row-reverse items-center min-h-screen justify-between py-10 px-6 md:px-24'
      >
        {/* Image Section */}
        <div className=' flex flex-col items-center justify-center'>
          <div
            className={`hero-img w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner bg-[url('/assets/images/me.jpg')] bg-no-repeat bg-cover bg-[center_top] bg-clip-border bg-[rgba(0,0,0,0.13)]`}
          ></div>

          {/* Social Icons */}
          <NavigationLinksToSocialMediaProfiles
            className='mt-4'
            iconClassName='text-white/80 hover:text-white/90'
          />
        </div>

        {/* Text Section */}
        <div className='mt-8 md:mt-0 w-full md:w-[45%] flex flex-col text-center md:text-left items-center md:items-start'>
          <h1 className='text-3xl md:text-5xl 2xl:text-6xl font-bold text-center md:text-left'>
            Hi, I&apos;m <span className='text-[#06a475]'>M Zeeshan Khan</span> — MERN Stack
            Developer
          </h1>

          <p className='mt-4 text-white/70 text-base md:text-lg max-w-2xl text-justify font-satoshiRegular'>
            I&apos;m a Mern Stack developer with two year of hands-on experience building interfaces
            with React and Next.js. I love crafting clean, accessible and high-performance user
            experiences — paying close attention to interaction details, responsive layouts and
            visual polish.
          </p>

          <p className='mt-3 text-sm text-white font-medium animate-pulse drop-shadow-[0_0_16px_#1eac82] bg-[#1eac82]/20 rounded-full px-2 py-1  shadow-[0_0_24px_#5affce]'>
            {/* border border-[#5affce] */}
            Available to work · Open to opportunities
          </p>

          {/* Buttons */}
          <div className='flex flex-wrap max-sm:justify-center  gap-4 mt-6'>
            <Link
              aria-label='View projects'
              className='flex-1 bg-[#047856] text-white py-2 px-4 rounded-md hover:bg-[#04663d] font-satoshiRegular'
              href='/projects'
            >
              View Projects
            </Link>

            <Link
              aria-label='Contact for work'
              className='border border-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-100 font-satoshiRegular transition-colors duration-200'
              href='#contact'
            >
              Hire Me
            </Link>

            <Link
              id='download-cv-btn'
              href='/assets/docs/m-zeeshan-khan.pdf'
              className='flex items-center bg-white/20 text-black py-2 px-3 rounded-md hover:bg-gray-50 font-satoshiRegular transition-colors duration-200'
              download={'m-zeeshan-khan.pdf'}
              title='Download CV'
            >
              <Image
                src='/assets/images/download.png'
                alt='download-my-cv'
                width={20}
                height={20}
              />
              <span className='ml-2'>Download CV</span>
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
