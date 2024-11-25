import { ApiErrorType } from '../constants/api';

export interface ApiErrorDetail {
  property: string;
  value: string;
  messages: string[];
}

export interface ApiError {
  errorType: ApiErrorType;
  message: string;
  details?: ApiErrorDetail[];
}

export interface RequestError {
  status: number;
  messages: string[];
}
