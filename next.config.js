/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Для изображений из Google
      'ui-avatars.com', // Для сгенерированных аватаров
      'randomuser.me' // Для тестовых аватаров
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf)$/i,
      type: 'asset/resource'
    })
    return config
  }
}

module.exports = nextConfig 