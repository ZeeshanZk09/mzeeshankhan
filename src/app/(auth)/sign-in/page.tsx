'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/Loader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { checkPasswordStrength } from '@/utils/checkPasswordStrength';
import toastService from '@/services/toastService';
import { Eye, EyeOff } from 'lucide-react';

// Define form data interface for type safety
interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
}

export default function SignInPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignIn, loading, error, clearAuthError } = useAuth();

  // Memoize password strength calculation
  const passwordStrength = useMemo(
    () => checkPasswordStrength(formData.password),
    [formData.password]
  );

  // Handle input changes efficiently
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (error) clearAuthError();
    },
    [error, clearAuthError]
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that at least one identifier is provided
    if (!formData.username && !formData.email && !formData.phone) {
      toastService.warning('Please enter your username, email, or phone number');
      return;
    }

    // Validate password strength
    if (passwordStrength.label === 'Weak' || formData.password.length < 8) {
      toastService.warning('Password must be at least medium strength');
      return;
    }

    await handleSignIn(formData);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) return <Loading />;

  return (
    <div className='min-h-screen flex items-center justify-center p-4 '>
      <Card className='w-full max-w-md shadow-xl rounded-2xl border-0'>
        <CardHeader className='space-y-1 text-center p-8 pb-6'>
          <CardTitle className='text-3xl font-bold'>Welcome Back</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className='p-8 pt-0'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username, Email or Phone *</Label>
              <Input
                id='identifier'
                name='username'
                type='text'
                className='placeholder:text-muted-foreground'
                placeholder='Enter your username, email or phone'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <Label htmlFor='password'>Password *</Label>
                {formData.password && (
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    Strength: {passwordStrength.label}
                  </span>
                )}
              </div>

              <div className='relative'>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  className='pr-10 placeholder:text-muted-foreground'
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-muted-foreground' />
                  ) : (
                    <Eye className='h-4 w-4 text-muted-foreground' />
                  )}
                </button>
              </div>
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className='flex justify-between mt-6 text-sm text-muted-foreground'>
            <Link
              href='/forgot-password'
              className='hover:underline hover:text-primary transition-colors'
            >
              Forgot Password?
            </Link>
            <Link
              href='/reset-password'
              className='hover:underline hover:text-primary transition-colors'
            >
              Reset Password
            </Link>
          </div>

          <p className='mt-6 text-sm text-center text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/sign-up'
              className='text-primary font-medium hover:underline transition-colors'
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
