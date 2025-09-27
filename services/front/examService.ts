// front/services/examService.ts

import { formatCreateExamBody } from "@/lib/helpers"

export const examService = {
  async createExam(formData: FormData): Promise<Response> {
    const exam = formatCreateExamBody(formData)
    return await fetch("/api/exams", { method: "POST", body: JSON.stringify(exam) })
  },
}
