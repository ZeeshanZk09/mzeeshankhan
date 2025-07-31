import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert Web ReadableStream -> Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

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
