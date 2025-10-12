import withAuth from "next-auth/middleware"
import { authOptions } from "./lib"

export const config = {
  matcher: ["/dashboard", "/settings"],
}

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  jwt: { decode: authOptions.jwt?.decode },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})
