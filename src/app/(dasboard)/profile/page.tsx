'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useUser } from '@/hooks/UserContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Edit, Mail, Phone, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/Loader';

const Profile = () => {
  const { user, loading } = useUser();

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
            className='relative h-48 rounded-t-xl overflow-hidden shadow-lg'
          >
            {user.coverPic?.url && (
              <Image src={user.coverPic.url} alt='Cover' fill className='object-cover' />
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='bg-white rounded-b-xl shadow-xl overflow-hidden -mt-16 relative z-10'
          >
            {/* Profile Header */}
            <div className='px-6 pb-6 pt-16 sm:pt-20 sm:px-10'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                {/* Avatar */}
                <motion.div
                  variants={item}
                  className='relative -mt-20 sm:-mt-24 h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white shadow-lg overflow-hidden'
                >
                  {user.profilePic?.url ? (
                    <Image
                      src={user.profilePic.url}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='bg-gray-200 h-full w-full flex items-center justify-center'>
                      <User className='text-gray-400 text-4xl' />
                    </div>
                  )}
                </motion.div>

                {/* User Info */}
                <motion.div variants={item} className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className='text-gray-600'>@{user.username}</p>
                    </div>
                    <Button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
                      <Edit className='text-gray-600' />
                    </Button>
                  </div>

                  {/* Badges */}
                  <motion.div variants={item} className='flex gap-2 mt-3'>
                    {user.isAdmin && (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800'>
                        <Shield className='mr-1' /> Admin
                      </span>
                    )}
                    {!user.emailVerified && (
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
                        Email Not Verified
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Profile Details */}
            <motion.div
              variants={container}
              className='border-t border-gray-200 px-6 py-6 sm:px-10'
            >
              <h2 className='text-lg font-semibold text-gray-900 mb-4'>Personal Information</h2>

              <motion.div variants={item} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Email */}
                <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                  <div className='p-2 bg-blue-100 rounded-full mr-3'>
                    <Mail className='text-blue-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Email</p>
                    <p className='font-medium'>{user.email}</p>
                    {!user.emailVerified && (
                      <p className='text-xs text-yellow-600 mt-1'>Verification pending</p>
                    )}
                  </div>
                </div>

                {/* Phone (if available) */}
                <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                  <div className='p-2 bg-green-100 rounded-full mr-3'>
                    <Phone className='text-green-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Phone</p>
                    <p className='font-medium'>{user.phone || 'Not provided'}</p>
                    {user.phone && !user.phoneVerified && (
                      <p className='text-xs text-yellow-600 mt-1'>Verification pending</p>
                    )}
                  </div>
                </div>

                {/* Account Created */}
                <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                  <div className='p-2 bg-indigo-100 rounded-full mr-3'>
                    <User className='text-indigo-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Member Since</p>
                    <p className='font-medium'>
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                  <div className='p-2 bg-purple-100 rounded-full mr-3'>
                    <Edit className='text-purple-600' />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Last Updated</p>
                    <p className='font-medium'>
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

          {/* Edit Profile Button (fixed at bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-8 flex justify-center'
          >
            <Button className='px-6 py-3 bg-primary text-black bg-white rounded-lg shadow-md hover:bg-primary-dark transition-colors'>
              Edit Profile
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
};

export default Profile;
