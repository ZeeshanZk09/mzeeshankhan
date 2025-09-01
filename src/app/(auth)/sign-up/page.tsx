'use client';

import { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { ImageUpload, SignUpPayload } from '@/types/userSchemaType';
import { checkPasswordStrength } from '@/utils/checkPasswordStrength';
import { Eye, EyeOff, Upload, X } from 'lucide-react';
import Link from 'next/link';
import toastService from '@/services/toastService';
import CldImage from '@/components/ui/CldImage';
import { useFileValidation } from '@/utils/validators';

// Define form data interface for type safety
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [profileValidation, setProfileValidation] = useState<{
    isValid: boolean;
    error: string | null;
  } | null>(null);
  const [coverValidation, setCoverValidation] = useState<{
    isValid: boolean;
    error: string | null;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { handleSignUp, loading, uploadImage, error, clearAuthError } = useAuth();
  const { validateFile } = useFileValidation();

  // Memoize password strength calculation
  const passwordStrength = useMemo(
    () => checkPasswordStrength(formData.password),
    [formData.password]
  );

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear any auth errors when user starts typing
      if (error) clearAuthError();
    },
    [error, clearAuthError]
  );

  // Handle file upload with preview and validation
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      if (!files || files.length === 0) return;

      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      const result = validateFile(file);

      if (name === 'profilePic') {
        setProfilePic(file);
        setProfilePreview(previewUrl);
        setProfileValidation(result);
        toastService.success('Profile Pic uploaded successfully');
      } else if (name === 'coverPic') {
        setCoverPic(file);
        setCoverPreview(previewUrl);
        setCoverValidation(result);
        toastService.success('Cover Pic uploaded successfully');
      }
    },
    [validateFile]
  );

  // Handle drag and drop events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>, type: 'profile' | 'cover') => {
      e.preventDefault();
      setIsDragging(false);

      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      const result = validateFile(file);

      if (type === 'profile') {
        setProfilePic(file);
        setProfilePreview(previewUrl);
        setProfileValidation(result);
      } else {
        setCoverPic(file);
        setCoverPreview(previewUrl);
        setCoverValidation(result);
      }
    },
    [validateFile]
  );

  // Remove selected image
  const removeImage = useCallback(
    (type: 'profile' | 'cover') => {
      if (type === 'profile') {
        setProfilePic(null);
        if (profilePreview) URL.revokeObjectURL(profilePreview);
        setProfilePreview(null);
        setProfileValidation(null);
      } else {
        setCoverPic(null);
        if (coverPreview) URL.revokeObjectURL(coverPreview);
        setCoverPreview(null);
        setCoverValidation(null);
      }
    },
    [profilePreview, coverPreview]
  );

  // Validate form before submission
  const validateForm = useCallback(() => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      toastService.error('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toastService.error('Passwords do not match');
      return false;
    }

    if (passwordStrength.label === 'Weak') {
      toastService.warning('Password must be at least medium strength');
      return false;
    }

    if (profilePic && profileValidation && !profileValidation.isValid) {
      toastService.error(profileValidation.error || 'Invalid profile picture');
      return false;
    }

    if (coverPic && coverValidation && !coverValidation.isValid) {
      toastService.error(coverValidation.error || 'Invalid cover image');
      return false;
    }

    return true;
  }, [formData, passwordStrength, profilePic, profileValidation, coverPic, coverValidation]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let uploadedProfilePic: File | ImageUpload | null = null;
    let uploadedCoverPic: File | ImageUpload | null = null;

    try {
      if (profilePic || coverPic) {
        const uploadPromises = [];

        if (profilePic) {
          uploadPromises.push(uploadImage(profilePic));
        }

        if (coverPic) {
          uploadPromises.push(uploadImage(coverPic));
        }

        const results = await Promise.all(uploadPromises);
        uploadedProfilePic = profilePic ? (results[0] as File) : null;
        uploadedCoverPic = coverPic ? (results[1] as File) : null;
      }

      const payload: SignUpPayload = {
        ...formData,
        profilePic: uploadedProfilePic,
        coverPic: uploadedCoverPic,
      };

      await handleSignUp(payload);
    } catch (err) {
      console.error('Sign up error:', err);
      toastService.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 py-24'>
      <Card className='w-full max-w-2xl shadow-xl rounded-2xl border-0'>
        <CardHeader className='text-center p-8 pb-6'>
          <CardTitle className='text-3xl font-bold'>Create an Account</CardTitle>
          <CardDescription className='text-muted-foreground'>
            Crafting digital experiences and sharing the knowledge behind them.
          </CardDescription>
        </CardHeader>

        <CardContent className='p-8 pt-0'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last Name *</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder='Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  placeholder='Phone'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='username'>Username *</Label>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email *</Label>
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='password'>Password *</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <p className={`text-xs ${passwordStrength.color}`}>
                    Strength: {passwordStrength.label}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirm Password *</Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4 text-muted-foreground' />
                    ) : (
                      <Eye className='h-4 w-4 text-muted-foreground' />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className='text-xs text-red-500'>Passwords do not match</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='profilePic'>Profile Picture</Label>
                <div className='flex flex-col items-center gap-4'>
                  <label
                    htmlFor='profilePic'
                    className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-full cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : profileValidation && !profileValidation.isValid
                        ? 'border-red-300 bg-red-50'
                        : profileValidation && profileValidation.isValid
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'profile')}
                  >
                    {profilePreview ? (
                      <div className='relative'>
                        <CldImage
                          src={profilePreview}
                          alt='Profile preview'
                          width={1000}
                          height={1000}
                          className='w-20 h-20 rounded-full object-cover'
                        />
                        <button
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImage('profile');
                          }}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ) : (
                      <Upload className='h-6 w-6 text-muted-foreground' />
                    )}
                    <input
                      id='profilePic'
                      name='profilePic'
                      type='file'
                      accept='image/png, image/jpeg, image/jpg, image/webp'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                  </label>
                  <p className='text-sm text-muted-foreground text-center'>
                    Upload a profile picture (optional)
                  </p>
                  {profileValidation && !profileValidation.isValid && (
                    <p className='text-xs text-red-500 text-center'>{profileValidation.error}</p>
                  )}
                  {profileValidation && profileValidation.isValid && (
                    <p className='text-xs text-green-500 text-center'>File is valid!</p>
                  )}
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='coverPic'>Cover Image</Label>
                <div className='flex flex-col items-center gap-4'>
                  <label
                    htmlFor='coverPic'
                    className={`flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : coverValidation && !coverValidation.isValid
                        ? 'border-red-300 bg-red-50'
                        : coverValidation && coverValidation.isValid
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'cover')}
                  >
                    {coverPreview ? (
                      <div className='relative'>
                        <CldImage
                          src={coverPreview}
                          alt='Cover preview'
                          width={1000}
                          height={1000}
                          className='w-28 h-20 rounded-md object-cover'
                        />
                        <button
                          type='button'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeImage('cover');
                          }}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ) : (
                      <Upload className='h-6 w-6 text-muted-foreground' />
                    )}
                    <input
                      id='coverPic'
                      name='coverPic'
                      type='file'
                      accept='image/png, image/jpeg, image/jpg, image/webp'
                      onChange={handleFileChange}
                      className='hidden'
                    />
                  </label>
                  <p className='text-sm text-muted-foreground text-center'>
                    Upload a cover image (optional)
                  </p>
                  {coverValidation && !coverValidation.isValid && (
                    <p className='text-xs text-red-500 text-center'>{coverValidation.error}</p>
                  )}
                  {coverValidation && coverValidation.isValid && (
                    <p className='text-xs text-green-500 text-center'>File is valid!</p>
                  )}
                </div>
              </div>
            </div>

            <div className='bg-blue-50 p-4 rounded-lg'>
              <p className='text-sm text-blue-700 text-center'>
                <strong>Note:</strong> Maximum file size is 10MB. Supported formats: JPEG, PNG,
                WebP.
              </p>
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            {error && <p className='text-sm text-red-500 text-center'>{error}</p>}
          </form>

          <p className='mt-6 text-sm text-center text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='text-primary font-medium hover:underline transition-colors'
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
