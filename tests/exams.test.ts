// tests/exams.test.ts
import { GET } from "@/app/api/exams/by-exam-id/[examId]/route"
import { prisma } from "@/lib"
import { examService } from "@/services/examService"
import { NextRequest } from "next/server"

describe("GET /exams/[examId]", () => {
  it("should return 404 if exam does not exist", async () => {
    const mock = jest.spyOn(examService, "getExamById").mockResolvedValue(null)

    const params = { examId: "id_no_existe" }
    const response = await GET({} as NextRequest, { params })

    const json = await response.json()

    expect(response.status).toBe(404)
    expect(json.success).toBe(false)
    expect(json.error.code).toBe("NO_RESULTS_FOUND")

    mock.mockRestore()
  })

  it("should return 200 status and exam if it exists", async () => {
    const user = await prisma.user.create({
      data: {
        email: "ibra@test.test",
        username: "sanuzi",
        name: "Ibrahim Ayodeji Sanusi Test",
        age: "9",
      },
    })

    expect(user).not.toBeNull()

    const exam = await prisma.exam.create({
      data: {
        userId: user.id,
        chat_examen: "Este es un examen creado para testing.",
      },
    })

    expect(exam).not.toBeNull()

    try {
      const params = { examId: exam.id_examen }
      const response = await GET({} as NextRequest, { params })

      const json = await response.json()

      expect(response.status).toBe(200)
      expect(json.success).toBe(true)
      expect({
        ...json.data,
        createdAt: new Date(json.data.createdAt),
      }).toEqual(exam)
    } finally {
      await prisma.exam.delete({ where: { id_examen: exam.id_examen } })
      await prisma.user.delete({ where: { id: user.id } })

      await prisma.$disconnect()
    }
  })
})
