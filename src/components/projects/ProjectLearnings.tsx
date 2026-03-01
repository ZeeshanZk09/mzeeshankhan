import React from 'react';

export default function ProjectLearnings({ learnings = [] as string[] }: { learnings?: string[] }) {
  return (
    <section id='learnings' className='py-8 px-10 sm:px-24 bg-white/0'>
      <div className='max-w-6xl mx-auto'>
        <h3 className='text-2xl font-clashDisplayRegular mb-3'>What I Learned</h3>
        <ul className='list-disc pl-6 text-gray-700 space-y-2'>
          {learnings.length ? (
            learnings.map((l, i) => (
              <li key={i} className='font-satoshiRegular'>
                {l}
              </li>
            ))
          ) : (
            <li className='font-satoshiRegular'>
              Focused on performance, accessibility, and maintainability.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
