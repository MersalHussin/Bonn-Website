import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdxlzjspsvykqrzgcyvo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
compiler: { removeConsole: true },

};

module.exports = nextConfig;


export default nextConfig;
