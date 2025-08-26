// /app/(private)/sign-up/page.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    if (name === 'profilePic') setProfilePic(files[0]);
    if (name === 'coverPic') setCoverPic(files[0]);
  };

  // type picObj = {
  //   url: string;
  //   public_id: string;
  // };

  // const uploadImage = async (file: File): Promise<picObj[] | null> => {
  //   const form = new FormData();
  //   form.append('file', file);

  //   try {
  //     const res = await axios.post('/api/upload', form, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     console.log('/upload response', res.data);
  //     return res.data?.uploads || null;
  //   } catch (err) {
  //     console.error('Image upload failed:', err);
  //     toastService.error('Image upload failed. Please try again.');
  //     return null;
  //   }
  // };
  const { handleSignUp, loading } = useAuth();

  console.log(loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp({
      ...formData,
      profilePic,
      coverPic,
    });

    // if (formData.password !== formData.confirmPassword) {
    //   toastService.error('Passwords do not match');
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   let uploadedProfilePic: picObj[] | null = null;
    //   let uploadedCoverPic: picObj[] | null = null;

    //   if (profilePic) uploadedProfilePic = await uploadImage(profilePic);
    //   if (coverPic) uploadedCoverPic = await uploadImage(coverPic);

    //   const payload = {
    //     ...formData,
    //     profilePic: uploadedProfilePic ? uploadedProfilePic[0] : null,
    //     coverPic: uploadedCoverPic ? uploadedCoverPic[0] : null,
    //   };

    //   const res = await axios.post('/api/auth/sign-up', payload);
    //   if (!res) {
    //     toastService.error('Registration Failed');
    //   }

    //   toastService.success('Registered successfully! Redirecting...');
    //   router.push('/profile');
    // } catch (err) {
    //   const error = err as { response?: { data?: { error?: string } } };
    //   const message = error?.response?.data?.error || 'Registration failed';
    //   toastService.error(message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Card className='max-w-xl place-self-center my-24 shadow-lg mx-10 sm:mx-24 '>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>Create an Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>First Name</Label>
              <Input
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input type='text' name='phone' placeholder='Phone' onChange={handleChange} />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Email</Label>
            <Input type='email' name='email' placeholder='Email' onChange={handleChange} required />
          </div>

          <div className='space-y-2'>
            <Label>Password</Label>
            <Input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label>Confirm Password</Label>
            <Input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={handleChange}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label>Profile Picture</Label>
            <Input
              type='file'
              name='profilePic'
              accept='image/png, image/jpeg, image/jpg, image/webp'
              onChange={handleFileChange}
            />
          </div>

          <div className='space-y-2'>
            <Label>Cover Image</Label>
            <Input
              type='file'
              name='coverPic'
              accept='image/png, image/jpeg, image/jpg, image/webp'
              onChange={handleFileChange}
            />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
