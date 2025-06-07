require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  // 🚫 ここに output: 'export' は書かない！
};

module.exports = nextConfig;
