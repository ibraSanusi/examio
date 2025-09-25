"use client"

import { checkExam } from "@/app/actions"
import { useRouter } from "next/navigation"
import { FormEvent, ReactNode, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type ExamRendererProps = {
  markdown: string | undefined
}

export default function ExamRenderer({ markdown }: ExamRendererProps) {
  const router = useRouter()
  const [exam, setExam] = useState<string | null>(null)

  // Guardar el examen cuando llega por props
  useEffect(() => {
    if (markdown) {
      window.localStorage.setItem("exam", markdown)
      setExam(markdown)
    } else {
      const savedExam = window.localStorage.getItem("exam")
      if (savedExam) {
        setExam(savedExam)
      } else {
        router.push("/")
      }
    }
  }, [markdown, router])

  if (!exam) {
    return <p className="text-gray-500">Cargando examen...</p>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    checkExam(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          li({ children }) {
            // Extraemos el texto plano del <li>
            const raw = String(children)

            // console.log({ children })
            // console.log({ raw })

            return formatReactMarkdown(raw, children)
          },
        }}
      >
        {exam}
      </ReactMarkdown>

      <input type="submit" />
    </form>
  )
}

function formatReactMarkdown(raw: string, children: ReactNode) {
  //   console.log("typeof de children: ", typeof children)
  console.log({ children })

  // Caso: checkbox
  if (raw.startsWith("[object Object]") || raw.startsWith("[x]")) {
    const checked = raw.startsWith("[x]")
    const label = raw
      .replace(/\[object Object\],?\s*/g, "")
      .replace(/^,?\s*/, "")
      .trim()
    return (
      <li className="w-fit list-none">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked={checked} />
          {label}
        </label>
      </li>
    )
  }

  // Caso: radio
  if (raw.startsWith("( )") || raw.startsWith("(x)")) {
    const checked = raw.startsWith("(x)")
    const label = raw.replace("( )", "").replace("(x)", "").trim()
    return (
      <li className="w-fit list-none">
        <label className="flex items-center gap-2">
          <input type="radio" name="radio-group" defaultChecked={checked} />
          {label}
        </label>
      </li>
    )
  }

  // Caso: ShortAnswer
  if (raw.includes("<ShortAnswer />")) {
    if (!Array.isArray(children)) return
    const sentence = children && (children[1].props.children as string)
    return (
      <li className="w-fit">
        <p>{sentence}</p>
        <textarea
          rows={2}
          className="w-full rounded border p-2"
          placeholder="Redacta tu respuesta aquí..."
        />
      </li>
    )
  }

  // Caso: Essay
  if (raw.includes("<Essay />")) {
    if (!Array.isArray(children)) return
    const sentence = children && (children[1].props.children as string)
    return (
      <li className="w-fit">
        <p>{sentence}</p>
        <textarea
          rows={6}
          className="w-full rounded border p-2"
          placeholder="Redacta tu respuesta aquí..."
        />
      </li>
    )
  }

  // Fallback normal
  return <li>{children}</li>
}
