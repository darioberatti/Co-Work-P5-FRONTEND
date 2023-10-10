/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  publicRuntimeConfig: {
    cookie: {
      name: "token", // Nos aseguramos que la cookie tome el mismo nombre en local y en deployed
    },
  },
};

module.exports = nextConfig;
