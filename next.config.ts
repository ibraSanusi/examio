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
      {
        source: "/correction",
        destination: "/pages/correction",
      },
      {
        source: "/dashboard",
        destination: "/pages/dashboard",
      },
      {
        source: "/settings",
        destination: "/pages/settings",
      },
    ]
  },

  // Puedes agregar más opciones de Next.js aquí
  reactStrictMode: true,
}

export default nextConfig
