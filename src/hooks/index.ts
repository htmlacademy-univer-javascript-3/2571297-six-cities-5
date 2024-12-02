import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../types/store';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as actions from '../store/action';

const reduxActions = {
  ...actions,
};

export { useMap } from './use-map';
export { useSorting } from './use-sorting';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(reduxActions, dispatch), [dispatch]);
};
