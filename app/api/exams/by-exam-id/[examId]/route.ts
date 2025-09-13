import { examService } from "@/services/examService"

import { ApiResponseError, ApiResponseSuccess, ByExamIdParamsType } from "@/types/api"
import { Exam } from "@/types/models"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: ByExamIdParamsType,
): Promise<NextResponse> {
  try {
    const { examId } = await params

    if (!examId) {
      const errorResponse: ApiResponseError = {
        success: false,
        error: {
          code: "EXAM_ID_REQUIRED",
          message: "Se requiere el ID del examen",
        },
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const exam = await examService.getExamById(examId)

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

export async function DELETE(request: NextRequest, { params }: ByExamIdParamsType) {
  const { examId } = await params

  if (!examId) {
    const errorResponse: ApiResponseError = {
      success: false,
      error: {
        code: "EXAM_ID_REQUIRED",
        message: "Se requiere el ID del examen",
      },
    }
    return NextResponse.json(errorResponse, { status: 400 })
  }

  try {
    const deleted = await examService.deleteExamById(examId)

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EXAM_NOT_FOUND",
            message: "No se pudo eliminar el examen. Puede que no exista.",
          },
        },
        { status: 404 },
      )
    }

    const successResponse: ApiResponseSuccess<string> = {
      success: true,
      message: "Examen eliminado correctamente.",
      data: deleted.id_examen,
    }

    return NextResponse.json(successResponse, { status: 200 })
  } catch (error) {
    console.log(error)
    const errorResponse: ApiResponseError = {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Error interno del servidor." },
    }
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
