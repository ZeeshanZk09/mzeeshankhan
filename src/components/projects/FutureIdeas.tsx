import React from 'react';

export default function FutureIdeas({ ideas = [] as string[] }: { ideas?: string[] }) {
  const defaultIdeas = [
    'Interactive dashboards with real-time data',
    '3D product showcases using Three.js',
    'Performance-first e-commerce templates',
  ];

  return (
    <section id='future-ideas' className='py-8 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h3 className='text-2xl font-clashDisplayRegular mb-3'>Future Project Ideas</h3>
        <ul className='list-disc pl-6 text-gray-700 space-y-2'>
          {(ideas.length ? ideas : defaultIdeas).map((i, idx) => (
            <li key={idx} className='font-satoshiRegular'>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
