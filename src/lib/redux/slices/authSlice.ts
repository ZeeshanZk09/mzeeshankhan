// lib/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';

import axios from 'axios';
import { AuthCredentials, SignUpPayload, SafeUser, ImageUpload } from '@/types/userSchemaType';
import { isLocalStorageAvailable } from '@/utils/helpers';
import { handleApiError } from '@/utils/errorHandling';

export type SimpleSafeUser = Omit<SafeUser, '_id'> & {
  _id: string;
};

interface AuthState {
  user: SimpleSafeUser | null;
  image: ImageUpload | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  image: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Helper function to safely handle localStorage operations
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  },
};

// Helper functions for common state updates
const handlePending = (state: WritableDraft<AuthState>) => {
  state.loading = true;
  state.error = null;
};

const handleFulfilled = <T>(state: WritableDraft<AuthState>, action: PayloadAction<T>) => {
  state.loading = false;
  state.error = null;
  return action.payload as WritableDraft<SimpleSafeUser | null>;
};

const handleRejected = (state: WritableDraft<AuthState>, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error = action.payload as string;
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<SafeUser>('/api/auth/sign-in', credentials, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 20000,
        withCredentials: true,
      });

      if (data && typeof data === 'object') {
        const plainUser = JSON.parse(JSON.stringify(data));
        safeLocalStorage.setItem('userData', JSON.stringify(plainUser));
        return plainUser as SimpleSafeUser;
      }

      return rejectWithValue('Invalid response format from server');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = handleApiError(error.response?.data?.error, 'Sign in failed');
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unexpected error occurred during sign in');
    }
  }
);

export const uploadImagePayload = createAsyncThunk(
  'auth/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post<{ uploads: ImageUpload[] }>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      if (!data.uploads || data.uploads.length === 0) {
        return rejectWithValue('No image data received from server');
      }

      return data.uploads[0];
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = handleApiError(error, 'Image upload failed');
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unexpected error occurred during image upload');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      // Validate passwords match
      if (payload.password !== payload.confirmPassword) {
        return rejectWithValue('Passwords do not match');
      }

      const { ...signUpData } = payload;
      signUpData.confirmPassword = '';

      const { data } = await axios.post<SafeUser>('/api/auth/sign-up', signUpData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 40000,
        withCredentials: true,
      });

      if (data && typeof data === 'object') {
        const plainUser = JSON.parse(JSON.stringify(data));
        safeLocalStorage.setItem('userData', JSON.stringify(plainUser));
        return plainUser;
      }

      return rejectWithValue('Invalid response format from server');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = handleApiError(error.response?.data?.error, 'Registration failed');
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unexpected error occurred during registration');
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const user = safeLocalStorage.getItem('userData');
    if (user) {
      await axios.post(
        '/api/auth/sign-out',
        {},
        {
          timeout: 20000,
          withCredentials: true,
        }
      );
    }

    safeLocalStorage.removeItem('userData');
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage = handleApiError(error, 'Failed to sign out');
      return rejectWithValue(errorMessage);
    }

    // Even if the API call fails, we should clear local storage
    safeLocalStorage.removeItem('userData');
    return rejectWithValue('An unexpected error occurred during sign out');
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const localUser = safeLocalStorage.getItem('userData');
      if (localUser) {
        const { data } = await axios.get<SafeUser>('/api/current-user', {
          timeout: 20000,
          withCredentials: true,
        });
        const plainUser = JSON.parse(JSON.stringify(data));
        safeLocalStorage.setItem('userData', JSON.stringify(plainUser));
        return plainUser;
      }

      return null;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = handleApiError(error.response?.data?.error, 'Failed to authenticate');

        // Clear invalid user data from storage
        if (error.response?.status === 401) {
          safeLocalStorage.removeItem('userData');
        }

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unexpected error occurred while fetching user data');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    payload: Partial<Omit<SignUpPayload, 'password' | 'confirmPassword'>>,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch<SafeUser>('/api/update-current-user', payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
        withCredentials: true,
      });

      safeLocalStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = handleApiError(error.response?.data?.error, 'Profile update failed');
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('An unexpected error occurred during profile update');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<SafeUser | null>) => {
      state.user = action.payload as WritableDraft<SimpleSafeUser> | null;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle pending states
    builder
      .addCase(signIn.pending, handlePending)
      .addCase(signUp.pending, handlePending)
      .addCase(updateUserProfile.pending, handlePending)
      .addCase(uploadImagePayload.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      });

    // Handle fulfilled states
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        const payload = handleFulfilled(state, action);
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const payload = handleFulfilled(state, action);
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(uploadImagePayload.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const payload = handleFulfilled(state, action);
        state.user = payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });

    // Handle rejected states
    builder
      .addCase(signIn.rejected, (state, action) => {
        handleRejected(state, action);
        state.isAuthenticated = false;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        handleRejected(state, action);
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(uploadImagePayload.rejected, (state, action) => {
        handleRejected(state, action);
        state.image = null;
      })
      .addCase(updateUserProfile.rejected, handleRejected)
      .addCase(signOut.rejected, (state, action) => {
        handleRejected(state, action);
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
