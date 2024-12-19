import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferDetails } from '../../types/offer';
import { ApiRoute } from '../../constants';
import { createError } from '../../utils/error';
import { ThunkConfig } from '../../types/store';
import { api } from '../../services/api';
import { Actions } from '../../constants';

export const fetchOfferDetails = createAsyncThunk<OfferDetails, { offerId: string }, ThunkConfig>(
  Actions.FETCH_OFFER_DETAILS,
  async ({ offerId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferDetails>(ApiRoute.OfferDetails.replace(':id', offerId));
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
