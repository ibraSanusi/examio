import { ApiResponseError, ApiResponseSuccess } from "@/types/api"

export function generatePrompt({
  grade,
  subject,
  topics,
}: {
  grade: string
  subject: string
  topics: string[]
}) {
  return `
    Genera un examen completo con la siguiente información:

    - Curso: ${grade}
    - Asignatura: ${subject}
    - Temas: ${topics.join(", ")}

    Requisitos:
    1. Mezcla de preguntas: opción múltiple, verdadero/falso, respuesta corta y ensayo.
    2. Incluye respuestas correctas.
    3. Formato claro con numeración y secciones.
    4. Contenido relevante a los temas.
    5. Adecuado al nivel del curso.
    6. Texto plano, sin Markdown ni bloques de código.

    Opcional: incluye una breve introducción o instrucciones al inicio del examen.
    `.trim()
}

export function getCorrectionPrompt(examQuestions: string, answers: string[]): string {
  return `
        Corrige el siguiente examen de primaria:

        Examen:
        ${examQuestions}

        Respuestas del alumno:
        ${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}

        Requisitos:
        1. Evalúa cada respuesta y determina si es correcta o incorrecta comparando estrictamente con la respuesta correcta.
        2. Asigna 1 punto por respuesta correcta y 0 por incorrecta.
        3. Devuelve la corrección numerada por pregunta, indicando la respuesta del alumno y la respuesta correcta.
        4. No incluyas explicaciones, comentarios ni justificaciones.
        5. El alumno no necesita justificar nada.
        6. Las preguntas pueden ser de cualquier curso o asignatura de primaria: matemáticas, lengua, ciencias, historia, geografía, etc.

        IMPORTANTE: Compara siempre la respuesta del alumno con la respuesta correcta de forma estricta y lógica. Marca Correcta solo si coincide exactamente.

        Solo responde con la corrección y el puntaje total en texto plano.
  `.trim()
}

export function generateErrorResponse(code: string, message: string): ApiResponseError {
  return {
    success: false,
    error: {
      code,
      message,
    },
  }
}

export function generateSuccessResponse<T>(data: T, message?: string): ApiResponseSuccess<T> {
  return {
    success: true,
    data,
    ...(message ? { message } : {}),
  }
}
