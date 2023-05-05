/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
