// src/hooks/useTokenRefresh.ts
'use client';

import { useEffect } from 'react';
import { verifyAccessToken } from '@/utils/token';
import { useRouter } from 'next/navigation';

let refreshTimeout: NodeJS.Timeout;

export function useTokenRefresh() {
  const router = useRouter();
  useEffect(() => {
    const scheduleTokenRefresh = async () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!token) return;

      // Verify token to get expiration
      const { payload } = await verifyAccessToken(token);

      if (payload && payload.exp) {
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiry = expirationTime - currentTime;

        // Refresh 1 minute before expiration
        const refreshTime = timeUntilExpiry - 60000;

        if (refreshTime > 0) {
          clearTimeout(refreshTimeout);
          refreshTimeout = setTimeout(refreshToken, refreshTime);
        } else {
          // Token is about to expire or already expired
          refreshToken();
        }
      }
    };

    const refreshToken = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        // Reschedule next refresh
        scheduleTokenRefresh();
      } catch (error) {
        console.error('Token refresh failed:', error);
        // Redirect to login or handle error
        router.push('/sign-in');
      }
    };

    // Initial schedule
    scheduleTokenRefresh();

    // Cleanup on unmount
    return () => clearTimeout(refreshTimeout);
  }, [router]);
}
