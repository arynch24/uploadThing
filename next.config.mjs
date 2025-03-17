/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb'  // Increase this to a suitable value for your uploads
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