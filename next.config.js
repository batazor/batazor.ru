/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'docs',
  reactStrictMode: true,
  swcMinify: true,
  generateEtags: true,
  images: {
    loader: 'custom',
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
