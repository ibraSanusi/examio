"use server"

import { generatePrompt, getCorrectionPrompt } from "@/lib/api"
import { gptService } from "@/services/api/gptService"
import { ExamState } from "@/types/exam"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

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

  const maxAge: number = Date.now() + 86400000 // un día
  console.log(maxAge)

  const cookieStore = await cookies()
  cookieStore.set("exam", output_text, { httpOnly: true, maxAge })

  // restar peticiones al usuario
  const cookieExamsLeft = cookieStore.get("exams-requests-left")?.value
  const parsedExamsRequestLeft: number = Number.parseInt(cookieExamsLeft || "3") - 1

  const examsLeft: string = parsedExamsRequestLeft.toString()

  if (parsedExamsRequestLeft > 0)
    cookieStore.set("exams-requests-left", examsLeft, { httpOnly: true, maxAge })

  if (parsedExamsRequestLeft < 1) {
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

export async function getScore(formData: FormData, examContent: string) {
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

  console.log(answers)
  console.log(examContent)

  const prompt = getCorrectionPrompt(examContent, answers)

  // Comprobar corrección con gpt
  const score = await gptService.ask(prompt)

  console.log(score)

  return score

  // TODO: guardar la nota del examen.
}
