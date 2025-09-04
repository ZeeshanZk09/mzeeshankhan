// src/providers/AuthProvider.tsx
'use client';

import { ReactNode } from 'react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  useTokenRefresh();

  return <>{children}</>;
}
