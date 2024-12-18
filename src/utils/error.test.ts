import { createError } from './error';
import { AxiosError } from 'axios';

describe('error utils', () => {
  it('should create error from axios error with details', () => {
    const axiosError = {
      response: {
        status: 400,
        data: {
          details: [{ messages: ['Error 1', 'Error 2'] }, { messages: ['Error 3'] }],
        },
      },
    } as AxiosError;

    const result = createError(axiosError);

    expect(result.status).toBe(400);
    expect(result.messages).toEqual(['Error 1', 'Error 2', 'Error 3']);
  });

  it('should create error from axios error with single message', () => {
    const axiosError = {
      response: {
        status: 404,
        data: {
          message: 'Not Found',
        },
      },
    } as AxiosError;

    const result = createError(axiosError);

    expect(result.status).toBe(404);
    expect(result.messages).toEqual(['Not Found']);
  });

  it('should create error with default values when no response', () => {
    const axiosError = {
      message: 'Network Error',
    } as AxiosError;

    const result = createError(axiosError);

    expect(result.status).toBe(500);
    expect(result.messages).toEqual(['Network Error']);
  });
});
