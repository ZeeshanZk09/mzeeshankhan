import { NextRequest, NextResponse } from 'next/server';
// import { upload } from '@/utils/uploadMiddleware';
// import { promisify } from 'util';
import { Readable } from 'stream';

// Utility to convert buffer from file stream
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await streamToBuffer(file.stream());
    const fs = await import('fs/promises');
    const path = await import('path');

    const uploadPath = path.join(process.cwd(), 'public', 'temp', file.name);
    await fs.writeFile(uploadPath, buffer);

    return NextResponse.json({ message: 'File uploaded successfully!', filename: file.name });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
