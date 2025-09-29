import { cookies } from "next/headers"
import { ShortAnswer, Essay } from "@/app/pages/exam/components/MdxComponents"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

const components = {
  ShortAnswer,
  Essay,
}

export default async function ExamPage() {
  const cookieStore = await cookies()
  const headerCookieExam = cookieStore.get("exam")
  const examContent = headerCookieExam?.value

  if (!examContent) {
    return <p className="text-gray-500">Cargando examen...</p>
  }

  console.log("En ExamPage: ", examContent)

  return (
    <MDXRemote
      source={examContent}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
    />
  )
}
