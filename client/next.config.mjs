/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "api.dicebear.com",
      "media.kitsu.app",
      "cdn.myanimelist.net",
    ], // tambahkan domain Drive
  },
};

export default nextConfig;
