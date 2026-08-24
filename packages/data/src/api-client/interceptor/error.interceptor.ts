import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../errors/api-error.js';
import { ErrorCode } from '../errors/error-codes.js';
import { ApiError as BackendError } from '@org/shared';

export function applyErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        const backendBody: BackendError = error.response?.data;
        throw new ApiError(
          backendBody?.message || 'An unknown error occurred',
          error.response?.status || 500,
          backendBody?.errorCode && backendBody.errorCode in ErrorCode
            ? ErrorCode[backendBody.errorCode as keyof typeof ErrorCode]
            : ErrorCode.UNKNOWN,
          backendBody?.details,
        );
      }
      throw error;
    },
  );
}
