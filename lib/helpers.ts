export function formatCreateExamBody(formData: FormData) {
  const entries = formData.entries()
  const exam = { grade: "", subject: "", topics: [] as string[] }

  for (const [key, value] of entries) {
    exam.subject = exam.subject || key
    exam.topics.push(value.toString())
  }

  return exam
}

export function formatNumberEU(x: number) {
  const calculated = x / 100
  const formatted = calculated.toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  return formatted
}
