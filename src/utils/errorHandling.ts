import axios from 'axios';
import toastService from './../services/toastService';

const handleApiError = (error: unknown, defaultMessage: string): string => {
  let errorMessage = defaultMessage;
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.error || error.response?.data?.message || error.message;

    // Log detailed error info for debugging
    console.error('API Error:', {
      message: errorMessage,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toastService.error(errorMessage);
  return errorMessage;
};

export { handleApiError };
