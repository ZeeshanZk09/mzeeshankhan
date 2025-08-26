'use client';

import Loading from '@/app/loading';
import { useAuth } from '@/hooks/useAuth';
import { AppProvider } from '../providers/AppProvider';

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  return (
    <AppProvider adminOnly={adminOnly}>
      <ClientSideWrapper>{children}</ClientSideWrapper>
    </AppProvider>
  );
}

// Optional: fallback to loading if children use useUser hook
function ClientSideWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  if (loading) return <Loading />;
  return <>{children}</>;
}
