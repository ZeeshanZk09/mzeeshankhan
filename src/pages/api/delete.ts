import path from 'path';
import fs from 'fs/promises';
import cloudinary from '@/lib/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/utils/NextApiError';
import { ApiSuccess } from '@/utils/NextApiSuccess';
import { DeleteErrorResponse, DeleteSuccessResponse } from '@/types/imageTypes';

const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'public/temp');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteSuccessResponse | DeleteErrorResponse | { error: string }>
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, public_id } = req.query;

    if (!filename && !public_id) {
      return res.status(400).json({ error: 'Either filename or public_id is required' });
    }

    // 1. Try deleting from local temp
    if (filename) {
      const filePath = path.join(TEMP_UPLOAD_DIR, filename as string);
      try {
        await fs.unlink(filePath);
        const local = ApiSuccess.ok('File deleted from Cloudinary', {
          deletedFrom: 'local',
        });
        return res.status(200).json({
          ...local,
          deletedFrom: 'local',
        });
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
          console.error('Local Deletion Error:', err);
          return res.status(500).json({ error: 'Local file deletion failed. Try again.' });
        }
        // If file doesn't exist locally, proceed to check Cloudinary
        return res.status(404).json(new ApiError(404, 'File not found in local temp folder'));
      }
    }

    // 2. Delete from Cloudinary if public_id provided
    if (public_id) {
      const result = await cloudinary.uploader.destroy(public_id as string);

      if (result.result === 'ok') {
        const cloudinary = ApiSuccess.ok('File deleted from Cloudinary', {
          deletedFrom: 'cloudinary',
        });
        return res.status(cloudinary.statusCode).json({
          ...cloudinary,
          deletedFrom: 'cloudinary',
        });
      } else {
        return res.status(404).json({
          error: `File not found on Cloudinary (public_id: ${public_id})`,
        });
      }
    }

    return res.status(404).json({ error: 'File not found in local temp or Cloudinary' });
  } catch (err) {
    console.error('Delete Error:', err);
    return res.status(500).json({ error: 'File deletion failed. Try again.' });
  }
}
