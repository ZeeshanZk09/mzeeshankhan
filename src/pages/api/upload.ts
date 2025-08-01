// /pages/api/upload.ts

import path from 'path';
import fs from 'fs/promises';
import cloudinary from '@/lib/cloudinary';
import upload from '@/middlewares/upload';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Request, Response, NextFunction } from 'express';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface MulterNextApiRequest extends NextApiRequest {
  file?: MulterFile;
  files?: MulterFile[];
}

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: Request, res: Response, next: NextFunction) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fn(req as unknown as Request, res as unknown as Response, (result?: unknown) => {
      if (result instanceof Error) return reject(result);
      return resolve();
    });
  });
};

export default async function handler(req: MulterNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Dynamic field handler: multiple or single
    const isMultiple = req.headers['x-upload-multiple'] === 'true';
    await runMiddleware(req, res, isMultiple ? upload.array('files', 10) : upload.single('file'));

    const uploads = isMultiple ? req.files : [req.file];

    if (!uploads || uploads.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedResults = [];

    for (const file of uploads) {
      const filePath = path.join(process.cwd(), 'public/temp', file!.filename);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'profile_pics',
      });

      await fs.unlink(filePath);

      uploadedResults.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return res.status(200).json({
      success: true,
      uploads: uploadedResults,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
