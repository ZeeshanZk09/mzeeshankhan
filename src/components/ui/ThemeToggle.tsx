'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      type='button'
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='fixed bottom-6 right-6 z-[100] p-3 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white/20 dark:hover:bg-white/20'
    >
      {theme === 'dark' ? (
        <Sun className='w-5 h-5 text-yellow-400' />
      ) : (
        <Moon className='w-5 h-5 text-slate-800' />
      )}
    </button>
  );
}
