'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUser } from '@/hooks/UserContext';
import { motion } from 'framer-motion';
import { Edit, Mail, Phone, User, Shield, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';
import toastService from '@/services/toastService';
import CldImage from '@/components/ui/CldImage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user, error, loading, refetchUser } = useUser();
  const router = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Add this useEffect to handle the initial load
  useEffect(() => {
    if (!loading && !user && !isInitialLoad) {
      router.push('/sign-in');
    }
    setIsInitialLoad(false);
  }, [loading, user, isInitialLoad, router]);

  // Add this to handle refresh if data is missing
  useEffect(() => {
    if (!user && !loading) {
      const timer = setTimeout(() => {
        refetchUser();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, loading, refetchUser]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (error) {
    toastService.error(`Fetch error: ${error}`);
    return null;
  }

  if (loading || !user) {
    return (
      <ProtectedRoute>
        <div className='flex items-center justify-center min-h-screen'>
          <Loader />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='min-h-screen py-24 px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-4xl mx-auto'>
          {/* Cover Photo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='relative h-48 rounded-t-xl overflow-hidden shadow-lg bg-gray-200'
          >
            {user.coverPic?.url ? (
              <CldImage
                src={user.coverPic.url}
                alt='Cover'
                width={1000}
                height={1000}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400'></div>
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='bg-white dark:bg-gray-800 rounded-b-xl shadow-xl overflow-hidden -mt-16 relative z-10'
          >
            {/* Profile Header */}
            <div className='px-6 pb-6 pt-16 sm:pt-20 sm:px-10'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                {/* Avatar */}
                <motion.div
                  variants={item}
                  className='relative -mt-[4rem] sm:-mt-24 h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-200 z-30'
                >
                  {user.profilePic?.url ? (
                    <CldImage
                      src={user.profilePic.url}
                      alt={`${user.firstName} ${user.lastName}`}
                      width={400}
                      height={400}
                      className='absolute h-full w-full object-cover'
                    />
                  ) : (
                    <div className='h-full w-full flex items-center justify-center'>
                      <User className='text-gray-400 text-4xl' />
                    </div>
                  )}
                </motion.div>

                {/* User Info */}
                <motion.div variants={item} className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className='text-gray-600 dark:text-gray-300'>@{user.username}</p>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='rounded-full'
                      onClick={() => router.push('/profile/edit')}
                    >
                      <Edit className='text-gray-600 dark:text-gray-400' />
                    </Button>
                  </div>

                  {/* Badges */}
                  <motion.div variants={item} className='flex flex-wrap gap-2 mt-3'>
                    {user.isAdmin && (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'>
                        <Shield className='mr-1 h-3 w-3' /> Admin
                      </span>
                    )}
                    {!user.emailVerified && (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'>
                        Email Not Verified
                      </span>
                    )}
                    {user.isAdmin && (
                      <Button
                        variant='outline'
                        size='sm'
                        className='rounded-full text-xs h-7 px-3'
                        onClick={() => router.push('/admin')}
                      >
                        <LayoutDashboard className='mr-1 h-3 w-3' /> Admin dashboard
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Profile Details */}
            <motion.div
              variants={container}
              className='border-t border-gray-200 dark:border-gray-700 px-6 py-6 sm:px-10'
            >
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Personal Information
              </h2>

              <motion.div variants={item} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Email */}
                <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-full mr-3'>
                    <Mail className='text-blue-600 dark:text-blue-300' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Email</p>
                    <p className='font-medium dark:text-white'>{user.email}</p>
                    {!user.emailVerified && (
                      <p className='text-xs text-yellow-600 dark:text-yellow-400 mt-1'>
                        Verification pending
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone (if available) */}
                <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <div className='p-2 bg-green-100 dark:bg-green-900 rounded-full mr-3'>
                    <Phone className='text-green-600 dark:text-green-300' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Phone</p>
                    <p className='font-medium dark:text-white'>{user.phone || 'Not provided'}</p>
                    {user.phone && !user.phoneVerified && (
                      <p className='text-xs text-yellow-600 dark:text-yellow-400 mt-1'>
                        Verification pending
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Created */}
                <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <div className='p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full mr-3'>
                    <User className='text-indigo-600 dark:text-indigo-300' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Member Since</p>
                    <p className='font-medium dark:text-white'>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className='flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                  <div className='p-2 bg-purple-100 dark:bg-purple-900 rounded-full mr-3'>
                    <Edit className='text-purple-600 dark:text-purple-300' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Last Updated</p>
                    <p className='font-medium dark:text-white'>
                      {new Date(user.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Edit Profile Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-8 flex justify-center'
          >
            <Button
              onClick={() => router.push('/profile/edit')}
              className='px-6 py-3 rounded-lg shadow-md'
            >
              Edit Profile
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Profile;
