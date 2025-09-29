import { checkExam, generateErrorResponse } from "@/lib/api"
import { ApiResponseError, ByExamIdParamsType } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const CheckRequestSchema = z.object({
  answers: z.string().array(),
})

export type BodyType = z.infer<typeof CheckRequestSchema>

export async function POST(req: NextRequest, { params }: ByExamIdParamsType) {
  const { examId } = await params

  const body: BodyType = await req.json()

  const bodyParsed = CheckRequestSchema.safeParse(body)

  if (!bodyParsed.success) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "INVALID_DATA",
      "El formato del body no es valido.",
    )

    return { errorResponse, status: 400 }
  }

  const answers = body.answers

  const examCheckResponse = await checkExam(answers, examId)

  const status = examCheckResponse.status
  const response = examCheckResponse.errorResponse ?? examCheckResponse.successResponse

  return NextResponse.json(response, { status })
}
