import { describe, it, expect, vi } from 'vitest';
import { favoriteOffersReducer } from './index';
import { DEFAULT_REQUEST_ERROR } from '../../constants';
import { mockOffer } from '../../mocks/offers';

vi.mock('./actions', () => ({
  fetchFavorites: {
    pending: { type: 'favorites/fetchFavorites/pending' },
    fulfilled: { type: 'favorites/fetchFavorites/fulfilled' },
    rejected: { type: 'favorites/fetchFavorites/rejected' },
  },
  toggleFavorite: {
    fulfilled: { type: 'favorites/toggleFavorite/fulfilled' },
    rejected: { type: 'favorites/toggleFavorite/rejected' },
  },
}));

vi.mock('../auth/actions', () => ({
  logout: {
    fulfilled: { type: 'auth/logout/fulfilled' },
  },
}));

describe('Favorite Offers Reducer', () => {
  const initialState = {
    offers: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = favoriteOffersReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('fetchFavorites', () => {
    it('should set loading state when fetchFavorites.pending', () => {
      const result = favoriteOffersReducer(initialState, { type: 'favorites/fetchFavorites/pending' });

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle fetchFavorites.fulfilled', () => {
      const mockOffers = [mockOffer];
      const result = favoriteOffersReducer(initialState, {
        type: 'favorites/fetchFavorites/fulfilled',
        payload: mockOffers,
      });

      expect(result).toEqual({
        offers: mockOffers,
        isLoading: false,
        error: null,
      });
    });

    it('should handle fetchFavorites.rejected', () => {
      const result = favoriteOffersReducer(initialState, {
        type: 'favorites/fetchFavorites/rejected',
        payload: DEFAULT_REQUEST_ERROR,
      });

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('toggleFavorite', () => {
    it('should add offer when toggled to favorite', () => {
      const favoriteOffer = { ...mockOffer, isFavorite: true };
      const result = favoriteOffersReducer(initialState, {
        type: 'favorites/toggleFavorite/fulfilled',
        payload: favoriteOffer,
      });

      expect(result.offers[0]).toEqual(favoriteOffer);
      expect(result.offers).toHaveLength(1);
      expect(result.error).toBeNull();
    });

    it('should remove offer when toggled from favorite', () => {
      const stateWithOffer = {
        ...initialState,
        offers: [mockOffer],
      };

      const unfavoriteOffer = { ...mockOffer, isFavorite: false };
      const result = favoriteOffersReducer(stateWithOffer, {
        type: 'favorites/toggleFavorite/fulfilled',
        payload: unfavoriteOffer,
      });

      expect(result.offers).not.toContain(unfavoriteOffer);
      expect(result.error).toBeNull();
    });

    it('should handle toggleFavorite.rejected', () => {
      const result = favoriteOffersReducer(initialState, {
        type: 'favorites/toggleFavorite/rejected',
        payload: DEFAULT_REQUEST_ERROR,
      });

      expect(result.error).toBe(DEFAULT_REQUEST_ERROR);
    });
  });

  describe('logout', () => {
    it('should clear offers on logout.fulfilled', () => {
      const stateWithOffers = {
        ...initialState,
        offers: [mockOffer],
      };

      const result = favoriteOffersReducer(stateWithOffers, {
        type: 'auth/logout/fulfilled',
      });

      expect(result.offers).toEqual([]);
    });
  });
});
