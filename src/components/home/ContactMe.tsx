'use client';

import React, { useState, useEffect } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => <div className='h-[78px] w-[304px] bg-gray-200 rounded'></div>,
});

// Animation variants - Using the same pattern as About page
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: easeInOut,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      ease: easeInOut,
    },
  },
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactMe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: 'onTouched' });

  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSubmit = async (data: FormData) => {
    setStatus(null);
    if (!recaptchaToken) {
      setStatus({ success: false, message: 'Please complete the reCAPTCHA verification' });
      return;
    }

    try {
      const recaptchaResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) throw new Error('reCAPTCHA verification failed');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setStatus({ success: true, message: responseData.message || 'Message sent successfully!' });
        reset();
        setRecaptchaToken(null);
      } else {
        throw new Error(responseData.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        success: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };
  if (!isMounted) return null;

  return (
    <motion.section
      id='contact'
      className='min-h-screen w-screen py-8 px-10  sm:px-24 font-satoshiRegular flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-20'
      variants={containerVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false }}
    >
      {/* Left Column - Contact Info */}
      <motion.div
        className='w-full lg:w-auto flex flex-col gap-8 lg:gap-12 xl:gap-16 lg:max-w-md xl:max-w-lg'
        variants={containerVariants}
      >
        <motion.div
          className='flex flex-col sm:flex-row items-center gap-6 sm:gap-8'
          variants={fadeUp}
        >
          <motion.div
            className='relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0'
            variants={scaleIn}
          >
            <Image
              src='/assets/images/me.jpg'
              alt='MZeeshanKhan'
              fill
              className='rounded-full object-cover'
              sizes='(max-width: 640px) 96px, (max-width: 768px) 128px, 160px'
              priority
            />
          </motion.div>
          <motion.h2
            className='font-satoshiRegular text-lg sm:text-xl md:text-2xl text-center sm:text-left'
            variants={fadeUp}
          >
            Wan&apos;na discuss any project or just say Hi? My inbox is open for everyone.
          </motion.h2>
        </motion.div>

        <motion.div className='space-y-4 md:space-y-6' variants={containerVariants}>
          <motion.h2 className='text-xl sm:text-2xl font-satoshiBold' variants={fadeUp}>
            Contact Details:
          </motion.h2>
          <motion.div className='space-y-4' variants={containerVariants}>
            <motion.div variants={fadeUp}>
              <ContactDetail
                label='Email'
                icon='/assets/images/contact/email.svg'
                value='mzeeshankhan0988@gmail.com'
                link='mailto:mzeeshankhan0988@gmail.com'
                linkIcon='/assets/images/contact/emailLink.svg'
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactDetail
                label='WhatsApp'
                icon='/assets/images/contact/whatsapp.svg'
                value='+92 337 8568671'
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactDetail
                label='Phone'
                icon='/assets/images/contact/phone.svg'
                value='+92 329 2564066'
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Column - Contact Form */}
      <motion.div
        className='w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg shadow-lg p-6 sm:p-8'
        variants={fadeUp}
      >
        <motion.h2
          className='text-xl sm:text-2xl font-bold font-clashDisplayRegular text-center text-gray-800'
          variants={fadeUp}
        >
          Direct Message
        </motion.h2>
        <motion.p className='mt-2 text-sm sm:text-base text-center text-gray-600' variants={fadeUp}>
          Have questions? Fill out the form below.
        </motion.p>

        <AnimatePresence mode='wait'>
          {status && (
            <motion.div
              className={`mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col mt-6 space-y-4'
          noValidate
          variants={containerVariants}
        >
          {/* Name Field */}
          <motion.div variants={fadeUp}>
            <TextField label='Name' id='name' register={register} errors={errors} />
          </motion.div>

          {/* Email Field */}
          <motion.div variants={fadeUp}>
            <TextField label='Email' id='email' type='email' register={register} errors={errors} />
          </motion.div>

          {/* Message Field */}
          <motion.div variants={fadeUp}>
            <TextAreaField id='message' register={register} errors={errors} />
          </motion.div>

          {/* reCAPTCHA */}
          <motion.div
            className='flex transform scale-75 sm:scale-100 justify-center'
            variants={fadeUp}
          >
            {isMounted && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
                size={isMobile ? 'compact' : 'normal'}
              />
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeUp}>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3 text-sm sm:text-base font-medium text-white bg-[#047856] hover:bg-[#03603d] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.section>
  );
}

type ContactDetailProps = {
  label: string;
  icon: string;
  value: string;
  link?: string;
  linkIcon?: string;
};

function ContactDetail({ label, icon, value, link, linkIcon }: ContactDetailProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-satoshiRegular'>{label}:</h3>
      <div className='flex items-center gap-3'>
        <div className='relative w-8 h-8 sm:w-10 sm:h-10'>
          <Image src={icon} fill alt={`${label} icon`} className='object-contain' />
        </div>
        {link ? (
          <Link
            href={link}
            target='_blank'
            className='flex items-center gap-1 text-black hover:text-green-700 transition-colors'
          >
            <span className='text-sm sm:text-base'>{value}</span>
            {linkIcon && (
              <div className='relative w-4 h-4 sm:w-5 sm:h-5'>
                <Image src={linkIcon} fill alt={`${label} link icon`} />
              </div>
            )}
          </Link>
        ) : (
          <span className='text-sm sm:text-base'>{value}</span>
        )}
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegister<FormData>; // Agar aapko pata hai ke register ka type kya hai (e.g. UseFormRegister), toh woh use karen
  errors: FieldErrors<FormData>;
};

function TextField({ label, id, type = 'text', register, errors }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm sm:text-base font-medium text-gray-700'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register(id as 'name' | 'email' | 'message', {
          required: `${label} is required Field`,
          ...(id === 'name' && {
            minLength: { value: 2, message: `${label} must be at least 2 characters` },
          }),
          ...(id === 'email' && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }),
        })}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`w-full px-3 py-2 sm:px-4 sm:py-2 mt-1 border rounded-lg focus:ring-2 focus:outline-none text-sm sm:text-base ${
          errors[id as keyof typeof errors]
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:ring-green-300'
        }`}
      />
      {errors[id as keyof typeof errors] && (
        <p className='mt-1 text-sm text-red-600'>
          {errors[id as keyof typeof errors]?.message as string}
        </p>
      )}
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

function TextAreaField({ id, register, errors }: TextAreaFieldProps) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm sm:text-base font-medium text-gray-700'>
        Message
      </label>
      <textarea
        id={id}
        rows={4}
        {...register(id as 'name' | 'email' | 'message', {
          required: 'Message is required',
          minLength: { value: 10, message: 'Message must be at least 10 characters' },
        })}
        placeholder='Enter your message'
        className={`w-full h-32 sm:h-40 px-3 py-2 sm:px-4 sm:py-2 mt-1 border rounded-lg focus:ring-2 focus:outline-none text-sm sm:text-base ${
          errors[id as keyof typeof errors]
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:ring-green-300'
        }`}
      />
      {errors[id as keyof typeof errors] && (
        <p className='mt-1 text-sm text-red-600'>{errors[id as keyof typeof errors]?.message}</p>
      )}
    </div>
  );
}
