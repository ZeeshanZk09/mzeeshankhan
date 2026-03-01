import React from 'react';
import Image from 'next/image';

const tech = [
  { name: 'React', icon: '/assets/images/skillsSection/react.svg' },
  { name: 'Next.js', icon: '/assets/images/skillsSection/nextjs.svg' },
  { name: 'Tailwind', icon: '/assets/images/skillsSection/tailwindcss.svg' },
  { name: 'TypeScript', icon: '/assets/images/skillsSection/typescript-96.svg' },
  { name: 'Node.js', icon: '/assets/images/skillsSection/nodejs.png' },
  { name: 'MongoDB', icon: '/assets/images/skillsSection/mongo.svg' },
];

export default function TechGrid() {
  return (
    <section id='tech-grid' className='py-12 px-10 sm:px-24 bg-white/0'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4'>Technologies I Use</h2>
        <p className='text-gray-700 mb-6 max-w-3xl'>Tools and languages I frequently work with.</p>

        <div className='grid grid-cols-3 sm:grid-cols-6 gap-4'>
          {tech.map((t) => (
            <div
              key={t.name}
              className='flex flex-col items-center p-3 bg-white/80 rounded-lg shadow-sm'
            >
              <div className='w-12 h-12 relative mb-2'>
                <Image src={t.icon} alt={t.name} fill className='object-contain' />
              </div>
              <div className='text-sm'>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
