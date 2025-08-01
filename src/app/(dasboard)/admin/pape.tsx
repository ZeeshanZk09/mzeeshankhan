import ProtectedRoute from '@/components/auth/ProtectedRoute';
import React from 'react';

export default function Admin() {
  return (
    <ProtectedRoute>
      <div>Admin</div>
    </ProtectedRoute>
  );
}
