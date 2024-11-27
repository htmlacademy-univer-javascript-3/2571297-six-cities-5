import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import type { AppDispatch } from './types';
import * as actions from './action';

export const useAppDispatch: () => AppDispatch = useDispatch;

const reduxActions = {
  ...actions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(reduxActions, dispatch), [dispatch]);
};
