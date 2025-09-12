import { generatePrompt } from "@/lib/helpers"
import { gptService } from "@/services/gptService"
import { ApiResponseError } from "@/types/api"
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
    const errorResponse: ApiResponseError = {
      success: false,
      error: {
        code: "DATA_NOT_VALID",
        message: "Los datos enviados no son válidos.",
      },
    }

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const { grade, subject, topics } = bodyParsed.data

  const prompt = generatePrompt({ grade, subject, topics })

  const output_text = await gptService.ask(prompt)

  if (!output_text) {
    return new Response(null, { status: 204 })
  }

  console.log(output_text)

  return new Response(JSON.stringify({ examen: output_text }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
