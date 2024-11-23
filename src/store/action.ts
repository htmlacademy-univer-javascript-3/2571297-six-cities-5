import { createAction } from '@reduxjs/toolkit';
import { Cities } from '../constants';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFERS: 'GET_OFFERS',
  GET_FAVORITES_OFFERS: 'GET_FAVORITES_OFFERS',
};

export const setActiveCity = createAction<Cities>(Action.CHANGE_CITY);
export const getOffers = createAction<Cities>(Action.GET_OFFERS);
export const getFavoritesOffers = createAction(Action.GET_FAVORITES_OFFERS);
