'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '@/types/userSchemaType';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loader';
import axios from 'axios';

type UserContextType = {
  user: IUser | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const useUser = () => useContext(UserContext);

export function UserProvider({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/current-user');
        if (!response.data) {
          router.push('/sign-in');
          return;
        }

        if (adminOnly && !response.data.isAdmin) {
          router.push('/profile');
          return;
        }

        setUser(response.data);
      } catch (err) {
        console.error('User fetch error:', err);
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [adminOnly, router]);

  console.log(user);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
}
