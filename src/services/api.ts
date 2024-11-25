import axios, { AxiosInstance } from 'axios';
import { BASE_URL, REQUEST_TIMEOUT } from '../constants';
import { getToken } from '../utils/token';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });

  return api;
};

export const api = createAPI();
