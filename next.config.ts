import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3itvsmwj0r86k.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'static.fatcoupon.com',
      },
    ],
  },
};

export default nextConfig;
