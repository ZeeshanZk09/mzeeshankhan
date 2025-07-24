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
        className='flex flex-col lg:flex-row-reverse items-center min-h-screen justify-between bg-[aliceblue] py-10 px-10 md:px-24'
      >
        {/* Image Section */}
        <div className='justify-self-end'>
          <div className='w-full md:w-1/2 flex flex-col items-center lg:items-start'>
            <div
              className={`hero-img w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full border-2 border-t-slate-400 border-b-[#04AF70] border-r-[#04AF70] border-l-[#04AF70] shadow-black shadow-inner bg-[url('/assets/images/M-Zeeshan-Khan.png')] bg-no-repeat bg-cover bg-[center_top] bg-clip-border bg-[rgba(0,0,0,0.13)]`}
            ></div>

            {/* Social Icons */}
            <div>
              <NavigationLinksToSocialMediaProfiles className='pl-0 lg:pl-24' />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className='mt-8 md:mt-0 w-full md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start'>
          <p className='text-lg font-light text-black font-satoshiRegular'>Hi I am</p>

          <span className='text-[#007A4D] font-clashDisplayRegular text-2xl md:text-4xl 2xl:text-5xl'>
            Muhammad Zeeshan Khan
          </span>

          <br />

          <h1 className='text-3xl md:text-5xl 2xl:text-6xl font-bold'>
            <span className='block font-satoshiBold text-black'>Web App</span>
            <span className='block font-satoshiBold text-black'>Developer</span>
          </h1>

          <p className='mt-4 text-gray-900 text-base md:text-lg max-w-lg text-justify font-satoshiRegular'>
            Driven by a passion for continuous learning and innovation, I strive to create impactful
            and meaningful solutions. With every step rooted in dedication and perseverance, I am
            committed to delivering excellence and shaping a successful future in the ever-evolving
            tech landscape.
          </p>

          {/* Buttons */}
          <div className='flex gap-4'>
            <Link href='#contact'>
              <button
                type='button'
                className='mt-6 bg-[#047856] text-[#F0F0F0] py-2 px-4 rounded-md hover:bg-[#04663d] hover:text-white font-satoshiRegular'
              >
                Hire Me
              </button>
            </Link>

            <Link
              id='download-cv-btn'
              href='/assets/docs/ZK Resume.pdf'
              className='flex items-center mt-6 bg-[#047856] text-[#F0F0F0] py-2 px-4 rounded-md hover:bg-[#04663d] hover:text-white font-satoshiRegular'
              download={'ZK Resume.pdf'}
              title='Download CV'
            >
              <Image
                className='invert'
                src='/assets/images/download.png'
                alt='download-my-cv'
                width={24}
                height={24}
              />
              <span className='ml-2'>Download CV</span>
            </Link>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
}
