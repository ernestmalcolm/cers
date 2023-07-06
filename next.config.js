/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.drive.google.com",
      },
      {
        protocol: "https",
        hostname: "**.images.unsplash.com",
      },
      { protocol: "https", hostname: "gjghraakekbiiwvlmout.supabase.co" },
    ],
  },
};

module.exports = nextConfig;
