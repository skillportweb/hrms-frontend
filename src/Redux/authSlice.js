import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin } from "../Apis/apiHandlers";

// Async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await UserLogin(payload);

      // Debug logging
      console.log("Full API Response:", res);
      console.log("API Response Data:", res.data);
      console.log("API Response Keys:", Object.keys(res || {}));

      // Check if response data is at res level or res.data level
      let responseData;
      if (res.data !== undefined) {
        responseData = res.data;
      } else {
        responseData = res;
      }

      console.log("Using responseData:", responseData);
      console.log("ResponseData keys:", Object.keys(responseData || {}));

      // Handle different response structures
      let token, user;

      // Check if responseData exists
      if (!responseData) {
        throw new Error("No response data received");
      }

      // Common patterns - adjust based on your API
      if (responseData.token && responseData.user) {
        // Pattern: { token, user }
        token = responseData.token;
        user = responseData.user;
      } else if (responseData.accessToken) {
        // Pattern: { accessToken, user }
        token = responseData.accessToken;
        user = responseData.user;
      } else if (responseData.access_token) {
        // Pattern: { access_token, user }
        token = responseData.access_token;
        user = responseData.user;
      } else if (responseData.data?.token) {
        // Pattern: { data: { token, user } }
        token = responseData.data.token;
        user = responseData.data.user;
      } else if (responseData.authToken) {
        // Pattern: { authToken, user }
        token = responseData.authToken;
        user = responseData.user;
      } else if (responseData.jwt) {
        // Pattern: { jwt, user }
        token = responseData.jwt;
        user = responseData.user;
      } else if (responseData.Authorization) {
        // Pattern: { Authorization, user }
        token = responseData.Authorization;
        user = responseData.user;
      } else {
        // Log all available keys for debugging
        console.error("Available response keys:", Object.keys(responseData));
        throw new Error(
          "No token found in response. Available keys: " +
            Object.keys(responseData).join(", ")
        );
      }

      // Validate that we have both token and user
      if (!token) {
        throw new Error("Token is missing from response");
      }

      if (!user) {
        throw new Error("User data is missing from response");
      }

      // Return normalized structure
      return {
        token,
        user,
      };
    } catch (error) {
      console.error("Login API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add action to load user from localStorage on app start
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        // You might want to validate the token here
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login fulfilled with payload:", action.payload);

        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        // Store token in localStorage
        try {
          localStorage.setItem("token", action.payload.token);
          console.log("Token stored in localStorage:", action.payload.token);
        } catch (error) {
          console.error("Failed to store token in localStorage:", error);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login rejected with payload:", action.payload);
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.user = null;
        state.token = null;

        // Remove token from localStorage on failed login
        localStorage.removeItem("token");
      });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
