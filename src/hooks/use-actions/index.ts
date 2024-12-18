import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as actions from '../../store/action';
import { useAppDispatch } from '../use-app-dispatch';

const reduxActions = {
  ...actions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(reduxActions, dispatch), [dispatch]);
};
