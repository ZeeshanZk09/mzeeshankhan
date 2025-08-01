// src/components/ToastProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: '14px',
          padding: '12px 16px',
        },
      }}
    />
  );
}
