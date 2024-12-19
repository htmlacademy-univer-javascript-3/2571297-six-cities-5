import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../../types/offer';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';

export const fetchFavorites = createAsyncThunk<Offer[], void, ThunkConfig>(
  Actions.FETCH_FAVORITES,
  async (_arg, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.Favorites);
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const toggleFavorite = createAsyncThunk<Offer | OfferDetails, { offerId: string; status: number }, ThunkConfig>(
  Actions.TOGGLE_FAVORITE,
  async ({ offerId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<Offer | OfferDetails>(
        ApiRoute.FavoriteStatus.replace(':offerId', offerId).replace(':status', String(status))
      );
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
