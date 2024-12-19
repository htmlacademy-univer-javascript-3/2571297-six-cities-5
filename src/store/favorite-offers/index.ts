import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavorites, toggleFavorite } from './actions';
import { logout } from '../auth/actions';
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
        const toggledOffer = action.payload;
        if (toggledOffer.isFavorite) {
          state.offers.push({
            ...toggledOffer,
            previewImage: 'previewImage' in toggledOffer ? toggledOffer.previewImage : toggledOffer.images[0],
          } as Offer);
        } else {
          state.offers = state.offers.filter((offer) => offer.id !== toggledOffer.id);
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
