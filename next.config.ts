/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**', // อนุญาตทุก path
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
