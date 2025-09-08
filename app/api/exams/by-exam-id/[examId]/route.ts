import { prisma } from "@/lib"
import { ApiResponseError, ApiResponseSuccess } from "@/types/api"
import { Exam } from "@/types/models"
import { NextRequest, NextResponse } from "next/server"

type ParamsType = {
  params: {
    examId: string
  }
}

export async function GET(request: NextRequest, { params }: ParamsType): Promise<NextResponse> {
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

export async function DELETE(request: NextRequest, { params }: ParamsType) {
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
    await prisma.exam.delete({
      where: {
        id_examen: examId,
      },
    })

    const successResponse: ApiResponseSuccess<null> = {
      success: true,
      message: "Examen eliminado correctamente.",
      data: null,
    }

    return NextResponse.json(successResponse, { status: 200 })
  } catch (error) {
    console.log(error)
    const errorResponse: ApiResponseError = {
      success: false,
      error: {
        code: "EXAM_NOT_FOUND",
        message: "No se pudo eliminar el examen. Puede que no exista.",
      },
    }
    return NextResponse.json(errorResponse, { status: 404 })
  }
}
