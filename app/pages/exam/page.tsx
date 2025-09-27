import ExamRenderer from "@/components/ExamRenderer"
import { cookies } from "next/headers"

export default async function ExamPage() {
  const cookieStore = await cookies()
  const headerCookieExam = cookieStore.get("exam")
  const exam = headerCookieExam?.value

  console.log("En ExamPage: ", exam)
  return <ExamRenderer markdown={exam} />
}
