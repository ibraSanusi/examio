import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib"
import { NextAuthOptions } from "next-auth"

const discordClientId = process.env.DISCORD_CLIENT_ID
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET

if (!discordClientId || !discordClientSecret) {
  throw new Error("Faltan variables de entorno DISCORD_CLIENT_ID o DISCORD_CLIENT_SECRET")
}

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: discordClientId,
      clientSecret: discordClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
}
