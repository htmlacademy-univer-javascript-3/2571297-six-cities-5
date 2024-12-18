import { renderHook } from '@testing-library/react';
import { useAppSelector } from './';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import { RootState } from '../../types/store';
import { AuthStatus, Cities, SortOption } from '../../constants';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('useAppSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return selected state', () => {
    const mockState: RootState = {
      auth: {
        authorizationStatus: AuthStatus.NoAuth,
        user: null,
        isLoading: false,
        error: null,
      },
      favoriteOffers: {
        offers: [],
        isLoading: false,
        error: null,
      },
      offers: {
        offers: [],
        isLoading: false,
        error: null,
      },
      offerDetails: {
        offer: null,
        isLoading: false,
        error: null,
      },
      nearbyOffers: {
        offers: [],
        isLoading: false,
        error: null,
      },
      comments: {
        comments: [],
        isLoading: false,
        error: null,
      },
      common: {
        city: Cities.Paris,
        sortOption: SortOption.Popular,
      },
    } as const;

    const selector = (state: RootState) => state.auth.user;
    const expectedResult = mockState.auth.user;

    vi.mocked(useSelector).mockImplementation((fn) => fn(mockState));

    const { result } = renderHook(() => useAppSelector(selector));

    expect(result.current).toBe(expectedResult);
    expect(useSelector).toHaveBeenCalledWith(selector);
  });

  it('should pass selector function to useSelector', () => {
    const selector = (state: RootState) => state.auth.authorizationStatus;

    renderHook(() => useAppSelector(selector));

    expect(useSelector).toHaveBeenCalledWith(selector);
  });
});
