import { describe, it, expect } from 'vitest';
import { nearbyOffersReducer } from './index';
import { fetchNearbyOffers } from '../action';
import { DEFAULT_REQUEST_ERROR } from '../../constants';
import { mockOffer } from '../../mocks/offers';

describe('Nearby Offers Reducer', () => {
  const initialState = {
    offers: [],
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = nearbyOffersReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should set loading state when fetchNearbyOffers.pending', () => {
      const result = nearbyOffersReducer(initialState, fetchNearbyOffers.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle fetchNearbyOffers.fulfilled', () => {
      const mockOffers = [mockOffer];
      const result = nearbyOffersReducer(initialState, fetchNearbyOffers.fulfilled(mockOffers, '', { offerId: '1' }));

      expect(result).toEqual({
        offers: mockOffers,
        isLoading: false,
        error: null,
      });
    });

    it('should handle fetchNearbyOffers.rejected', () => {
      const result = nearbyOffersReducer(
        initialState,
        fetchNearbyOffers.rejected(null, '', { offerId: '1' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });
});
