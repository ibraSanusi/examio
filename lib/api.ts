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
