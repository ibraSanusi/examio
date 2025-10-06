import { authOptions } from "@/lib"
import { generateErrorResponse, generateSuccessResponse } from "@/lib/api"
import { userService } from "@/services/api/userService"

import { ApiResponseError, ApiResponseSuccess, UpdateUserType } from "@/types/api"
import { User } from "@/types/models"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function GET(): Promise<Response> {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "SESSION_NOT_EXISTS",
      "No hay ningún usuario en sesión.",
    )

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const userEmail = session.user.email

  const user: User | null = await userService.getUserDataFromEmail(userEmail)

  if (!user) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "USER_NOT_FOUND",
      "No se encontró al usuario.",
    )

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const successResponse: ApiResponseSuccess<User> = generateSuccessResponse<User>(
    user,
    "Examen generado correctamente.",
  )

  return NextResponse.json(successResponse, { status: 201 })
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const userId = await request.text()

  console.log("Se está eliminando el usuario...")

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "USER_ID_NOT_FOUNDED",
          message: "No se tiene la id del usuario.",
        },
      },
      { status: 400 },
    )
  }

  const deletedUser: User | null = await userService.delete(userId)

  if (!deletedUser) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "USER_NOT_DELETED",
          message: "No se pudo eliminar al usuario correctamente.",
        },
      },
      { status: 500 },
    )
  }

  const successResponse = generateSuccessResponse(
    deletedUser,
    "El usuario se eliminó correctamente",
  )

  return NextResponse.json(successResponse, { status: 200 })
}

const UpdateRequestSchema = z.object({
  userId: z.string(),
  values: z.object({
    name: z.string(),
    username: z.string(),
    age: z.string(),
    grade: z.string(),
  }),
})

type BodyType = z.infer<typeof UpdateRequestSchema>

export async function PUT(request: NextRequest): Promise<Response> {
  console.log("Se están actualizando los datos del usuario...")
  const body: BodyType = await request.json()
  const bodyParsed = UpdateRequestSchema.safeParse(body)

  console.log("data: ", bodyParsed.data)
  console.log("values: ", body.values)

  if (!bodyParsed.success) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "DATA_NOT_VALID",
      "Los datos enviados no son válidos.",
    )

    return NextResponse.json(errorResponse, { status: 400 })
  }

  const userId = bodyParsed.data.userId
  const { name, username, age, grade } = bodyParsed.data.values
  const valuesWithoutEmail: UpdateUserType = { name, username, age, grade }

  const updatedUser: User | null = await userService.update(userId, valuesWithoutEmail)

  if (!updatedUser) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "USER_NOT_DELETED",
          message: "No se pudo eliminar al usuario correctamente.",
        },
      },
      { status: 500 },
    )
  }

  const successResponse = generateSuccessResponse(
    updatedUser,
    "El usuario se actualizó correctamente",
  )

  return NextResponse.json(successResponse, { status: 200 })
}
