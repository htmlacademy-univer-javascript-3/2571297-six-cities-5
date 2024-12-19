import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authReducer } from './index';
import { AuthStatus, DEFAULT_REQUEST_ERROR } from '../../constants';
import { UserData } from '../../types/auth';

vi.mock('./actions', () => ({
  checkAuth: {
    pending: { type: 'auth/checkAuth/pending' },
    fulfilled: { type: 'auth/checkAuth/fulfilled' },
    rejected: { type: 'auth/checkAuth/rejected' },
  },
  login: {
    pending: { type: 'auth/login/pending' },
    fulfilled: { type: 'auth/login/fulfilled' },
    rejected: { type: 'auth/login/rejected' },
  },
  logout: {
    pending: { type: 'auth/logout/pending' },
    fulfilled: { type: 'auth/logout/fulfilled' },
    rejected: { type: 'auth/logout/rejected' },
  },
}));

describe('Auth Reducer', () => {
  const initialState = {
    authorizationStatus: AuthStatus.Unknown,
    user: null,
    isLoading: false,
    error: null,
  };

  const mockUser: UserData = {
    name: 'John Doe',
    email: 'john@example.com',
    token: 'mock-token',
    avatarUrl: '/avatar.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = authReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('checkAuth', () => {
    it('should set loading state when checkAuth.pending', () => {
      const result = authReducer(initialState, { type: 'auth/checkAuth/pending' });

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null,
      });
    });

    it('should handle checkAuth.fulfilled', () => {
      const result = authReducer(initialState, {
        type: 'auth/checkAuth/fulfilled',
        payload: mockUser,
      });

      expect(result).toEqual({
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
        error: null,
      });
    });

    it('should handle checkAuth.rejected', () => {
      const result = authReducer(initialState, {
        type: 'auth/checkAuth/rejected',
        payload: DEFAULT_REQUEST_ERROR,
      });

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
      });
    });
  });

  describe('login', () => {
    it('should set loading state when login.pending', () => {
      const result = authReducer(initialState, { type: 'auth/login/pending' });

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null,
      });
    });

    it('should handle login.fulfilled', () => {
      const result = authReducer(initialState, {
        type: 'auth/login/fulfilled',
        payload: mockUser,
      });

      expect(result).toEqual({
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
        error: null,
      });
    });

    it('should handle login.rejected', () => {
      const result = authReducer(initialState, {
        type: 'auth/login/rejected',
        payload: DEFAULT_REQUEST_ERROR,
      });

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('logout', () => {
    const authenticatedState = {
      authorizationStatus: AuthStatus.Auth,
      user: mockUser,
      isLoading: false,
      error: null,
    };

    it('should handle logout.fulfilled', () => {
      const result = authReducer(authenticatedState, { type: 'auth/logout/fulfilled' });

      expect(result).toEqual({
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
        error: null,
      });
    });

    it('should handle logout.rejected', () => {
      const result = authReducer(authenticatedState, {
        type: 'auth/logout/rejected',
        payload: DEFAULT_REQUEST_ERROR,
      });

      expect(result).toEqual({
        ...authenticatedState,
        error: DEFAULT_REQUEST_ERROR,
        user: null,
        authorizationStatus: AuthStatus.NoAuth,
      });
    });
  });
});
