/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    },
  },
  // Add this section:
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
      },
    ];
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