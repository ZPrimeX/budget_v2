/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
