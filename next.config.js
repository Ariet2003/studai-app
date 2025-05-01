/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Для изображений из Google
      'ui-avatars.com', // Для сгенерированных аватаров
      'randomuser.me' // Для тестовых аватаров
    ],
  },
}

module.exports = nextConfig 