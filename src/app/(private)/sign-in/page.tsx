'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/Loader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { handleSignIn, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    debugger;
    await handleSignIn(formData);
  };

  if (loading) return <Loading />;

  return (
    <Card className='place-self-center max-w-xl mx-10 my-24 sm:mx-24 shadow-xl rounded-2xl border'>
      <CardHeader className='space-y-1 text-center'>
        <CardTitle className='text-3xl font-bold'>Welcome Back</CardTitle>
        <CardDescription className='text-muted-foreground text-sm'>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-1'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              name='username'
              type='text'
              placeholder='Enter your username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              name='phone'
              type='tel'
              placeholder='03XX-XXXXXXX'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              placeholder='••••••••'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button type='submit' className='w-full'>
            Sign In
          </Button>
        </form>

        <div className='flex justify-between mt-4 text-sm text-muted-foreground'>
          <Link href='/forgot-password' className='hover:underline'>
            Forgot Password?
          </Link>
          <Link href='/reset-password' className='hover:underline'>
            Reset Password
          </Link>
        </div>

        <p className='mt-6 text-sm text-center text-muted-foreground'>
          Don’t have an account?{' '}
          <Link href='/sign-up' className='text-primary font-medium hover:underline'>
            Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
