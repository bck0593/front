require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  output: 'export', // ← これを追加
};

module.exports = nextConfig;
