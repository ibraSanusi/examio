// services/examService.ts
import { prisma } from "@/lib"

export const userService = {
  async getUserIdFromEmail(email: string): Promise<string> {
    const response = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        email,
      },
    })

    if (!response?.id) return ""

    return response.id
  },
}
