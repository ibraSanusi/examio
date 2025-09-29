import { ApiResponseError, ApiResponseSuccess } from "@/types/api"
import { examService } from "@/services/api/examService"
import { gptService } from "@/services/api/gptService"

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

### Requisitos de Formato (IMPORTANTE)
1. Usa **Markdown válido** (sin bloques de código).
2. Estructura en secciones: opción múltiple, verdadero/falso, respuesta corta y ensayo.
3. Usa los siguientes componentes (cada pregunta debe tener un \`id\` único en kebab-case o snake_case):
   - **Opción múltiple**: \`<MultipleChoice id="pregunta-1" options={[{ "label": "X" }, ...]} />\`
   - **Verdadero/Falso**: \`<TrueFalse id="pregunta-2" />\`
   - **Respuesta corta**: \`<ShortAnswer id="pregunta-3" />\`
   - **Ensayo**: \`<Essay id="pregunta-4" />\`
4. El prop \`id\` servirá para agrupar inputs (radio/checkbox) y diferenciar las respuestas de cada pregunta.
5. No incluyas explicaciones, solo marca las respuestas correctas con \`correct: true\`.
6. Lenguaje claro y adaptado al nivel del curso.

### Ejemplo

## Sección 1: Opción Múltiple
1. ¿Cuál es el resultado de 8 + 5?
<MultipleChoice id="pregunta-1" options={[{"label":"12"},{"label":"13"},{"label":"14"},{"label":"15"}]} />

## Sección 2: Verdadero/Falso
2. 7 + 3 es igual a 10.
<TrueFalse id="pregunta-2" answer="true" />

## Sección 3: Respuesta Corta
3. Realiza la siguiente suma: 23 + 17 =
<ShortAnswer id="pregunta-3" />

## Sección 4: Ensayo
4. Explica cómo resolver una resta.
<Essay id="pregunta-4" />

---
Genera el examen siguiendo exactamente este formato.
  `.trim()
}

type CorrectionAnswerType = {
  [key: string]: string
}

export function getCorrectionPrompt(
  examQuestions: string,
  answers: CorrectionAnswerType[],
): string {
  return `
        Corrige el siguiente examen de primaria:

        Examen:
        ${examQuestions}

        Respuestas del alumno:
        ${answers.map((answer) => {
          return Object.entries(answer)
            .map(([key, value]) => `${key}. ${value}`)
            .join("\n")
        })}

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

export async function checkExam(answers: CorrectionAnswerType[], examId: string) {
  const exam = await examService.getExamById(examId)

  if (!exam) {
    const errorResponse: ApiResponseError = generateErrorResponse(
      "EXAM_NOT_FOUND",
      "No se encontró el exámen.",
    )

    return { errorResponse, status: 404 }
  }

  const prompt = getCorrectionPrompt(exam.chat_examen, answers)

  // Comprobar corrección con gpt
  const correction = await gptService.ask(prompt)

  // TODO: guardar la nota del examen.

  const successResponse: ApiResponseSuccess<string> = generateSuccessResponse(
    correction,
    "Se comprobo el resultado del examen correctamente.",
  )

  return { successResponse, status: 200 }
}
