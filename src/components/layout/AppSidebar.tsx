'use client';
import { HandPlatter, Home, Album, BriefcaseBusiness, BookCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowResize';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
    color: 'text-blue-500',
  },
  {
    title: 'About',
    url: '/about',
    icon: Album,
    color: 'text-purple-500',
  },
  {
    title: 'Services',
    url: '/services',
    icon: HandPlatter,
    color: 'text-emerald-500',
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: BriefcaseBusiness,
    color: 'text-amber-500',
  },
  {
    title: 'Testimonials',
    url: '/testimonials',
    icon: BookCheck,
    color: 'text-rose-500',
  },
];

const sidebarVariants = {
  open: {
    width: '280px',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    width: '80px',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const { width } = useWindowSize();
  const isMobile = width < 900;
  console.log(isOpen);
  return (
    <motion.div
      {...({
        className: `fixed bottom-0 top-0 ${
          isOpen || !isMobile ? 'left-0' : '-left-[70px] px-4'
        } min-h-screen min-w-xl w-full h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col border-r border-gray-200 dark:border-gray-700 z-50`,
        initial: false,
        animate: isOpen ? 'open' : 'closed',
        variants: sidebarVariants,
      } as MotionProps)}
    >
      {/* Toggle Button */}
      <motion.button
        className='absolute -right-6 top-6 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center z-10'
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <motion.path
            d={isOpen ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
            animate={{ d: isOpen ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6' }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </motion.button>

      {/* Logo/Header */}
      <motion.div className='px-4 py-6 flex items-center justify-center' layout>
        <AnimatePresence>
          {isOpen ? (
            <motion.h1
              className='text-xl font-bold text-gray-800 font-clashDisplayMedium'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              M Zeeshan Khan
            </motion.h1>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className='w-8 h-8 rounded-full bg-blue-500'></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation Items */}
      <nav className='flex-1 mt-6'>
        <motion.ul className='space-y-2 px-3'>
          {items.map((item, index) => (
            <motion.li
              key={item.url}
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link href={item.url} passHref>
                <motion.div
                  className={`flex items-center p-3 rounded-lg cursor-pointer relative overflow-hidden ${
                    pathname === item.url
                      ? 'bg-blue-50 dark:bg-gray-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {pathname === item.url && (
                    <motion.div
                      className='absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-lg'
                      layoutId='activeIndicator'
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`${item.color} flex-shrink-0`}>
                    <item.icon className='w-5 h-5' />
                  </div>

                  {/* Text */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='ml-3 text-gray-700 dark:text-gray-300 font-medium'
                        variants={itemVariants as import('framer-motion').Variants}
                        initial='closed'
                        animate='open'
                        exit='closed'
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover effect */}
                  {hoveredItem === index && (
                    <motion.div
                      className='absolute inset-0 bg-black bg-opacity-5 dark:bg-opacity-10 rounded-lg'
                      layoutId='hoverBackground'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Footer/User Profile */}
      {/* <motion.div className='px-4 py-6 border-t border-gray-200 dark:border-gray-700' layout>
        <div className='flex items-center'>
          <div className='w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600'></div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className='ml-3'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>John Doe</p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div> */}
    </motion.div>
  );
}
