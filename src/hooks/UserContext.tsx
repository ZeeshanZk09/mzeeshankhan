'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { IUser } from '@/types/userSchemaType';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loader';
import axios from 'axios';
import toastService from '@/services/toastService';

// Define more precise types
type AuthCredentials = Pick<IUser, 'username' | 'email' | 'phone' | 'password'>;

type ImageUpload = {
  url: string;
  public_id: string;
};

type SignUpPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
  coverPic?: File | null;
};

type SafeUser = Omit<
  IUser,
  | 'password'
  | 'refreshToken'
  | 'emailVerificationToken'
  | 'emailVerificationExpires'
  | 'phoneVerificationToken'
  | 'phoneVerificationExpires'
  | 'providers'
>;

type UserContextType = {
  users: SafeUser[] | null;
  user: SafeUser | null;
  loading: boolean;
  error: string | null;
  handleSignOut: () => Promise<void>;
  handleSignIn: (credentials: AuthCredentials) => Promise<void>;
  handleSignUp: (payload: SignUpPayload) => Promise<void>;
  uploadImage: (file: File) => Promise<ImageUpload | null>;
  refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  users: null,
  user: null,
  loading: true,
  error: null,
  handleSignOut: async () => {},
  handleSignIn: async () => {},
  handleSignUp: async () => {},
  uploadImage: async () => null,
  refetchUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState<{
    users: SafeUser[] | null;
    user: SafeUser | null;
    loading: boolean;
  }>({
    users: null,
    user: null,
    loading: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  // Helper function to handle API errors consistently
  const handleApiError = (error: unknown, defaultMessage: string): string => {
    let errorMessage = defaultMessage;

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;

      // Log detailed error info for debugging
      console.error('API Error:', {
        message: errorMessage,
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
      });
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setState((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
    toastService.error(errorMessage);
    setError(errorMessage);
    return errorMessage;
  };

  // Memoized API calls with enhanced error handling
  const fetchCurrentUser = useCallback(async (): Promise<SafeUser | null> => {
    try {
      if (!localStorage.getItem('userData')) return null;
      const { data } = await axios.get<SafeUser>('/api/current-user', {
        timeout: 10000, // 10 second timeout
        withCredentials: true,
      });
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return data;
    } catch (error) {
      handleApiError(error, 'Failed to authenticate');
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return null;
    } finally {
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  }, []);

  const fetchAllUsers = useCallback(async (): Promise<SafeUser[] | null> => {
    try {
      const { data } = await axios.get<SafeUser[]>('/api/admin/get-all-users', {
        timeout: 10000,
        withCredentials: true,
      });
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch users');
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return null;
    }
  }, []);

  // Authentication handlers with retry logic
  const handleSignIn = useCallback(
    async (credentials: AuthCredentials) => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const { data } = await axios.post<SafeUser>('/api/auth/sign-in', credentials, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
          withCredentials: true,
        });

        setState({ user: data, users: null, loading: false });
        localStorage.setItem('userData', JSON.stringify(data));
        toastService.success('Signed in successfully');
        setTimeout(() => router.push('/profile'), 3000);
      } catch (error) {
        const errorMessage = handleApiError(error, 'Sign in failed');
        toastService.error(errorMessage);
        setState((prev) => ({ ...prev, loading: false }));

        // If it's a network error, suggest retrying
        if (axios.isAxiosError(error) && !error.response) {
          toastService.info('Network error - please check your connection');
        }
      }
    },
    [router]
  );

  const uploadImage = useCallback(async (file: File): Promise<ImageUpload | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<{ uploads: ImageUpload[] }>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000, // Longer timeout for file uploads
      });
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return data.uploads[0] || null;
    } catch (error) {
      handleApiError(error, 'Image upload failed');
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
      return null;
    }
  }, []);

  const handleSignUp = useCallback(
    async (payload: SignUpPayload) => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        // Validate passwords match
        if (payload.password !== payload.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Upload images in parallel if both exist
        const [profilePicUpload, coverPicUpload] = await Promise.all([
          payload.profilePic ? uploadImage(payload.profilePic) : Promise.resolve(null),
          payload.coverPic ? uploadImage(payload.coverPic) : Promise.resolve(null),
        ]);

        // Prepare the data to send
        const { firstName, lastName, username, password, phone, email } = payload;

        const { data } = await axios.post<SafeUser>(
          '/api/auth/sign-up',
          {
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            profilePic: profilePicUpload,
            coverPic: coverPicUpload,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            timeout: 15000,
            withCredentials: true,
          }
        );

        setState({ user: data, users: null, loading: false });
        toastService.success('Registered successfully!');
        router.push('/profile');
      } catch (error) {
        const errorMessage = handleApiError(error, 'Registration failed');
        toastService.error(errorMessage);
        setState((prev) => ({ ...prev, loading: false }));

        // Special handling for duplicate email/username
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          toastService.info('This email or username is already registered');
        }
      }
    },
    [router, uploadImage]
  );

  const refetchUser = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const user = await fetchCurrentUser();
      if (user) {
        setState((prev) => ({ ...prev, user, loading: false }));
      } else {
        router.push('/sign-in');
      }
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    } catch (error) {
      handleApiError(error, 'Failed to refresh user data');
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [fetchCurrentUser, router]);

  // Initialize user data with retry logic
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const initializeUser = async () => {
      try {
        const cachedUser = localStorage.getItem('userData');
        if (cachedUser) {
          const parsedUser = JSON.parse(cachedUser);
          if (mounted) {
            setState((prev) => ({ ...prev, user: parsedUser, loading: false }));
          }
        }
        const user = await fetchCurrentUser();

        if (!mounted) return;

        if (!user) {
          localStorage.removeItem('userData');
          router.push('/sign-in');
          return;
        }

        // Immediately set user data (even if we might fetch more)
        setState((prev) => ({ ...prev, user, loading: false }));
        localStorage.setItem('userData', JSON.stringify(user));
        setInitialLoad(false);

        if (user.isAdmin) {
          const users = await fetchAllUsers();
          if (mounted) setState((prev) => ({ ...prev, users }));
        }
        setState((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      } catch (error) {
        if (!mounted) return;
        handleApiError(error, 'Failed to initialize user');
        setState((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
        router.push('/sign-in');
      } finally {
        if (mounted) setInitialLoad(false);
        setState((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    };

    initializeUser();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [router, adminOnly, fetchCurrentUser, fetchAllUsers]);

  const handleSignOut = useCallback(async () => {
    try {
      await axios.post(
        '/api/auth/sign-out',
        {},
        {
          timeout: 5000,
          withCredentials: true,
        }
      );
      setState({ users: null, user: null, loading: false });
      localStorage.removeItem('userData');
      toastService.success('Signed out successfully');
      router.push('/sign-in');
    } catch (error) {
      handleApiError(error, 'Failed to sign out');
    } finally {
      setState((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  }, [router]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      error,
      handleSignOut,
      handleSignIn,
      handleSignUp,
      uploadImage,
      refetchUser,
    }),
    [state, error, handleSignOut, handleSignIn, handleSignUp, uploadImage, refetchUser]
  );

  if (initialLoad) {
    return <Loading />;
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
