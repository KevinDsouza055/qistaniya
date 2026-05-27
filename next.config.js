/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['localhost:3000', '172.26.96.1', '172.26.96.1:3000'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
