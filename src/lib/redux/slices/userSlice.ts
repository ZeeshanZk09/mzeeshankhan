// lib/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SafeUser } from '@/types/userSchemaType';
import { handleApiError } from '@/utils/errorHandling';

interface UserState {
  users: SafeUser[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<SafeUser[]>('/api/admin/get-all-users', {
        timeout: 10000,
        withCredentials: true,
      });
      return data;
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to fetch users');
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload ? JSON.parse(JSON.stringify(action.payload)) : null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsersError } = userSlice.actions;
export default userSlice.reducer;
