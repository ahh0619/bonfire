/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gocamping.or.kr',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
