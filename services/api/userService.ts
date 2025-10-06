// services/examService.ts
import { prisma } from "@/lib"
import { UpdateUserType } from "@/types/api"
import { User } from "@/types/models"

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

  async getUserDataFromEmail(email: string): Promise<User | null> {
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!response?.id) return null

    return response
  },

  async delete(userId: string): Promise<User | null> {
    return await prisma.user.delete({
      where: {
        id: userId,
      },
    })
  },

  async update(userId: string, values: UpdateUserType): Promise<User | null> {
    return await prisma.user.update({
      data: values,
      where: {
        id: userId,
      },
    })
  },
}
