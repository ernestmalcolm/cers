/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.drive.google.com",
      },
      {
        protocol: "https",
        hostname: "**.images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
