import { createAction } from '@reduxjs/toolkit';
import { Cities, SortOption, Actions } from '../../constants';

export const setActiveCity = createAction<Cities>(Actions.SET_ACTIVE_CITY);
export const setSortOption = createAction<SortOption>(Actions.SET_SORT_OPTION);
export const setServerError = createAction<boolean>(Actions.SET_SERVER_ERROR);
