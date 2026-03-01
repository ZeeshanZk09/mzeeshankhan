'use client';
import {
  HandPlatter,
  Home,
  Album,
  BriefcaseBusiness,
  BookCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, spring } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { useWindowSize } from '@/hooks/useWindowResize';

const NAV_ITEMS = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'About',
    url: '/about',
    icon: Album,
  },
  {
    title: 'Services',
    url: '/services',
    icon: HandPlatter,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Testimonials',
    url: '/testimonials',
    icon: BookCheck,
  },
] as const;

const MOBILE_BREAKPOINT = 900;
const SIDEBAR_WIDTH_OPEN = 320;
const SIDEBAR_WIDTH_CLOSED = 80;

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < MOBILE_BREAKPOINT, [width]);
  const sidebarWidth = useMemo(
    () => (isOpen ? (isMobile ? '292px' : `${SIDEBAR_WIDTH_OPEN}px`) : `${SIDEBAR_WIDTH_CLOSED}px`),
    [isOpen, isMobile]
  );

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => isMobile && setIsOpen(false), [isMobile]);

  const sidebarVariants = {
    open: {
      width: sidebarWidth,
      transition: {
        type: spring,
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      width: sidebarWidth,
      transition: {
        type: spring,
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
        type: spring,
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

  const handleNavigation = useCallback(
    (url: string) => {
      router.push(url);
      closeSidebar();
    },
    [router, closeSidebar]
  );

  return (
    <motion.div
      className={` fixed top-0 ${
        isOpen || !isMobile ? 'left-0' : '-left-[68px]'
      } h-screen bg-transparent backdrop-blur-sm dark:bg-gray-900 shadow-xl flex flex-col  dark:border-gray-700 z-50`}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      {/* Toggle Button */}
      <motion.button
        className='z-50 absolute -right-6 top-6 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center  focus:outline-none focus:ring-2 focus:ring-green-500'
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.button>

      <motion.div
        className={`flex flex-col h-full overflow-y-auto custom-scrollbar overflow-x-clip
    overscroll-none`}
      >
        {/* Logo/Header */}
        <motion.div
          className='px-4 py-6 flex items-center justify-center cursor-pointer'
          onClick={() => handleNavigation('/')}
          layout
        >
          <AnimatePresence mode='wait'>
            {isOpen ? (
              <motion.h1
                className='text-xl font-bold text-white/70 dark:text-white font-clashDisplayMedium'
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
                <div className='w-8 h-8 rounded-full bg-[#047856] dark:bg-green-600' />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Items */}
        <nav className='flex-1 mt-2'>
          <motion.ul className='space-y-1 px-3'>
            {NAV_ITEMS.map((item, index) => (
              <motion.li
                key={item.url}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <Link href={item.url} passHref>
                  <motion.span
                    className={`flex items-center p-3 rounded-lg cursor-pointer relative overflow-hidden ${
                      pathname === item.url
                        ? 'bg-green-100 dark:bg-gray-800 text-green-700 dark:text-green-400'
                        : 'text-white/90 hover:text-white/90 hover:bg-black/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={closeSidebar}
                  >
                    {pathname === item.url && (
                      <motion.div
                        className='absolute left-0 top-0 bottom-0 w-1 bg-green-600 dark:bg-green-500 rounded-r-lg'
                        layoutId='activeIndicator'
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    <item.icon className='w-5 h-5 min-w-[20px]' />

                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          className='ml-3 text-sm font-medium'
                          variants={itemVariants}
                          initial='closed'
                          animate='open'
                          exit='closed'
                          key={item.url}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>

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
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.div>
    </motion.div>
  );
}
