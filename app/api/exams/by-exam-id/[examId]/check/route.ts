import { generateErrorResponse, generateSuccessResponse, getCorrectionPrompt } from "@/lib/api"
import { examService } from "@/services/api/examService"
import { gptService } from "@/services/api/gptService"
import { ApiResponseError, ApiResponseSuccess, ByExamIdParamsType } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const CheckRequestSchema = z.object({
  answers: z.string().array(),
})

type BodyType = z.infer<typeof CheckRequestSchema>

export async function POST(req: NextRequest, { params }: ByExamIdParamsType) {
  const { examId } = await params

  const body: BodyType = await req.json()
  const bodyParsed = CheckRequestSchema.safeParse(body)

  if (!bodyParsed.success) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "INVALID_DATA",
      "El formato del body no es valido.",
    )

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const exam = await examService.getExamById(examId)

  if (!exam) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "EXAM_NOT_FOUND",
      "No se encontró el exámen.",
    )

    return NextResponse.json(errorResponse, { status: 404 })
  }

  const { answers } = body

  const prompt = getCorrectionPrompt(exam.chat_examen, answers)

  // Comprobar corrección con gpt
  const correction = await gptService.ask(prompt)

  // TODO: guardar la nota del examen.

  const successResponse: ApiResponseSuccess<string> = generateSuccessResponse(
    correction,
    "Se comprobo el resultado del examen correctamente.",
  )

  return NextResponse.json(successResponse, { status: 200 })
}
