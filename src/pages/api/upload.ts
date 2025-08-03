import path from 'path';
import fs from 'fs/promises';
import cloudinary from '@/lib/cloudinary';
import upload from '@/middlewares/upload';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Request, Response, NextFunction } from 'express';

// Configuration
const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'public/temp');
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = '10mb';

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: MAX_UPLOAD_SIZE,
  },
};

// Type safety
interface UploadedFile {
  url: string;
  public_id: string;
}

interface UploadResponse {
  success: boolean;
  uploads: UploadedFile[];
  metadata?: {
    totalFiles: number;
    totalSize: number;
    processingTime: string;
  };
}

// Middleware runner with proper typing
const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: Request, res: Response, next: NextFunction) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fn(req as unknown as Request, res as unknown as Response, (err?: unknown) => {
      return err ? reject(err) : resolve();
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse | { error: string }>
) {
  const startTime = Date.now();

  // 1. Method check
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Create temp directory if not exists
    await fs.mkdir(TEMP_UPLOAD_DIR, { recursive: true });

    // 3. Process upload based on headers
    const isMultiple = req.headers['x-upload-multiple'] === 'true';
    await runMiddleware(req, res, isMultiple ? upload.array('files', 10) : upload.single('file'));

    // 4. Get files with type safety (fix type assertion error)
    let files: Express.Multer.File[];

    if (isMultiple) {
      files = (req as unknown as { files: Express.Multer.File[] }).files;
    } else {
      const singleFile = (req as unknown as { file?: Express.Multer.File }).file;
      files = singleFile ? [singleFile] : [];
    }

    if (!files || files.length === 0 || files.some((file) => !file)) {
      return res.status(400).json({ error: 'No valid files uploaded' });
    }

    // 5. Upload to Cloudinary in parallel
    const uploadPromises = files.map(async (file) => {
      const filePath = path.join(TEMP_UPLOAD_DIR, file.filename);

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'profile_pics',
          resource_type: 'auto',
        });

        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      } finally {
        // Clean up temp file whether upload succeeds or fails
        await fs.unlink(filePath).catch(console.error);
      }
    });

    const uploadedResults = await Promise.all(uploadPromises);

    // 6. Calculate metadata
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const processingTime = `${Date.now() - startTime}ms`;

    // 7. Successful response
    return res.status(200).json({
      success: true,
      uploads: uploadedResults,
      metadata: {
        totalFiles: files.length,
        totalSize,
        processingTime,
      },
    });
  } catch (err) {
    console.error('Upload Error:', {
      timestamp: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Unknown error',
    });
    if (err instanceof Error) {
      // Specific error handling
      // TypeScript ko nahi pata ke 'err' pe 'code' property ho sakti hai, is liye type guard use karo
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: unknown }).code === 'LIMIT_FILE_SIZE'
      ) {
        return res.status(413).json({
          error: `File too large. Maximum size is ${MAX_UPLOAD_SIZE / 1024 / 1024}MB`,
        });
      }

      // Type guard use karo, lekin 'any' ki bajaye safer type assertion use karo
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code?: unknown }).code === 'LIMIT_FILE_COUNT'
      ) {
        return res.status(400).json({
          error: `Too many files. Maximum ${MAX_FILES} allowed`,
        });
      }
    }
    return res.status(500).json({
      error: 'File upload failed. Please try again.',
    });
  }
}
