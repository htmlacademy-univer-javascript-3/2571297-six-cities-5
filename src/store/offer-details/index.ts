import { createSlice } from '@reduxjs/toolkit';
import { OfferDetails } from '../../types/offer';
import { fetchOfferDetails, toggleFavorite, logout } from '../action';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type OfferDetailsState = {
  offer: OfferDetails | null;
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: OfferDetailsState = {
  offer: null,
  isLoading: false,
  error: null,
};

const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchOfferDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (state.offer && state.offer.id === action.payload.id) {
          state.offer.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        if (state.offer) {
          state.offer.isFavorite = false;
        }
      });
  },
});

export const offerDetailsReducer = offerDetailsSlice.reducer;
