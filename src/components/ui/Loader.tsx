import React from 'react';

export default function Loader() {
  return (
    <div
      className='fixed inset-0 z-[200] w-screen overflow-hidden flex flex-col items-center justify-center min-h-screen bg-background/80 backdrop-blur-sm'
      role='status'
      aria-live='polite'
      aria-label='Loading'
    >
      <div className='flex items-center space-x-2 animate-pulse'>
        <div className='w-8 h-8 bg-green-500 rounded-full' />
        <div className='w-8 h-8 bg-green-600 rounded-full' />
        <div className='w-8 h-8 bg-green-700 rounded-full' />
      </div>
      <p className='mt-4 text-lg font-semibold text-foreground'>Loading, please wait...</p>
    </div>
  );
}
