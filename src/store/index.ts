import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { offersReducer } from './reducers/offers';
import { authReducer } from './reducers/auth';
import { commonReducer } from './reducers/common';
import { commentsReducer } from './reducers/comments';
import { offerDetailsReducer } from './reducers/offer-details';
import { nearbyOffersReducer } from './reducers/nearby-offers';
import { favoriteOffersReducer } from './reducers/favorite-offers';

const rootReducer = combineReducers({
  common: commonReducer,
  offers: offersReducer,
  offerDetails: offerDetailsReducer,
  nearbyOffers: nearbyOffersReducer,
  favoriteOffers: favoriteOffersReducer,
  auth: authReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
