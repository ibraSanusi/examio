import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Habilita imágenes optimizadas de dominios externos
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },

  // Configuración de rewrites (rutas personalizadas)
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login", // elimina "pages" de la ruta, Next.js lo maneja automáticamente
      },
    ]
  },

  // Puedes agregar más opciones de Next.js aquí
  reactStrictMode: true,
}

export default nextConfig
