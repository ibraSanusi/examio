// tests/exams.test.ts
import { ApiResponseError } from "@/types/api"
import { NextRequest } from "next/server"
import { POST as POST_EXAMS } from "@/app/api/exams/route"
// import { POST as POST_CHECK } from "@/app/api/exams/by-exam-id/[examId]/check/route"
import { gptService } from "@/services/api/gptService"
import { BODY_NOT_VALID, bodyValid } from "./constants"

describe("POST /exams", () => {
  it("should return 400 if data not valid", async () => {
    // construimos un Request nativo
    const request = new Request("http://localhost:3000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(BODY_NOT_VALID),
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
