'use client';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect, useRef } from 'react';

export default function UnderConstruction() {
  const toastInitialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized or not in browser
    if (toastInitialized.current || typeof window === 'undefined') return;

    const showToast = async () => {
      // Small delay to ensure proper initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      toastInitialized.current = true;

      const toastId = toast(
        (t) => (
          <div className='flex items-center justify-between gap-4'>
            <span>🚧 This website is under construction</span>
            <button
              type='button'
              onClick={() => toast.dismiss(t.id)}
              className='px-3 py-1 text-sm bg-white/20 rounded hover:bg-white/30 transition-colors'
              aria-label='Dismiss notification'
            >
              Dismiss
            </button>
          </div>
        ),
        {
          id: 'under-construction-toast',
          duration: Infinity,
          position: 'top-center',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            maxWidth: 'calc(100vw - 2rem)',
          },
        }
      );

      return toastId;
    };

    let toastId: string;
    showToast().then((id) => (toastId = id));

    // Cleanup function
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, []);

  return <Toaster />;
}
