// services/examService.ts
import { prisma } from "@/lib"
import { Exam } from "@/types/models"

export const examService = {
  async getExamById(examId: string): Promise<Exam | null> {
    return await prisma.exam.findUnique({
      where: { id_examen: examId },
    })
  },

  async deleteExamById(examId: string): Promise<void> {
    await prisma.exam.delete({
      where: { id_examen: examId },
    })
  },

  async getExamsByUserId(userId: string): Promise<Exam[]> {
    return await prisma.exam.findMany({ where: { userId } })
  },
}
