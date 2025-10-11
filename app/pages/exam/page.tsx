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
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import Button from "@/components/ui/button"
import { ReactNode } from "react"
import { MDXComponents } from "next-mdx-remote-client"

const components = {
  h2: ({ children }: { children: ReactNode }) => <h2 className="text-3xl">{children}</h2>,
  li: ({ children }: { children: ReactNode }) => (
    <li className="list-decimal text-xl">{children}</li>
  ),
  ShortAnswer,
  Essay,
  MultipleChoice,
  TrueFalse,
} satisfies MDXComponents

export default async function ExamPage() {
  const cookieStore = await cookies()
  const headerCookieExam = cookieStore.get("exam")
  const examContent = headerCookieExam?.value

  if (!examContent) {
    redirect("/")
  }

  const checkExam = async (formData: FormData) => {
    "use server"
    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      maxAge: Date.now() + 86400000, // un día
    }
    const cookieStore = await cookies()
    const correction = await examine(formData, examContent)

    if (typeof correction !== "string") {
      const message = correction.error?.message ?? "Error interno"

      cookieStore.set("correction-error", message, cookieOptions)
      redirect("/correction")
    }

    cookieStore.set("correction", correction, cookieOptions)

    redirect("/correction")
  }

  return (
    <form className="flex flex-col gap-4 px-4 py-3" action={checkExam}>
      <MDXRemote
        source={examContent}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
      <Button className="w-full max-w-24 self-end active:scale-90" type="submit">
        Enviar
      </Button>
    </form>
  )
}
