import { NextResponse } from 'next/server';

const manifest = {
  display: 'standalone',
  orientation: 'portrait',
  name: 'M Zeeshan Khan',
  short_name: 'Zeeshan',
  description: 'Personal Portfolio Website',
  start_url: '/',
  background_color: '#ffffff',
  theme_color: '#047856',
};

export async function GET() {
  return NextResponse.json(manifest);
}
