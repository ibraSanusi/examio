import { generateErrorResponse, generatePrompt, generateSuccessResponse } from "@/lib/api"
import { gptService } from "@/services/api/gptService"
import { ApiResponseError, ApiResponseSuccess } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const ChatRequestSchema = z.object({
  grade: z.string(),
  subject: z.string(),
  topics: z.string().array(),
})

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json()
  const bodyParsed = ChatRequestSchema.safeParse(body)

  if (!bodyParsed.success) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "DATA_NOT_VALID",
      "Los datos enviados no son válidos.",
    )

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const { grade, subject, topics } = bodyParsed.data

  const prompt = generatePrompt({ grade, subject, topics })

  const output_text = await gptService.ask(prompt)

  if (!output_text) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "NO_EXAM_GENERATED",
      "El examen no se pudo generar.",
    )
    return NextResponse.json(errorResponse, { status: 204 })
  }

  console.log(output_text)
  const successResponse: ApiResponseSuccess<string> = generateSuccessResponse<string>(
    output_text,
    "Examen generado correctamente.",
  )

  return NextResponse.json(successResponse, { status: 201 })
}
