// tests/exams.test.ts
import { GET, DELETE } from "@/app/api/exams/by-exam-id/[examId]/route"
import { Exam, User } from "@/types/models"
import { prisma } from "@/lib"
import { examService } from "@/services/api/examService"
import { ApiResponseError, ApiResponseSuccess } from "@/types/api"
import { NextRequest } from "next/server"
import {
  createUserExam,
  createUserTest,
  deletePreviousExamCreated,
  deletePreviousUserCreated,
} from "./helpers/services"
import { POST as POST_EXAMS } from "@/app/api/exams/route"
// import { POST as POST_CHECK } from "@/app/api/exams/by-exam-id/[examId]/check/route"
import { gptService } from "@/services/api/gptService"
import { bodyNotValid, bodyValid, examResponse } from "./constants"
import { checkExam } from "@/lib/api"

describe("GET /exams/by-exam-id/[examId]", () => {
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

  it("should return 400 if exam_id not exist", async () => {
    const params = { examId: "" }
    const response = await GET({} as NextRequest, { params })

    const json: ApiResponseError = await response.json()

    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error.code).toBe("EXAM_ID_REQUIRED")
  })

  it("should return 200 status and exam if it exists", async () => {
    const user = await createUserTest(prisma)

    expect(user).not.toBeNull()

    const exam = await createUserExam(user.id, prisma)

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
      await deletePreviousExamCreated(exam, prisma)
      await deletePreviousUserCreated(user, prisma)
    }
  })
})

describe("DELETE /exams/by-exam-id/[examId]", () => {
  it("should return 404 if exam does not exist", async () => {
    const mock = jest.spyOn(examService, "deleteExamById").mockResolvedValue(null)

    const params = { examId: "id_no_existe" }
    const response = await DELETE({} as NextRequest, { params })

    const json: ApiResponseError = await response.json()

    expect(response.status).toBe(404)
    expect(json.success).toBe(false)
    expect(json.error.code).toBe("EXAM_NOT_FOUND")

    mock.mockRestore()
  })

  it("should return 400 if exam_id not exist", async () => {
    const params = { examId: "" }
    const response = await DELETE({} as NextRequest, { params })

    const json: ApiResponseError = await response.json()

    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error.code).toBe("EXAM_ID_REQUIRED")
  })

  it("should return 200 and exam_id if could delete it", async () => {
    const user: User = await createUserTest(prisma)

    try {
      const exam: Exam = await createUserExam(user.id, prisma)
      const params = { examId: exam.id_examen }

      const response = await DELETE({} as NextRequest, { params })
      const json: ApiResponseSuccess<string> = await response.json()

      expect(json.success).toBe(true)
      expect(response.status).toBe(200)
      expect(json.data).toBe(exam.id_examen)

      const examInDb = await prisma.exam.findUnique({ where: { id_examen: exam.id_examen } })
      expect(examInDb).toBeNull()
    } finally {
      await deletePreviousUserCreated(user, prisma)
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})

describe("POST /exams", () => {
  it("should return 400 if data not valid", async () => {
    // construimos un Request nativo
    const request = new Request("http://localhost:3000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyNotValid),
    })

    // lo envolvemos en un NextRequest
    const nextRequest = new NextRequest(request)

    const response = await POST_EXAMS(nextRequest)
    const json: ApiResponseError = await response.json()

    expect(response.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error.code).toBe("DATA_NOT_VALID")
  })

  it("should return 204 if no text returned from GPT", async () => {
    const mock = jest.spyOn(gptService, "ask").mockResolvedValue("")

    // construimos un Request nativo
    const request = new Request("http://localhost:3000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyValid),
    })

    // lo envolvemos en un NextRequest
    const nextRequest = new NextRequest(request)

    const response = await POST_EXAMS(nextRequest)

    expect(response.status).toBe(204)

    mock.mockRestore()
  })

  it("should return 201 if exam text was returned from correctly", async () => {
    const mock = jest.spyOn(gptService, "ask").mockResolvedValue("ahora_devuleve_correctamente")

    // construimos un Request nativo
    const request = new Request("http://localhost:3000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyValid),
    })

    // lo envolvemos en un NextRequest
    const nextRequest = new NextRequest(request)

    const response = await POST_EXAMS(nextRequest)

    expect(response.status).toBe(201)

    mock.mockRestore()
  })
})

describe("POST /exams/by-exam-id/[examId]/check", () => {
  it("should return 404 if exam does not exist", async () => {
    const getExamByIdMock = jest.spyOn(examService, "getExamById").mockResolvedValue(null)

    const response = await checkExam([""], "any-exam-id")

    if (!response.errorResponse) {
      throw new Error("Expected an errorResponse but got successResponse")
    }

    const json: ApiResponseError = await response.errorResponse

    expect(json.success).toBe(false)
    expect(json.error.code).toBe("EXAM_NOT_FOUND")
    expect(response.status).toBe(404)

    getExamByIdMock.mockRestore()
  })

  it("should return 200 if the exam was graded", async () => {
    const getExamByIdMock = jest.spyOn(examService, "getExamById").mockResolvedValue(examResponse)
    const gptServiceAskMock = jest
      .spyOn(gptService, "ask")
      .mockResolvedValue("Resultados del examen dado por gpt.")

    const response = await checkExam([""], "any-exam-id")

    if (!response.successResponse) {
      throw new Error("Expected an successResponse but got errorResponse")
    }

    const json: ApiResponseSuccess<string> = await response.successResponse

    expect(json.success).toBe(true)
    expect(response.status).toBe(200)

    getExamByIdMock.mockRestore()
    gptServiceAskMock.mockRestore()
  })
})
