export interface DeleteErrorResponse {
  statusCode: number;
  message: string;
  errors: unknown;
  isOperational: boolean;
}

export interface DeleteSuccessResponse {
  success: boolean;
  data: unknown;
  metadata?: Record<string, unknown>;
  statusCode: number;
  deletedFrom?: 'local' | 'cloudinary';
}
