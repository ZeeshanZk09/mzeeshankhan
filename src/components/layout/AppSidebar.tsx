'use client';
import {
  HandPlatter,
  Home,
  LogIn,
  LogOut,
  UserPlus2,
  Album,
  BriefcaseBusiness,
  BookCheck,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowResize';
import { useUser } from '@/hooks/UserContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import axios from 'axios';
import toastService from '@/services/toastService';

const items = [
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
  const { user } = useUser();

  const { width } = useWindowSize();
  const isMobile = width < 900;

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await axios.post('/auth/sign-out');
      toastService.success('User Sign Out successfully.');
      router.push('/sign-in');
    } catch (error) {
      toastService.error('Caught error while signing out.');
      console.log(error);
    }
  };

  return (
    <motion.div
      {...({
        className: `text-black fixed bottom-0 top-0 ${
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
              <div className='w-8 h-8 rounded-full bg-[#047856]'></div>
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
                      ? 'bg-green-100 dark:bg-gray-800'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {pathname === item.url && (
                    <motion.div
                      className='absolute left-0 top-0 bottom-0 w-1 bg-[#047856] rounded-r-lg'
                      layoutId='activeIndicator'
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`text-black flex-shrink-0`}>
                    <item.icon className='w-5 h-5' />
                  </div>

                  {/* Text */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        className='ml-3 text-lg text-gray-700'
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
      <motion.div
        className='px-4 py-6 border-t border-gray-200 dark:border-gray-700 mt-auto'
        layout
      >
        <div className='flex items-center justify-between'>
          {user ? (
            <div className='flex items-center gap-3 w-full'>
              {/* Profile Picture */}
              <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600'>
                {user.profilePic?.url && (
                  <Image
                    src={user.profilePic.url}
                    alt={user.username}
                    width={40}
                    height={40}
                    className='w-10 h-10 object-cover rounded-full'
                  />
                )}
              </div>

              {/* User Info */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className='flex flex-col'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className='text-sm font-semibold text-gray-900 dark:text-white truncate'>
                      {user.fullName}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </p>
                    <Button
                      variant={isOpen ? 'outline' : 'ghost'}
                      className={`w-full px-4 py-2 transition-all duration-300 ${
                        !isOpen ? 'rounded-full flex items-center justify-center' : ''
                      }`}
                      onClick={handleLogOut}
                    >
                      {isOpen ? (
                        <span className='text-lg'>Sign Out</span>
                      ) : (
                        <LogOut className='w-5 h-5' />
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                className={`w-full ${
                  isOpen ? 'flex flex-row gap-3' : 'flex flex-col items-center gap-3'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Sign In Button */}
                <Link href='/sign-in' className='w-full'>
                  <Button
                    variant={isOpen ? 'outline' : 'ghost'}
                    className={`w-full px-4 py-2 transition-all duration-300 ${
                      !isOpen ? 'rounded-full flex items-center justify-center' : ''
                    }`}
                  >
                    {isOpen ? (
                      <span className='text-lg'>Sign In</span>
                    ) : (
                      <LogIn className='w-5 h-5' />
                    )}
                  </Button>
                </Link>

                {/* Sign Up Button */}
                <Link href='/sign-up' className='w-full '>
                  <Button
                    variant={isOpen ? 'default' : 'secondary'}
                    className={`w-full px-4 py-2 transition-all duration-300 ${
                      !isOpen ? 'rounded-full flex items-center justify-center' : ''
                    }`}
                  >
                    {isOpen ? (
                      <span className='text-lg'>Sign Up</span>
                    ) : (
                      <UserPlus2 className='w-5 h-5' />
                    )}
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
