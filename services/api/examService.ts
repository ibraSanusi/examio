// services/examService.ts
import { prisma } from "@/lib"
import { Exam } from "@/types/models"

export const examService = {
  async createUserExam(userId: string, chat_examen: string): Promise<Exam | null> {
    return await prisma.exam.create({
      data: {
        userId,
        chat_examen,
      },
    })
  },

  async getExamById(examId: string): Promise<Exam | null> {
    return await prisma.exam.findUnique({
      where: { id_examen: examId },
    })
  },

  async deleteExamById(examId: string): Promise<Exam | null> {
    return prisma.exam.delete({
      where: { id_examen: examId },
    })
  },

  async getExamsByUserId(userId: string): Promise<Exam[]> {
    return await prisma.exam.findMany({ where: { userId } })
  },

  async saveCorrection(examId: string, correction: string): Promise<Exam | null> {
    const exam = await prisma.exam.findUnique({
      where: {
        id_examen: examId,
      },
    })

    if (!exam) return null
    return await prisma.exam.update({ where: { id_examen: examId }, data: { correction } })
  },
}
