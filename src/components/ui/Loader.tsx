import React from 'react';

export default function Loader() {
  return (
    <div className='absolute w-screen overflow-hidden flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-800'>
      <div className='flex items-center space-x-2 animate-pulse'>
        <div className='w-8 h-8 bg-green-500 rounded-full'></div>
        <div className='w-8 h-8 bg-green-600 rounded-full'></div>
        <div className='w-8 h-8 bg-green-700 rounded-full'></div>
      </div>
      <p className='mt-4 text-lg font-semibold'>Loading, please wait...</p>
    </div>
  );
}
