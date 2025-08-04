import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'mzeeshankhan',
    short_name: 'mzk',
    description: 'This is my portfolio website.',
    start_url: '/',
    display: 'standalone',
    background_color: 'aliceblue',
    theme_color: '#000000',
  };
}
