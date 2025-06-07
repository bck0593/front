/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← ここを追加
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
}

module.exports = nextConfig
