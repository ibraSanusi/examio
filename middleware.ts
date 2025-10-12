import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export const config = {
  matcher: ["/dashboard", "/settings"],
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log("token: ", token)

  if (token) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/pages/auth/login", req.url))
}
