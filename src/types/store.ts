import { Dispatch } from '@reduxjs/toolkit';
import { store } from '../store';
import { AxiosInstance } from 'axios';
import { RequestError } from '../types/error';

export interface ThunkExtraArguments {
  api: AxiosInstance;
}

export type ThunkConfig = {
  dispatch?: Dispatch;
  state: RootState;
  extra: ThunkExtraArguments;
  rejectValue: RequestError;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
