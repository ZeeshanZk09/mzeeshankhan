import ProtectedRoute from '@/components/auth/ProtectedRoute';
import React from 'react';

export default function Profile() {
  return (
    <ProtectedRoute>
      <div> Profile</div>
    </ProtectedRoute>
  );
}
