/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // ✅ Use an empty object instead of `true`
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s40vlb3kca.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
