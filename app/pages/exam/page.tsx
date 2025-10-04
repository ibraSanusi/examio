import { cookies } from "next/headers"
import {
  ShortAnswer,
  Essay,
  MultipleChoice,
  TrueFalse,
} from "@/app/pages/exam/components/MdxComponents"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { examine } from "@/app/actions"
import { redirect } from "next/navigation"

const components = {
  ShortAnswer,
  Essay,
  MultipleChoice,
  TrueFalse,
}

export default async function ExamPage() {
  const cookieStore = await cookies()
  const headerCookieExam = cookieStore.get("exam")
  const examContent = headerCookieExam?.value

  if (!examContent) {
    redirect("/")
  }

  const checkExam = async (formData: FormData) => {
    "use server"
    const cookieStore = await cookies()
    const correction = await examine(formData, examContent)

    if (typeof correction !== "string") {
      const message = correction.error?.message ?? "Error interno"
      cookieStore.set("correction-error", message, { httpOnly: true })
      redirect("/correction")
    }

    cookieStore.set("correction", correction, { httpOnly: true, expires: 60 * 60 })

    redirect("/correction")
  }

  return (
    <form action={checkExam}>
      <MDXRemote
        source={examContent}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
      <button
        className="bg-purple hover:bg-yellow rounded-lg p-2 font-semibold text-white"
        type="submit"
      >
        Enviar
      </button>
    </form>
  )
}
