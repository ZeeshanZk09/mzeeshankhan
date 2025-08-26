import axios from 'axios';

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

  return errorMessage;
};

export { handleApiError };
