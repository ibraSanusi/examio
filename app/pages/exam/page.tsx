import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ExamPage() {
  const cookieStore = await cookies()
  const exam = cookieStore.get("exam")

  if (!exam?.value) return redirect("/")
  if (!exam?.value) return <p className="text-2xl text-red-500">No hay examen.</p>
  console.log("En ExamPage: ", exam)
  return exam && <div>{exam.value}</div>
}
