import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { offersReducer } from './offers';
import { authReducer } from './auth';
import { commonReducer } from './common';
import { commentsReducer } from './comments';
import { offerDetailsReducer } from './offer-details';
import { nearbyOffersReducer } from './nearby-offers';
import { favoriteOffersReducer } from './favorite-offers';

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
