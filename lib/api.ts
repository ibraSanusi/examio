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

### Requisitos de Formato (IMPORTANTE)
1. Usa **Markdown válido** (sin bloques de código).
2. Estructura en secciones: opción múltiple, verdadero/falso, respuesta corta y ensayo.
3. Marca las respuestas de la siguiente forma para que puedan transformarse en inputs HTML:
   - **Opción múltiple**: lista con prefijos "- [ ]" para respuestas incorrectas y "- [x]" para la correcta (checkbox).
   - **Verdadero/Falso**: usa "- ( )" para falso y "- (x)" para verdadero (radio).
   - **Respuesta corta**: coloca un tag '<ShortAnswer />' donde el estudiante debe escribir (textarea).
   - **Ensayo**: coloca un tag '<Essay />' donde el estudiante debe escribir un texto más largo (textarea grande).
4. No incluyas explicación de las respuestas, solo márcalas con [x].
5. Lenguaje claro y adaptado al nivel del curso.

### Ejemplo de formato esperado

## Sección 1: Opción Múltiple
1. ¿Cuál es el resultado de 8 + 5?
- [ ] 12
- [x] 13
- [ ] 14
- [ ] 15

## Sección 2: Verdadero/Falso
2. 7 + 3 es igual a 10.
- (x) Verdadero
- ( ) Falso

## Sección 3: Respuesta Corta
3. Realiza la siguiente suma: 23 + 17 =
<ShortAnswer />

## Sección 4: Ensayo
4. Explica cómo resolver una resta.
<Essay />

---
Genera el examen siguiendo exactamente este formato.
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
