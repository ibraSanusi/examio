import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

export const gptService = {
  ask: async (prompt: string): Promise<string> => {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    })

    return response.output_text
  },
}
