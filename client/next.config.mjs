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
  experimental: {
    allowedDevOrigins: ["http://192.168.2.154:3000"], // sesuaikan dengan frontend origin
  },
};

export default nextConfig;
