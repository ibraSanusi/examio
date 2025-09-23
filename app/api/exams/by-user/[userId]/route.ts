import { examService } from "@/services/api/examService"
import { ApiResponse, ApiResponseError } from "@/types/api"
import { Exam } from "@/types/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<Response> {
  const { userId } = await params

  if (!userId) {
    return NextResponse.json<ApiResponseError>(
      {
        success: false,
        error: {
          code: "USER_ID_REQUIRED",
          message: "Se requiere el ID del usuario",
        },
      },
      { status: 400 },
    )
  }

  const exams = await examService.getExamsByUserId(userId)

  if (!exams.length) {
    return NextResponse.json<ApiResponse<Exam[]>>(
      {
        success: true,
        data: [],
        message: "No se encontraron exámenes para este usuario.",
      },
      { status: 200 },
    )
  }

  return NextResponse.json<ApiResponse<Exam[]>>(
    {
      success: true,
      data: exams,
      message: "Se han obtenido correctamente los exámenes.",
    },
    { status: 200 },
  )
}
