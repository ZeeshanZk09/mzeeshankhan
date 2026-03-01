import React from 'react';
import Link from 'next/link';

export default function ServicesCTA() {
  return (
    <section id='services-cta' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto text-center bg-white/0 py-8 rounded-lg'>
        <h3 className='text-2xl font-clashDisplayRegular mb-3'>Ready to start a project?</h3>
        <p className='text-gray-700 mb-6'>Tell me about your idea — I&apos;ll help you build it.</p>
        <div className='flex justify-center gap-4'>
          <Link href='#contact'>
            <button className='px-6 py-3 bg-[#047856] text-white rounded-md'>Contact Me</button>
          </Link>
          <Link href='/projects'>
            <button className='px-6 py-3 border border-gray-300 rounded-md'>See Projects</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
