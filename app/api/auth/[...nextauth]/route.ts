import NextAuth from "next-auth"
import { authOptions } from "@/lib"

const discordClientId = process.env.DISCORD_CLIENT_ID
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET

if (!discordClientId || !discordClientSecret) {
  throw new Error("Faltan variables de entorno DISCORD_CLIENT_ID o DISCORD_CLIENT_SECRET")
}

// Extiende los tipos de NextAuth para incluir accessToken en Session y JWT
declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
