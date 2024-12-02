import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/auth';
import { AuthStatus, DEFAULT_REQUEST_ERROR } from '../../constants';
import { checkAuth, login, logout } from '../action';
import { RequestError } from '../../types/error';

type AuthState = {
  authorizationStatus: AuthStatus;
  user: UserData | null;
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: AuthState = {
  authorizationStatus: AuthStatus.Unknown,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.authorizationStatus = AuthStatus.Unknown;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.authorizationStatus = AuthStatus.Unknown;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthStatus.Auth;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(logout.pending, (state) => {
        state.authorizationStatus = AuthStatus.Unknown;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authorizationStatus = AuthStatus.NoAuth;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      });
  }
});

export const authReducer = authSlice.reducer;
