import React from 'react';

const types = [
  'Business Websites',
  'Personal Portfolios',
  'Small Web Apps',
  'E‑commerce Stores',
  'Landing Pages',
];

export default function ProjectTypes() {
  return (
    <section id='project-types' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4'>
          Project Types I Build
        </h2>
        <p className='text-gray-700 mb-6 max-w-3xl'>Examples of projects I enjoy building.</p>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {types.map((t) => (
            <div key={t} className='p-4 rounded-lg bg-white/80 shadow-sm'>
              <div className='font-medium'>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
