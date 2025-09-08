import OpenAI from "openai"

interface ChatRequest {
  grade: string
  subject: string
  topics: string[]
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const { grade, subject, topics }: ChatRequest = body

  const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

  const prompt = `
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

  // Llamada simplificada para gpt-4o-mini
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  })

  // response.output_text contiene el texto generado
  console.log(response.output_text)

  return new Response(JSON.stringify({ examen: response.output_text }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}
