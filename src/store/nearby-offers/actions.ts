import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';

export const fetchNearbyOffers = createAsyncThunk<Offer[], { offerId: string }, ThunkConfig>(
  Actions.FETCH_NEARBY_OFFERS,
  async ({ offerId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>(ApiRoute.NearbyOffers.replace(':id', offerId));
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
