import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const examId = req.url.split("/").slice(-2)[0] // o usa URL parsing más seguro
  // Tu lógica aquí
  return NextResponse.json({ success: true, examId })
}
