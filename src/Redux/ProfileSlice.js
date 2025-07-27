import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Profile } from '../Apis/apiHandlers';
import { Endpoints } from '../Apis/constant/apiEndPoints';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  Endpoints.Profile,
  async (_, { rejectWithValue }) => {
    try {
      const user = await Profile();
      console.log(" Received profile data:", user);
      return user;
    } catch (error) {
      console.error(" API error:", error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log('Received profile data:', action.payload);
        state.user = action.payload;
        state.isLoading = false;
        
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default profileSlice.reducer;
