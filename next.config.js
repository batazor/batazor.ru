/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'docs',
  reactStrictMode: true,
  swcMinify: true,
  generateEtags: true,
}

module.exports = nextConfig
