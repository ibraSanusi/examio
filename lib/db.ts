// lib/db.ts

import { PrismaClient } from "@prisma/client";

// Evita crear múltiples instancias de Prisma en desarrollo (Hot Reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // útil para depuración
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
