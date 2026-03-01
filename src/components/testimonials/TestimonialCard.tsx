import React from 'react';

export default function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role?: string;
}) {
  return (
    <div className='p-6 rounded-lg bg-white/80 shadow-sm'>
      <p className='text-gray-800 mb-4'>“{quote}”</p>
      <div className='text-sm font-semibold'>{author}</div>
      {role && <div className='text-xs text-gray-600'>{role}</div>}
    </div>
  );
}
