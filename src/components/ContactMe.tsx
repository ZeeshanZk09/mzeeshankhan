'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => (
    <div className='h-[78px] flex items-center justify-center'>Loading reCAPTCHA...</div>
  ),
});

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactMe = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onTouched',
  });
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success) {
        throw new Error('reCAPTCHA verification failed');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  return (
    <section
      className='min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8 font-satoshiRegular flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-20 bg-green-100'
      aria-labelledby='contact-heading'
    >
      <h2 id='contact-heading' className='sr-only'>
        Contact Me
      </h2>

      {/* Left Column - Contact Info */}
      <div className='w-full lg:w-auto flex flex-col gap-8 lg:gap-12 xl:gap-16 lg:max-w-md xl:max-w-lg'>
        <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-8'>
          <div className='relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0'>
            <Image
              src='/assets/images/MZeeshanKhan.jpeg'
              alt='MZeeshanKhan'
              fill
              className='clipped rounded-full object-cover'
              sizes='(max-width: 640px) 96px, (max-width: 768px) 128px, 160px'
              priority
            />
          </div>
          <h2 className='font-clashDisplayExtraLight text-lg sm:text-xl md:text-2xl text-center sm:text-left'>
            Wan&apos;na discuss any project or just say Hi, My inbox is open for everyone.
          </h2>
        </div>

        <div className='space-y-4 md:space-y-6'>
          <h2 className='text-xl sm:text-2xl font-satoshiBold'>Contact Details:</h2>

          <div className='space-y-4'>
            {/* Email */}
            <div className='flex flex-col gap-2'>
              <h3 className='font-satoshiRegular'>Email:</h3>
              <div className='flex items-center gap-3'>
                <div className='relative w-8 h-8 sm:w-10 sm:h-10'>
                  <Image
                    src='/assets/images/contact/email.svg'
                    fill
                    alt='Email icon'
                    className='object-contain'
                  />
                </div>
                <Link
                  href='mailto:mzeeshankhan0988@gmail.com'
                  target='_blank'
                  className='flex items-center gap-1 text-black hover:text-green-700 transition-colors'
                >
                  <span className='text-sm sm:text-base'>mzeeshankhan0988@gmail.com</span>
                  <div className='relative w-4 h-4 sm:w-5 sm:h-5'>
                    <Image src='/assets/images/contact/emailLink.svg' fill alt='Email link icon' />
                  </div>
                </Link>
              </div>
            </div>

            {/* WhatsApp */}
            <div className='flex flex-col gap-2'>
              <h3 className='font-satoshiRegular'>WhatsApp:</h3>
              <div className='flex items-center gap-3'>
                <div className='relative w-8 h-8 sm:w-10 sm:h-10'>
                  <Image
                    src='/assets/images/contact/whatsapp.svg'
                    fill
                    alt='WhatsApp icon'
                    className='object-contain'
                  />
                </div>
                <span className='text-sm sm:text-base'>+92 337 8568671</span>
              </div>
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-2'>
              <h3 className='font-satoshiRegular'>Phone:</h3>
              <div className='flex items-center gap-3'>
                <div className='relative w-8 h-8 sm:w-10 sm:h-10'>
                  <Image
                    src='/assets/images/contact/phone.svg'
                    fill
                    alt='Phone icon'
                    className='object-contain'
                  />
                </div>
                <span className='text-sm sm:text-base'>+92 329 2564066</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Contact Form */}
      <div className='w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8'>
        <h2 className='text-xl sm:text-2xl font-bold font-clashDisplayRegular text-center text-gray-800'>
          Direct Message
        </h2>
        <p className='mt-2 text-sm sm:text-base text-center text-gray-600'>
          Have questions? Fill out the form below.
        </p>

        {status && (
          <div
            className={`mt-4 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
              status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col mt-4 sm:mt-6 space-y-3 sm:space-y-4'
          noValidate
        >
          {/* Name Field */}
          <div>
            <label htmlFor='name' className='block text-sm sm:text-base font-medium text-gray-700'>
              Name
            </label>
            <input
              id='name'
              type='text'
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              placeholder='Enter your name'
              className={`w-full px-3 py-2 sm:px-4 sm:py-2 mt-1 border rounded-lg focus:ring-2 focus:outline-none text-sm sm:text-base ${
                errors.name
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-green-300'
              }`}
            />
            {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor='email' className='block text-sm sm:text-base font-medium text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder='Enter your email'
              className={`w-full px-3 py-2 sm:px-4 sm:py-2 mt-1 border rounded-lg focus:ring-2 focus:outline-none text-sm sm:text-base ${
                errors.email
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-green-300'
              }`}
            />
            {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor='message'
              className='block text-sm sm:text-base font-medium text-gray-700'
            >
              Message
            </label>
            <textarea
              id='message'
              rows={4}
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              })}
              placeholder='Enter your message'
              className={`w-full h-32 sm:h-40 px-3 py-2 sm:px-4 sm:py-2 mt-1 border rounded-lg focus:ring-2 focus:outline-none text-sm sm:text-base ${
                errors.message
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-green-300'
              }`}
            />
            {errors.message && (
              <p className='mt-1 text-sm text-red-600'>{errors.message.message}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className='flex justify-center'>
            {isMounted && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
                size={isMobile ? 'compact' : 'normal'}
              />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full py-3 text-sm sm:text-base font-medium text-white bg-[#047856] hover:bg-[#03603d] focus:ring-2 focus:ring-green-300 focus:outline-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isSubmitting ? (
              <span className='flex items-center justify-center gap-2'>
                <svg
                  className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
