/** @type {import('next').NextConfig} */
const nextConfig = {
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
  
  