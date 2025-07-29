'use client';

import { useEffect } from 'react';

export function CleanDom() {
  useEffect(() => {
    const cleanup = () => {
      document.body?.removeAttribute('data-new-gr-c-s-check-loaded');
      document.body?.removeAttribute('data-gr-ext-installed');
      document.documentElement?.removeAttribute('data-be-installed');
    };

    // Run immediately and on route changes
    cleanup();
    window.addEventListener('routeChangeComplete', cleanup);

    return () => {
      window.removeEventListener('routeChangeComplete', cleanup);
    };
  }, []);

  return null;
}
