import axios from 'axios';
import toastService from './../services/toastService';

const handleApiError = (error: unknown, defaultMessage: string): string => {
  let errorMessage = defaultMessage;

  errorMessage = (typeof error == 'string' && error) as string;

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      defaultMessage;

    debugger;
    console.error('API Error:', {
      message: errorMessage,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'object' && error !== null) {
    errorMessage = JSON.stringify(error);
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  // Ensure we never pass an object to toastService
  if (typeof errorMessage === 'object') {
    errorMessage = 'An unexpected error occurred';
  }

  toastService.error(errorMessage);
  return errorMessage;
};

export { handleApiError };
