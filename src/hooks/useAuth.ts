// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import {
  signIn,
  signUp,
  signOut,
  fetchCurrentUser,
  clearError,
} from '@/lib/redux/slices/authSlice';
import { fetchAllUsers } from '@/lib/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/lib/redux/store';
import toastService from '@/services/toastService';
import { AuthCredentials, SignUpPayload } from '@/types/userSchemaType';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const { users } = useSelector((state: RootState) => state.user);

  const handleSignIn = useCallback(
    async (credentials: AuthCredentials) => {
      const result = await dispatch(signIn(credentials));

      if (signIn.fulfilled.match(result)) {
        toastService.success('Signed in successfully');
        setTimeout(() => router.push('/profile'), 3000);
      } else {
        toastService.error(result.payload as string);
      }
    },
    [dispatch, router]
  );

  const handleSignUp = useCallback(
    async (payload: SignUpPayload) => {
      const result = await dispatch(signUp(payload));

      if (signUp.fulfilled.match(result)) {
        toastService.success('Registered successfully!');
        router.push('/profile');
      } else {
        toastService.error(result.payload as string);
      }
    },
    [dispatch, router]
  );

  const handleSignOut = useCallback(async () => {
    const result = await dispatch(signOut());

    if (signOut.fulfilled.match(result)) {
      toastService.success('Signed out successfully');
      router.push('/sign-in');
    } else {
      toastService.error(result.payload as string);
    }
  }, [dispatch, router]);

  const refetchUser = useCallback(async () => {
    await dispatch(fetchCurrentUser());
  }, [dispatch]);

  const loadAllUsers = useCallback(async () => {
    await dispatch(fetchAllUsers());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    users,
    loading,
    error,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    refetchUser,
    loadAllUsers,
    clearAuthError,
  };
};
