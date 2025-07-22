'use client';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function UnderConstruction() {
  useEffect(() => {
    toast(
      <div className='flex items-center justify-between'>
        <span>🚧 This website is under construction</span>
        <button
          onClick={() => toast.dismiss()}
          className='ml-4 px-2 py-1 text-sm bg-white/20 rounded'
        >
          Dismiss
        </button>
      </div>,
      {
        duration: Infinity, // Stays until dismissed
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          padding: '1rem',
          borderRadius: '8px',
        },
      }
    );
  }, []);

  return <Toaster />;
}
