import { describe, it, expect } from 'vitest';
import { offerDetailsReducer } from './index';
import { fetchOfferDetails, toggleFavorite, logout } from '../action';
import { DEFAULT_REQUEST_ERROR } from '../../constants';
import { mockOfferDetails } from '../../mocks/offers';

describe('Offer Details Reducer', () => {
  const initialState = {
    offer: null,
    isLoading: false,
    error: null,
  };

  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = offerDetailsReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('fetchOfferDetails', () => {
    it('should set loading state when fetchOfferDetails.pending', () => {
      const result = offerDetailsReducer(initialState, fetchOfferDetails.pending);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should handle fetchOfferDetails.fulfilled', () => {
      const result = offerDetailsReducer(
        initialState,
        fetchOfferDetails.fulfilled(mockOfferDetails, '', { offerId: '1' })
      );

      expect(result).toEqual({
        offer: mockOfferDetails,
        isLoading: false,
        error: null,
      });
    });

    it('should handle fetchOfferDetails.rejected', () => {
      const result = offerDetailsReducer(
        initialState,
        fetchOfferDetails.rejected(null, '', { offerId: '1' }, DEFAULT_REQUEST_ERROR)
      );

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: DEFAULT_REQUEST_ERROR,
      });
    });
  });

  describe('toggleFavorite', () => {
    const stateWithOffer = {
      ...initialState,
      offer: mockOfferDetails,
    };

    it('should update favorite status when offer matches', () => {
      const toggledOffer = { ...mockOfferDetails, isFavorite: !mockOfferDetails.isFavorite };
      const result = offerDetailsReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(toggledOffer, '', { offerId: '1', status: 1 })
      );

      expect(result.offer?.isFavorite).toBe(toggledOffer.isFavorite);
    });

    it('should not update state when offer id does not match', () => {
      const differentOffer = { ...mockOfferDetails, id: '2', isFavorite: !mockOfferDetails.isFavorite };
      const result = offerDetailsReducer(
        stateWithOffer,
        toggleFavorite.fulfilled(differentOffer, '', { offerId: '2', status: 1 })
      );

      expect(result).toEqual(stateWithOffer);
    });
  });

  describe('logout', () => {
    const stateWithOffer = {
      ...initialState,
      offer: { ...mockOfferDetails, isFavorite: true },
    };

    it('should reset favorite status on logout', () => {
      const result = offerDetailsReducer(stateWithOffer, logout.fulfilled(undefined, ''));

      expect(result.offer?.isFavorite).toBe(false);
    });
  });
});
