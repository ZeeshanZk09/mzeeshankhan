import React from 'react';

const offerings = [
  {
    id: 'responsive',
    title: 'Responsive Website Development',
    desc: 'Pixel-perfect, mobile-first websites that look great on every device using semantic HTML, TailwindCSS and modern layout techniques.',
  },
  {
    id: 'interactive',
    title: 'Interactive UI Components',
    desc: 'Reusable, accessible components (modals, forms, animations) built with React and thoughtfully tested for usability.',
  },
  {
    id: 'compatibility',
    title: 'Cross-Browser Compatibility & Optimization',
    desc: 'Performance tuning, progressive enhancement and cross-browser testing to ensure consistent experiences and fast load times.',
  },
];

export default function ServicesList() {
  return (
    <section id='core-offerings' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4'>Core Offerings</h2>
        <p className='text-gray-700 mb-6 max-w-3xl'>
          I focus on delivering practical, maintainable and beautiful web experiences.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {offerings.map((o) => (
            <div key={o.id} className='p-6 rounded-lg bg-white/80 shadow-sm'>
              <h3 className='text-lg font-semibold mb-2'>{o.title}</h3>
              <p className='text-gray-600'>{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
