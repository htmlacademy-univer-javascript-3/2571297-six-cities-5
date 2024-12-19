import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { offersReducer as offers } from './offers';
import { authReducer as auth } from './auth';
import { commonReducer as common } from './common';
import { commentsReducer as comments } from './comments';
import { offerDetailsReducer as offerDetails } from './offer-details';
import { nearbyOffersReducer as nearbyOffers } from './nearby-offers';
import { favoriteOffersReducer as favoriteOffers } from './favorite-offers';

const rootReducer = combineReducers({
  common,
  offers,
  offerDetails,
  nearbyOffers,
  favoriteOffers,
  auth,
  comments,
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
