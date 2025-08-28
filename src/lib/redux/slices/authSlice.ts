// lib/redux/slices/authSlice.ts
import {
  createSlice,
  createAsyncThunk,
  // PayloadAction
} from '@reduxjs/toolkit';
import axios from 'axios';
// import toastService from '@/services/toastService';
import { AuthCredentials, SignUpPayload, SafeUser, ImageUpload } from '@/types/userSchemaType';
import { handleApiError } from '@/utils/errorHandling';
import { useCallback } from 'react';

interface AuthState {
  user: SafeUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<SafeUser>('/api/auth/sign-in', credentials, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        withCredentials: true,
      });
      console.log('sign in data', data);
      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Sign in failed');
      return rejectWithValue(errorMessage);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload, { rejectWithValue }) => {
    try {
      // Validate passwords match
      if (payload.password !== payload.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const { firstName, lastName, username, password, phone, email } = payload;
      // debugger;

      const uploadImage = useCallback(async (file: File): Promise<ImageUpload | null> => {
        try {
          const formData = new FormData();
          formData.append('file', file);

          const { data } = await axios.post<{ uploads: ImageUpload[] }>('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 30000, // Longer timeout for file uploads
          });

          return data.uploads[0] || null;
        } catch (error) {
          handleApiError(error, 'Image upload failed');
          return null;
        }
      }, []);
      console.log(payload.coverPic, payload.profilePic);

      const [profilePicUpload, coverPicUpload] = await Promise.all([
        payload.profilePic ? uploadImage(payload.profilePic) : Promise.resolve(null),
        payload.coverPic ? uploadImage(payload.coverPic) : Promise.resolve(null),
      ]);

      const { data } = await axios.post<SafeUser>(
        '/api/auth/sign-up',
        {
          firstName,
          lastName,
          email,
          username,
          password,
          phone,
          profilePic: profilePicUpload,
          coverPic: coverPicUpload,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000,
          withCredentials: true,
        }
      );
      // debugger;
      console.log(data);

      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Registration failed');
      return rejectWithValue(errorMessage);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await axios.post(
      '/api/auth/sign-out',
      {},
      {
        timeout: 20000,
        withCredentials: true,
      }
    );
    localStorage.removeItem('userData');
    return true;
  } catch (error) {
    const errorMessage = handleApiError(error, 'Failed to sign out');
    return rejectWithValue(errorMessage);
  }
});

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const localUser = localStorage.getItem('userData');
      if (localUser) {
        const response = await axios.get<SafeUser>('/api/current-user', {
          timeout: 20000,
          withCredentials: true,
        });
        localStorage.setItem('userData', JSON.stringify(response.data));
        return response.data;
      }
      return null;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to authenticate');
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (payload: Partial<Omit<SignUpPayload, 'password'>>, { rejectWithValue }) => {
    try {
      // // Validate passwords match
      // if (payload.password !== payload.confirmPassword) {
      //   throw new Error('Passwords do not match');
      // }

      const { firstName, lastName, username, phone, email } = payload;
      // debugger;
      console.log(payload.coverPic, payload.profilePic);
      const { data } = await axios.put<SafeUser>(
        '/api/update-current-user',
        {
          firstName,
          lastName,
          email,
          username,
          phone,
          profilePic: payload.profilePic,
          coverPic: payload.coverPic,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000,
          withCredentials: true,
        }
      );
      // debugger;
      console.log(data);

      localStorage.setItem('userData', JSON.stringify(data));
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Registration failed');
      return rejectWithValue(errorMessage);
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
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ? JSON.parse(JSON.stringify(action.payload)) : null;

        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ? JSON.parse(JSON.stringify(action.payload)) : null;

        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ? JSON.parse(JSON.stringify(action.payload)) : null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
