import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as authActions from '../../store/auth/actions';
import * as commonActions from '../../store/common/actions';
import * as offersActions from '../../store/offers/actions';
import * as nearbyOffersActions from '../../store/nearby-offers/actions';
import * as offerDetailsActions from '../../store/offer-details/actions';
import * as favoriteOffersActions from '../../store/favorite-offers/actions';
import * as commentsActions from '../../store/comments/actions';
import { useAppDispatch } from '../use-app-dispatch';

const reduxActions = {
  ...authActions,
  ...commonActions,
  ...offersActions,
  ...nearbyOffersActions,
  ...offerDetailsActions,
  ...favoriteOffersActions,
  ...commentsActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(reduxActions, dispatch), [dispatch]);
};
