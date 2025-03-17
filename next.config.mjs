/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // No changes to allowedOrigins
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s40vlb3kca.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "uploadthing-production.up.railway.app",
      },
    ],
  },
};

export default nextConfig;