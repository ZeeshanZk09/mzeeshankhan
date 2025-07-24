'use client';

import { useEffect } from 'react';

export function CleanDom() {
  useEffect(() => {
    // Remove attributes added by browser extensions
    document.body.removeAttribute('data-new-gr-c-s-check-loaded');
    document.body.removeAttribute('data-gr-ext-installed');
    document.documentElement.removeAttribute('data-be-installed');
  }, []);

  return null;
}
