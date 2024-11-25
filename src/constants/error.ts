import { RequestError } from '../types/error';

export const DEFAULT_REQUEST_ERROR: RequestError = {
  status: 500,
  messages: ['Unknown error occurred'],
};
