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
      {
        protocol: 'https', // http 또는 https
        hostname: '**', // 모든 도메인 허용
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
