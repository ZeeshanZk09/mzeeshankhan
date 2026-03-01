import React from 'react';

const steps = [
  { id: 1, title: 'Discovery', desc: 'Requirement gathering, goals, and scope definition.' },
  { id: 2, title: 'Design', desc: 'Wireframes, visual direction and UI prototypes.' },
  { id: 3, title: 'Implementation', desc: 'Build with React / Next.js, tests, and optimization.' },
  { id: 4, title: 'Launch', desc: 'Deploy, monitor and iterate based on feedback.' },
];

export default function ServiceProcess() {
  return (
    <section id='process' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-clashDisplayRegular mb-4'>How I Work</h2>
        <p className='text-gray-700 mb-6 max-w-3xl'>
          A simple, transparent process to deliver quality results.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
          {steps.map((s) => (
            <div key={s.id} className='p-4 rounded-lg bg-white/80 shadow-sm'>
              <div className='text-xl font-semibold'>{s.title}</div>
              <div className='text-gray-600 mt-2'>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
