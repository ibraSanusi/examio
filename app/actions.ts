"use server"

import { generatePrompt } from "@/lib/api"
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

  const cookieStore = await cookies()
  cookieStore.set("exam", output_text, { httpOnly: true, expires: 60 * 60 })

  redirect("/exam")
}
