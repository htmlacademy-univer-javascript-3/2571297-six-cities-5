import { describe, it, expect } from 'vitest';
import { offersReducer } from './index';
import { fetchOffers } from './actions';
import { logout } from '../auth/actions';
import { toggleFavorite } from '../favorite-offers/actions';
import { DEFAULT_REQUEST_ERROR } from '../../constants';
import { mockOffer } from '../../mocks/offers';

describe('Offers Reducer', () => {
  const initialState = {
    offers: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = offersReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('fetchOffers', () => {
    it('should set loading state when fetchOffers.pending', () => {
      const result = offersReducer(initialState, fetchOffers.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle fetchOffers.fulfilled', () => {
      const mockOffers = [mockOffer];
      const result = offersReducer(initialState, fetchOffers.fulfilled(mockOffers, ''));

      expect(result).toEqual({
        offers: mockOffers,
        isLoading: false,
        error: null,
      });
    });

    it('should handle fetchOffers.rejected', () => {
      const result = offersReducer(initialState, fetchOffers.rejected(null, '', undefined, DEFAULT_REQUEST_ERROR));

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('toggleFavorite', () => {
    const stateWithOffers = {
      ...initialState,
      offers: [mockOffer],
    };

    it('should update offer favorite status when toggled', () => {
      const toggledOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };
      const result = offersReducer(
        stateWithOffers,
        toggleFavorite.fulfilled(toggledOffer, '', { offerId: '1', status: 1 })
      );

      const updatedOffer = result.offers.find((offer) => offer.id === toggledOffer.id);
      expect(updatedOffer?.isFavorite).toBe(toggledOffer.isFavorite);
      expect(result.error).toBeNull();
    });

    it('should handle toggleFavorite.rejected', () => {
      const result = offersReducer(
        stateWithOffers,
        toggleFavorite.rejected(null, '', { offerId: '1', status: 1 }, DEFAULT_REQUEST_ERROR)
      );

      expect(result.error).toBe(DEFAULT_REQUEST_ERROR);
    });
  });

  describe('logout', () => {
    const stateWithFavorites = {
      ...initialState,
      offers: [{ ...mockOffer, isFavorite: true }],
    };

    it('should reset all favorite statuses on logout', () => {
      const result = offersReducer(stateWithFavorites, logout.fulfilled(undefined, ''));

      expect(result.offers.every((offer) => !offer.isFavorite)).toBe(true);
    });
  });
});
