/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dummyjson.com", "i.dummyjson.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.dummyjson.com",
      },
    ],
  },
};

module.exports = nextConfig;
