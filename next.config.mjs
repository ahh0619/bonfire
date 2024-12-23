/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gocamping.or.kr',
      },
      {
        protocol: 'https',
        hostname: 'yuffuinkwylfnfxjxozu.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
