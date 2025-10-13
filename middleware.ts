// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    console.log("toke before if: ", token)

    // 🚫 Si NO hay token y está intentando acceder a páginas protegidas
    if (
      !token &&
      ["/dashboard", "/settings", "/pages/dashboard", "/pages/settings"].includes(pathname)
    ) {
      console.log("pathname: ", pathname)
      console.log("token: ", token)
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // ✅ Si hay token y está intentando ir al login, mándalo al home
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // Si no entra en ningún caso anterior, continuar
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Deja pasar a la función middleware
    },
  },
)

export const config = {
  matcher: [
    "/dashboard",
    "/settings",
    "/pages/dashboard",
    "/pages/settings",
    "/login",
    "/pages/auth/login",
  ],
}
