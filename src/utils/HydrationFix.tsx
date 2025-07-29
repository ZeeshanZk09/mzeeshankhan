'use client';

import Loader from '@/components/ui/Loader';
import { useEffect, useState } from 'react';

export default function HydrationFix({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent server-client mismatch for initial render
  if (!isClient) {
    return <Loader />;
  }

  return <>{children}</>;
}
