interface Manifest {
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation?: 'any' | 'natural' | 'landscape' | 'portrait';
  name: string;
  short_name?: string;
  description?: string;
  start_url: string;
  background_color: string;
  theme_color: string;
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
  scope: string;
  dir: string;
  lang: string;
}

const manifest: Manifest = {
  display: 'standalone' as const,
  orientation: 'portrait' as const,
  name: 'M Zeeshan Khan',
  short_name: 'Zeeshan',
  description: 'Personal Portfolio Website',
  start_url: '/',
  background_color: '#ffffff',
  theme_color: '#047856',
  icons: [
    {
      src: '/icons/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/icons/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  // Optional PWA features
  scope: '/',
  dir: 'ltr',
  lang: 'en-US',
};

export default manifest;
