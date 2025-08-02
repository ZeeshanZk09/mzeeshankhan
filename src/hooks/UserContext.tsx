'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { IUser } from '@/types/userSchemaType';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loader';
import axios, { AxiosError } from 'axios';
import toastService from '@/services/toastService';

type UserContextType = {
  users: IUser[] | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
};

const UserContext = createContext<UserContextType>({
  users: null,
  user: null,
  loading: true,
  error: null,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const [state, setState] = useState<Omit<UserContextType, 'error'>>({
    users: null,
    user: null,
    loading: true,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user
        const userResponse = await axios.get<
          {
            isAdmin: boolean;
            _id: string;
          } & Partial<IUser>
        >('/api/current-user');

        // Validate response
        if (!userResponse.data || typeof userResponse.data !== 'object') {
          setState({
            user: null,
            users: null,
            loading: false,
          });
          router.push('/sign-in');
          return;
        }

        // If admin, fetch all users

        if (userResponse.data.isAdmin) {
          const usersResponse = await axios.get<IUser[]>('/api/admin/get-all-users');
          setState((prev) => ({
            ...prev,
            users: usersResponse.data,
            user: userResponse.data as IUser,
            loading: false,
          }));
          return;
        }

        // For non-admin users
        setState((prev) => ({
          ...prev,
          user: userResponse.data as IUser,
          loading: false,
        }));

        // Redirect logic
        if (adminOnly) {
          router.push('/sign-in');
        } else {
          router.push('/profile');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        toastService.error(`Fetch error: ${err}`);
        setError(
          err instanceof AxiosError
            ? err.response?.data?.message || 'Network error'
            : 'An unexpected error occurred'
        );

        setState((prev) => ({ ...prev, loading: false }));
        router.push('/sign-in');
      }
    };

    fetchData();
  }, [router, adminOnly]);

  const contextValue = useMemo(
    () => ({
      ...state,
      error,
    }),
    [state, error]
  );

  if (state.loading) {
    return <Loading />;
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}
