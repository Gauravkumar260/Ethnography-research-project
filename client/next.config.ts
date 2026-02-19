import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // 1. Image Optimization Rules
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // Unsplash often uses this subdomain
      },
      {
        protocol: 'https',
        hostname: 'unheard-india-api.onrender.com', // Your Production Backend
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Allows images from local backend testing
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // NEW: Added for ibb.co image hosting
      },
    ],
  },

  // 2. Experimental Features (Kept empty for now, ready for future use)
  experimental: {
    // You can add features like typedRoutes or serverActions here later
  },
};

export default withNextIntl(nextConfig);