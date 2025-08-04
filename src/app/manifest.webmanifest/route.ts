import { NextResponse } from 'next/server';

const manifest = {
  display: 'standalone',
  orientation: 'portrait',
  name: 'M Zeeshan Khan',
  short_name: 'Zeeshan',
  description: 'Personal Portfolio Website',
  start_url: '/',
};

export async function GET() {
  return NextResponse.json(manifest);
}
