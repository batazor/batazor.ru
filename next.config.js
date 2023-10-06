/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'docs',
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  generateEtags: true,
}

module.exports = nextConfig
