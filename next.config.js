/** @type {import('next').NextConfig} */
const nextConfig = {
  // 動的ルートなら output: 'export' は設定しないでOK
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
};

module.exports = nextConfig;


