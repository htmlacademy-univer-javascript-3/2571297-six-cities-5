import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';

export const fetchOffers = createAsyncThunk<Offer[], void, ThunkConfig>(
  Actions.FETCH_OFFERS,
  async (_arg, { getState, rejectWithValue }) => {
    try {
      const currentCityName = getState().common.city;
      const { data } = await api.get<Offer[]>(ApiRoute.Offers);
      return data.filter((offer: Offer) => offer.city.name === currentCityName);
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
