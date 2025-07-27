import React from 'react';
import NavigationLinksToSocialMediaProfiles from '../utils/NavigationLinksToSocialMediaProfiles';
import QuickLinks from '../utils/QuickLinks';
import AnimationWrapper from '../utils/AnimationWrapper';

export default function Footer() {
  return (
    <AnimationWrapper>
      <footer className='bg-gradient-to-t from-gray-100 to-[aliceblue]  flex flex-col   overflow-x-hidden w-screen justify-between h-fit text-black '>
        {/* Logo and navigation */}
        <div className='flex flex-col sm:flex-row w-full justify-between items-center px-10 sm:px-24 my-5'>
          <div className='flex flex-col  h-fit w-fit   gap-10'>
            <h2 className='font-clashDisplayRegular text-4xl '>M Zeeshan Khan</h2>
            <div>
              <h2 className='font-clashDisplayMedium text-xl tracking-widest'>Quick links:</h2>
              <QuickLinks
                navClassName={`w-full`}
                ulClassName={`  flex-col sm:flex-row sm:space-x-4`}
                liClassName={`ml-5 sm:ml-0 `}
              />
            </div>
            {/* Social media links */}
            <div>
              <h2 className='font-clashDisplayMedium text-xl tracking-widest'>
                Social Media Links:
              </h2>
              <NavigationLinksToSocialMediaProfiles className={``} />
            </div>
          </div>
        </div>

        {/* Copyright text */}
        <div className='bg-gray-800 py-4 w-screen'>
          <p className='px-10 text-center font-satoshiRegular  text-gray-100 test-sm sm:text-lg'>
            © {new Date().getFullYear()}{' '}
            <span className='text-green-300'>Muhammad Zeeshan Khan</span>. All Rights Reserved.
          </p>
        </div>
      </footer>
    </AnimationWrapper>
  );
}
