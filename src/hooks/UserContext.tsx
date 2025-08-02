'use client';

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { IUser } from '@/types/userSchemaType';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loader';
import axios, { AxiosError } from 'axios';
import toastService from '@/services/toastService';

// Define safe user type without sensitive fields
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
  handleLogOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  users: null,
  user: null,
  handleLogOut: async () => {},
  loading: true,
  error: null,
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

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await axios.get<SafeUser>('/api/current-user');
      return data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      const { data } = await axios.get<SafeUser[]>('/api/admin/get-all-users');
      setState((prev) => ({ ...prev, loading: false }));
      return data;
    } catch (error) {
      console.error('Failed to fetch all users:', error);
      throw error;
    }
  }, []);

  const handleLogOut = useCallback(async () => {
    try {
      await axios.post('/api/auth/sign-out');
      toastService.success('Signed out successfully');
      setState({ users: null, user: null, loading: false });
      router.push('/sign-in');
    } catch (error) {
      toastService.error('Failed to sign out');
      console.error('Logout error:', error);
    }
  }, [router]);

  const refetchUser = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const user = await fetchCurrentUser();
      setState((prev) => ({ ...prev, user, loading: false }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refetch user');
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [fetchCurrentUser]);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const user = await fetchCurrentUser();

        if (!user) {
          throw new Error('User data not found');
        }

        if (user.isAdmin) {
          const users = await fetchAllUsers();
          setState({ users, user, loading: false });
          return;
        }

        if (adminOnly) {
          router.push('/sign-in');
          return;
        }

        setState({ users: null, user, loading: false });
        router.push('/profile');
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data?.message || 'Network error'
            : error instanceof Error
            ? error.message
            : 'An unexpected error occurred';

        setError(errorMessage);
        setState((prev) => ({ ...prev, loading: false }));
        router.push('/sign-in');
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeUser();
  }, [router, adminOnly, fetchCurrentUser, fetchAllUsers]);

  const contextValue = useMemo(
    () => ({
      ...state,
      error,
      handleLogOut,
      refetchUser,
    }),
    [state, error, handleLogOut, refetchUser]
  );

  if (state.loading) {
    return <Loading />;
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
