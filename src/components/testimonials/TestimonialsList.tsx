import React from 'react';
import TestimonialCard from './TestimonialCard';
import GitHubHighlights from './GitHubHighlights';

const sample = [
  { quote: 'Great collaborator and fast learner.', author: 'Ali Khan', role: 'Product Manager' },
  {
    quote: 'Delivered high-quality UI with attention to detail.',
    author: 'Sara Ahmed',
    role: 'Designer',
  },
  {
    quote: 'Responsive and communicative — highly recommended.',
    author: 'Client X',
    role: 'Founder',
  },
];

export default function TestimonialsList({
  items = sample,
}: {
  items?: { quote: string; author: string; role?: string }[];
}) {
  return (
    <section id='testimonials' className='py-12 px-10 sm:px-24'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-clashDisplayRegular mb-6'>Testimonials</h1>
        <p className='text-gray-700 mb-6'>Feedback from peers, clients and collaborators.</p>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {items.map((it, i) => (
            <TestimonialCard key={i} quote={it.quote} author={it.author} role={it.role} />
          ))}
        </div>

        <div className='mt-8'>
          <GitHubHighlights />
        </div>
      </div>
    </section>
  );
}
