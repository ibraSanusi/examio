import { type PrismaClient } from "@prisma/client"
import { Exam, User } from "@/types/models"

export async function createUserTest(prisma: PrismaClient) {
  return await prisma.user.create({
    data: {
      email: `ibra${new Date()}@test.test`,
      username: `sanuzi${new Date()}`,
      name: "Ibrahim Ayodeji Sanusi Test",
      age: "9",
    },
  })
}

export async function createUserExam(userId: string, prisma: PrismaClient) {
  return await prisma.exam.create({
    data: {
      userId,
      chat_examen: "Este es un examen creado para testing.",
    },
  })
}

export async function deletePreviousUserCreated(user: User, prisma: PrismaClient) {
  await prisma.user.delete({ where: { id: user.id } })
}
export async function deletePreviousExamCreated(exam: Exam, prisma: PrismaClient) {
  await prisma.exam.delete({ where: { id_examen: exam.id_examen } })
}
