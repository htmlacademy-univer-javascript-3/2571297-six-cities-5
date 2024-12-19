import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers } from './actions';
import { logout } from '../auth/actions';
import { toggleFavorite } from '../favorite-offers/actions';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(logout.fulfilled, (state) => {
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: false,
        }));
      });
  },
});

export const offersReducer = offersSlice.reducer;
