// components/providers/AppProviders.tsx
'use client';

import { ReactNode } from 'react';
import StoreProvider from '@/lib/redux/provider';
import { UserProvider } from './UserProvider';

export function AppProvider({
  children,
  adminOnly = false,
}: {
  children: ReactNode;
  adminOnly?: boolean;
}) {
  return (
    <StoreProvider>
      <UserProvider adminOnly={adminOnly}>{children}</UserProvider>
    </StoreProvider>
  );
}
