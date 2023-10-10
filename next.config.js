/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

module.exports = withImages(
  withCSS({
    serverRuntimeConfig: {
      // Configuración de cookies del servidor
      cookieSecret: "milanesa",
      cookieName: "token", // Nombre de la cookie
      cookieOptions: {
        httpOnly: true, // Solo accesible en el servidor
        sameSite: "strict", // Controla las restricciones de SameSite
        secure: true, // Configura secure en producción
      },
    },
    env: {
      API_URL: process.env.API_URL,
    },
  })
);
