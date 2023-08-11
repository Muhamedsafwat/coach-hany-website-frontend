/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://coachhany-api-muhamedsafwat.vercel.app",
  },
};

module.exports = nextConfig;
