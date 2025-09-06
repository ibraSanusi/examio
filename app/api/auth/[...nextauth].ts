import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib"


const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;

if (!discordClientId || !discordClientSecret) {
  throw new Error("Faltan variables de entorno DISCORD_CLIENT_ID o DISCORD_CLIENT_SECRET");
}

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: discordClientId,
      clientSecret: discordClientSecret,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
});

