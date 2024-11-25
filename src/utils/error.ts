import { AxiosError } from 'axios';
import { ApiError, RequestError } from '../types/error';

export const createError = (err: unknown): RequestError => {
  const error = err as AxiosError;
  const status = error.response?.status ?? 500;
  let messages: string[] = [];

  if (error.response?.data) {
    const apiError = error.response.data as ApiError;
    if (apiError.details?.length) {
      messages = apiError.details.flatMap((detail) => detail.messages);
    } else if (apiError.message) {
      messages = [apiError.message];
    }
  }

  if (!messages.length) {
    messages = [error.message];
  }

  return { status, messages };
};
