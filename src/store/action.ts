import { createAction } from '@reduxjs/toolkit';
import { Cities, SortOption } from '../constants';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFERS: 'GET_OFFERS',
  GET_FAVORITES_OFFERS: 'GET_FAVORITES_OFFERS',
  CHANGE_SORT_OPTION: 'CHANGE_SORT_OPTION',
};

export const setActiveCity = createAction<Cities>(Action.CHANGE_CITY);
export const getOffers = createAction<Cities>(Action.GET_OFFERS);
export const getFavoritesOffers = createAction(Action.GET_FAVORITES_OFFERS);
export const changeSortOption = createAction<SortOption>(Action.CHANGE_SORT_OPTION);
