import { prisma } from "@/lib"

test("prisma connects successfully", async () => {
  await expect(prisma.$connect()).resolves.not.toThrow()
})
