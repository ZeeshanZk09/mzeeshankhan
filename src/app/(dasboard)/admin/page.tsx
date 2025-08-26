'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/hooks/useAuth';
import toastService from '@/services/toastService';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import CldImage from '@/components/ui/CldImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Shield, Calendar, User, Verified } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence, spring } from 'framer-motion';

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardHover = {
  scale: 1.03,
  transition: { type: spring, stiffness: 400, damping: 10 },
};

export default function Admin() {
  const { error, user, users, loading } = useAuth();
  const router = useRouter();

  if (!user?.isAdmin) {
    toastService.warning('This is not the route for you.');
    setTimeout(() => router.push('/profile'), 1000);
    return null;
  }

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
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='px-10 sm:px-24 py-20'
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-3xl font-bold mb-8'
        >
          User Management
        </motion.h1>

        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6'
        >
          <AnimatePresence>
            {users?.map((user) => (
              <motion.div
                key={user._id.toString()}
                variants={item}
                layout
                whileHover={cardHover}
                whileTap={{ scale: 0.98 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className='hover:shadow-lg transition-shadow min-w-[10rem] sm:min-w-[20rem] h-full'>
                  <CardHeader className='relative p-0'>
                    {user.coverPic?.url && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CldImage
                          src={user.coverPic.url}
                          alt={`${user.username}'s cover`}
                          width={600}
                          height={200}
                          className='w-full h-32 object-cover rounded-t-lg'
                        />
                      </motion.div>
                    )}
                    <motion.div
                      className=' -bottom-12 left-4
                      absolute h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden
                      '
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.4 }}
                    >
                      <CldImage
                        src={user.profilePic?.url || '/default-avatar.png'}
                        alt={user.username}
                        width={100}
                        height={100}
                        className='w-full h-full object-cover'
                      />
                    </motion.div>
                  </CardHeader>

                  <CardContent className='pt-16 px-4'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <CardTitle className='flex items-center justify-between'>
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                        {user.isAdmin && (
                          <Badge variant='premium' className='ml-2'>
                            <Shield className='h-4 w-4 mr-1' /> Admin
                          </Badge>
                        )}
                      </CardTitle>
                    </motion.div>

                    <motion.div
                      className='mt-4 space-y-2 text-sm'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className='flex items-center'>
                        <User className='h-4 w-4 mr-2 text-muted-foreground' />
                        <span className='font-medium'>@{user.username}</span>
                      </div>

                      <div className='flex items-center'>
                        <Mail className='h-4 w-4 mr-2 text-muted-foreground' />
                        <span className='truncate'>{user.email}</span>
                        {user.emailVerified ? (
                          <Verified className='h-4 w-4 ml-2 text-green-500' />
                        ) : (
                          <Badge variant='secondary' className='ml-2'>
                            Unverified
                          </Badge>
                        )}
                      </div>

                      {user.phone && (
                        <div className='flex items-center'>
                          <Phone className='h-4 w-4 mr-2 text-muted-foreground' />
                          <span>{user.phone}</span>
                          {user.phoneVerified ? (
                            <Verified className='h-4 w-4 ml-2 text-green-500' />
                          ) : (
                            <Badge variant='secondary' className='ml-2'>
                              Unverified
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className='flex items-center'>
                        <Calendar className='h-4 w-4 mr-2 text-muted-foreground' />
                        <span>Joined {format(new Date(user.createdAt), 'MMM yyyy')}</span>
                      </div>
                    </motion.div>
                  </CardContent>

                  <CardFooter className='flex justify-end p-4'>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className='flex'
                    >
                      <Button variant='outline' size='sm'>
                        View Profile
                      </Button>
                      <Button variant='default' size='sm' className='ml-2'>
                        Edit
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </ProtectedRoute>
  );
}
