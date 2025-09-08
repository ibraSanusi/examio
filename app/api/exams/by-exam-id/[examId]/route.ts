import { prisma } from "@/lib"
import { ApiResponseError, ApiResponseSuccess } from "@/types/api"
import { Exam } from "@/types/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { examId: string } },
): Promise<NextResponse> {
  try {
    const { examId } = await params

    const exam = await prisma.exam.findUnique({
      where: { id_examen: examId },
    })

    if (!exam) {
      const errorResponse: ApiResponseError = {
        success: false,
        error: {
          code: "NO_RESULTS_FOUND",
          message: "No exam with that id found",
        },
      }
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const successResponse: ApiResponseSuccess<Exam> = {
      success: true,
      message: "Examen recuperado correctamente.",
      data: exam,
    }

    return NextResponse.json(successResponse, { status: 200 })
  } catch (error) {
    console.log(error)
    const errorResponse: ApiResponseError = {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error inesperado.",
      },
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
