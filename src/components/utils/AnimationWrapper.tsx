'use client';

import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.6, ease: easeInOut },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

export default function AnimationWrapper({ children }: { children: ReactNode }) {
  const path = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={path} // ensures animation on route change
        variants={variants}
        initial='hidden'
        whileInView='enter'
        viewport={{ once: false }}
        exit='exit'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
