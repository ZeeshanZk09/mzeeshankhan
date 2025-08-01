'use client';

import { UserProvider } from '@/hooks/UserContext';
import Loading from '@/app/loading';
import { useUser } from '@/hooks/UserContext';

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  return (
    <UserProvider adminOnly={adminOnly}>
      <ClientSideWrapper>{children}</ClientSideWrapper>
    </UserProvider>
  );
}

// Optional: fallback to loading if children use useUser hook
function ClientSideWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useUser();
  if (loading) return <Loading />;
  return <>{children}</>;
}
