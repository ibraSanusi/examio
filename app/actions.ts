"use server"

import { generatePrompt, getCorrectionPrompt } from "@/lib/api"
import { gptService } from "@/services/api/gptService"
import { ExamState } from "@/types/exam"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { decreaseExamsRequests } from "@/lib/rate-limit"
import { getServerSession } from "next-auth"
import { examService } from "@/services/api/examService"
import { authOptions } from "@/lib"
import { userService } from "@/services/api/userService"

export async function createExam(previousState: ExamState, formData: FormData): Promise<ExamState> {
  if (!formData) {
    return { success: false, error: { code: "NO_FORM_DATA", message: "No hay formData." } }
  }

  const entries = formData.entries()
  const exam = { grade: "", subject: "", topics: [] as string[] }

  for (const [key, value] of entries) {
    exam.subject = exam.subject || key
    exam.topics.push(value.toString())
  }

  console.log(exam)

  const { grade, subject, topics } = exam

  const prompt = generatePrompt({ grade, subject, topics })

  console.log("Esperando la respuesta de gpt...")
  const output_text = await gptService.ask(prompt)

  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    maxAge: Date.now() + 86400000, // un día
  }

  const cookieStore = await cookies()
  cookieStore.set("exam", output_text, cookieOptions)

  const examsRequestLeft = await decreaseExamsRequests(cookieStore, cookieOptions)

  if (examsRequestLeft < 1) {
    return {
      success: false,
      error: {
        code: "LIMIT_REACHED",
        message:
          "Has alcanzado el número máximo de intentos. Si quieres seguir haciendo exámenes tienes que iniciar sesión.",
      },
    }
  }

  redirect("/exam")
}

export async function examine(
  formData: FormData,
  examContent: string,
): Promise<ExamState | string> {
  const entries = formData.entries()

  console.log(entries)
  const answers = []

  for (const [key, value] of entries) {
    if (key.includes("ACTION_ID")) continue

    const answer = {
      [key]: value,
    }
    answers.push(answer)
  }

  const prompt = getCorrectionPrompt(examContent, answers)

  // Comprobar corrección con gpt
  const correction = await gptService.ask(prompt)

  console.log(correction)

  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  // Guardar el examen y el resultado
  if (session && userEmail) {
    const userId = await userService.getUserIdFromEmail(userEmail)
    if (!userId) {
      return {
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "No se encontro al usuario.",
        },
      }
    }
    const exam = await examService.createExam(userId, examContent, correction)
    if (!exam) {
      return {
        success: false,
        error: {
          code: "EXAM_NOT_CREATED",
          message: "No se pudo guardar el examen.",
        },
      }
    }
  }

  return correction
}
