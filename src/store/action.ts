import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Cities, SortOption, Actions, ApiRoute } from '../constants';
import { dropToken, handleToken } from '../utils/token';
import { AuthInfo, UserData } from '../types/auth';
import { Offer, OfferDetails } from '../types/offer';
import { ThunkConfig } from './types';
import { api } from '../services/api';
import { Comment } from '../types/comment';
import { createError } from '../utils/error';

export const setActiveCity = createAction<Cities>(Actions.SET_ACTIVE_CITY);
export const setSortOption = createAction<SortOption>(Actions.SET_SORT_OPTION);

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

export const toggleFavorite = createAsyncThunk<Offer, { offerId: string; status: number }, ThunkConfig>(
  Actions.TOGGLE_FAVORITE,
  async ({ offerId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<Offer>(
        ApiRoute.FavoriteStatus.replace(':offerId', offerId).replace(':status', String(status))
      );
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const checkAuth = createAsyncThunk<UserData, void, ThunkConfig>(
  Actions.CHECK_AUTH,
  async (_arg, { rejectWithValue }) => {
    try {
      const { data } = await api.get<UserData>(ApiRoute.Login);
      handleToken(data.token);
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const login = createAsyncThunk<UserData, AuthInfo, ThunkConfig>(
  Actions.LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(ApiRoute.Login, { email, password });
      handleToken(data.token);
      return data;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const logout = createAsyncThunk<void, void, ThunkConfig>(Actions.LOGOUT, async (_arg, { rejectWithValue }) => {
  try {
    await api.delete(ApiRoute.Logout);
    dropToken();
  } catch (err) {
    return rejectWithValue(createError(err));
  }
});

export const fetchComments = createAsyncThunk<Comment[], { offerId: string }, ThunkConfig>(
  Actions.FETCH_COMMENTS,
  async ({ offerId }, { rejectWithValue }) => {
    try {
      const response = await api.get<Comment[]>(ApiRoute.Comments.replace(':offerId', offerId));
      const comments: Comment[] = response.data;
      return comments;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);

export const postComment = createAsyncThunk<Comment, { offerId: string; comment: string; rating: number }, ThunkConfig>(
  Actions.POST_COMMENT,
  async ({ offerId, comment, rating }, { rejectWithValue }) => {
    try {
      const response = await api.post<Comment>(ApiRoute.Comments.replace(':offerId', offerId), { comment, rating });
      const newComment: Comment = response.data;
      return newComment;
    } catch (err) {
      return rejectWithValue(createError(err));
    }
  }
);
