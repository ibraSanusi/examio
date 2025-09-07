import { prisma } from "@/lib"
import { ApiResponse } from "@/types/api"
import { Exam } from "@/types/models"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
): Promise<Response> {
  const { userId } = await params

  if (!userId) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      error: {
        code: "USER_ID_REQUIRED",
        message: "Se requiere el ID del usuario",
      },
    }
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Conseguir todos los exámenes de userId.
  const exams = await prisma.exam.findMany({
    where: {
      userId,
    },
  })

  // Respuesta satisfactoria.
  const successResponse: ApiResponse<Exam[]> = {
    success: true,
    data: exams,
    message: "Se han obtenido correctamente los exámenes.",
  }

  return new Response(JSON.stringify(successResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json()
  const { name } = body

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name }

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
