import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  output: 'standalone',

  // 1. Image Optimization Rules
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'unheard-india-api.onrender.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'i.ibb.co' },
    ],
  },

  experimental: {},

  // 2. Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com https://i.ibb.co https://unheard-india-api.onrender.com http://localhost:*",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
              "connect-src 'self' https://unheard-india-api.onrender.com http://localhost:*",
              "media-src 'self' https: blob:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);