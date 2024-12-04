import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavorites, logout, toggleFavorite } from '../action';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type FavoriteOffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: FavoriteOffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

const favoriteOffersSlice = createSlice({
  name: 'favoriteOffers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          state.offers.push(updatedOffer);
        } else {
          state.offers = state.offers.filter((offer) => offer.id !== updatedOffer.id);
        }
        state.error = null;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      })
      .addCase(logout.fulfilled, (state) => {
        state.offers = [];
      });
  },
});

export const favoriteOffersReducer = favoriteOffersSlice.reducer;
