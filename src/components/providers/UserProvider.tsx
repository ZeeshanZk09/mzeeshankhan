// components/providers/UserProvider.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/ui/Loader';

export function UserProvider({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { user, loading, refetchUser, loadAllUsers } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      await refetchUser();
    };

    initializeAuth();
  }, [refetchUser]);

  useEffect(() => {
    if (user && user.isAdmin) {
      loadAllUsers();
    }
  }, [user, loadAllUsers]);

  useEffect(() => {
    if (!loading && !user && adminOnly) {
      router.push('/sign-in');
    }
  }, [user, loading, adminOnly, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
