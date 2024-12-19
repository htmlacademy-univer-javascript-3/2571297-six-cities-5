import { renderHook } from '@testing-library/react';
import { useActions } from './';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/auth/actions';
import * as commonActions from '../../store/common/actions';
import * as offersActions from '../../store/offers/actions';
import * as nearbyOffersActions from '../../store/nearby-offers/actions';
import * as offerDetailsActions from '../../store/offer-details/actions';
import * as favoriteOffersActions from '../../store/favorite-offers/actions';
import * as commentsActions from '../../store/comments/actions';
import { vi } from 'vitest';

vi.mock('../../store/auth/actions', () => ({
  checkAuth: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
}));

vi.mock('../../store/common/actions', () => ({
  setServerError: vi.fn(),
  setActiveCity: vi.fn(),
  setSortOption: vi.fn(),
}));

vi.mock('../../store/offers/actions', () => ({
  fetchOffers: vi.fn(),
}));

vi.mock('../../store/nearby-offers/actions', () => ({
  fetchNearbyOffers: vi.fn(),
}));

vi.mock('../../store/offer-details/actions', () => ({
  fetchOfferDetails: vi.fn(),
}));

vi.mock('../../store/favorite-offers/actions', () => ({
  fetchFavorits: vi.fn(),
  toggleFavorite: vi.fn(),
}));

vi.mock('../../store/comments/actions', () => ({
  fetchComments: vi.fn(),
  postComment: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

describe('useActions', () => {
  const actions = {
    ...authActions,
    ...commonActions,
    ...offersActions,
    ...nearbyOffersActions,
    ...offerDetailsActions,
    ...favoriteOffersActions,
    ...commentsActions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return bound action creators', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useActions());

    expect(Object.keys(result.current)).toEqual(Object.keys(actions));
  });

  it('should memoize actions', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { result, rerender } = renderHook(() => useActions());
    const firstResult = result.current;

    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });
});
