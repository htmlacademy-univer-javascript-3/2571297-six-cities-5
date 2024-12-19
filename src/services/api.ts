import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../constants';
import { getToken } from '../utils/token';
import { store } from '../store';
import { setServerError } from '../store/common/actions';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    store.dispatch(setServerError(false));
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (!error.response || error.response.status >= 500) {
        store.dispatch(setServerError(true));
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createAPI();
