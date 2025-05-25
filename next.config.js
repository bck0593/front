require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ← 静的出力にする
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
}

module.exports = nextConfig
