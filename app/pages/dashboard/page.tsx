import { examService } from "@/services/api/examService"
import Card from "@/app/pages/dashboard/components/Card"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { userService } from "@/services/api/userService"
import { authOptions } from "@/lib"
import { serialize, type SerializeResult } from "next-mdx-remote-client/serialize"

export default async function DashboardPage() {
  const user = await getServerSession(authOptions)
  if (!user?.user?.email) redirect("/")

  const userEmail = user.user.email
  const userId = await userService.getUserIdFromEmail(userEmail)
  const exams = await examService.getExamsByUserId(userId)

  const mdxSources: SerializeResult[] = await Promise.all(
    exams.map((exam) => serialize({ source: exam.chat_examen + exam.correction })),
  )

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {mdxSources.map((mdxSource, index) => {
        return <Card exam={exams[index]} key={index} mdxSource={mdxSource} />
      })}
    </section>
  )
}
