import { authReducer } from './index';
import { checkAuth, login, logout } from '../action';
import { AuthStatus, DEFAULT_REQUEST_ERROR } from '../../constants';
import { UserData } from '../../types/auth';
import { describe, it, expect } from 'vitest';

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

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = authReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('checkAuth', () => {
    it('should set loading state when checkAuth.pending', () => {
      const result = authReducer(initialState, checkAuth.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle checkAuth.pending', () => {
      const result = authReducer(initialState, checkAuth.pending);

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.Unknown,
        isLoading: true,
        error: null,
      });
    });

    it('should clear loading state when checkAuth.fulfilled', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const result = authReducer(loadingState, checkAuth.fulfilled(mockUser, '', undefined));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });

    it('should handle checkAuth.fulfilled', () => {
      const result = authReducer(initialState, checkAuth.fulfilled(mockUser, '', undefined));

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
        error: null,
      });
    });

    it('should clear loading state when checkAuth.rejected', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const result = authReducer(loadingState, checkAuth.rejected(null, '', undefined));

      expect(result.isLoading).toBe(false);
    });

    it('should handle checkAuth.rejected', () => {
      const result = authReducer(initialState, checkAuth.rejected(null, '', undefined));

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
      });
    });
  });

  describe('login', () => {
    it('should set loading state when login.pending', () => {
      const result = authReducer(initialState, login.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle login.pending', () => {
      const result = authReducer(initialState, login.pending);

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.Unknown,
        isLoading: true,
        error: null,
      });
    });

    it('should clear loading state when login.fulfilled', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const result = authReducer(
        loadingState,
        login.fulfilled(mockUser, '', { email: 'test@test.com', password: '123456' })
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });

    it('should handle login.fulfilled', () => {
      const result = authReducer(
        initialState,
        login.fulfilled(mockUser, '', { email: 'test@test.com', password: '123456' })
      );

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.Auth,
        user: mockUser,
        isLoading: false,
        error: null,
      });
    });

    it('should clear loading state when login.rejected', () => {
      const loadingState = {
        ...initialState,
        isLoading: true,
      };

      const result = authReducer(
        loadingState,
        login.rejected(null, '', { email: 'test@test.com', password: '123456' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(DEFAULT_REQUEST_ERROR);
    });

    it('should handle login.rejected', () => {
      const result = authReducer(
        initialState,
        login.rejected(null, '', { email: 'test@test.com', password: '123456' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('logout', () => {
    const stateWithAuth = {
      ...initialState,
      authorizationStatus: AuthStatus.Auth,
      user: mockUser,
    };

    it('should set loading state when logout.pending', () => {
      const result = authReducer(stateWithAuth, logout.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle logout.pending', () => {
      const result = authReducer(stateWithAuth, logout.pending);

      expect(result).toEqual({
        ...stateWithAuth,
        authorizationStatus: AuthStatus.Unknown,
        isLoading: true,
        error: null,
      });
    });

    it('should clear loading state when logout.fulfilled', () => {
      const loadingState = {
        ...stateWithAuth,
        isLoading: true,
      };

      const result = authReducer(loadingState, logout.fulfilled(undefined, ''));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });

    it('should handle logout.fulfilled', () => {
      const result = authReducer(stateWithAuth, logout.fulfilled(undefined, ''));

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
        error: null,
      });
    });

    it('should clear loading state when logout.rejected', () => {
      const loadingState = {
        ...stateWithAuth,
        isLoading: true,
      };

      const result = authReducer(loadingState, logout.rejected(null, '', undefined, DEFAULT_REQUEST_ERROR));

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(DEFAULT_REQUEST_ERROR);
    });

    it('should handle logout.rejected', () => {
      const result = authReducer(stateWithAuth, logout.rejected(null, '', undefined, DEFAULT_REQUEST_ERROR));

      expect(result).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });
});
