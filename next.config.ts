import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Habilita imágenes optimizadas de dominios externos
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },

  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/pages/auth/login",
      },
      {
        source: "/exam",
        destination: "/pages/exam",
      },
    ]
  },

  // Puedes agregar más opciones de Next.js aquí
  reactStrictMode: true,
}

export default nextConfig
