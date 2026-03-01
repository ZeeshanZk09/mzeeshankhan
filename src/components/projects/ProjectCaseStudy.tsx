import React from 'react';
import Image from 'next/image';

export default function ProjectCaseStudy({
  title = 'Project Example',
  challenge = 'The challenge description...',
  solution = 'The implemented solution...',
  outcome = 'Measured outcome or results',
}: {
  title?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
}) {
  return (
    <section id='case-study' className='py-12 px-10 sm:px-24 bg-white/50'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
        <div>
          <h2 className='text-3xl font-clashDisplayRegular mb-3'>{title}</h2>
          <h3 className='text-lg font-semibold mb-2'>Challenge</h3>
          <p className='text-gray-700 mb-4'>{challenge}</p>

          <h3 className='text-lg font-semibold mb-2'>Solution</h3>
          <p className='text-gray-700 mb-4'>{solution}</p>

          <h3 className='text-lg font-semibold mb-2'>Outcome</h3>
          <p className='text-gray-700'>{outcome}</p>
        </div>

        <div className='w-full h-64 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center'>
          <div className='relative w-full h-full'>
            <Image
              src={'/assets/images/home/stars.png'}
              alt={title}
              fill
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
