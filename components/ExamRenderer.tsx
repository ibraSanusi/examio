"use client"

import { checkExam } from "@/app/actions"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { components } from "./ReactMarkdownComponents"

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
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {exam}
      </ReactMarkdown>

      <input
        className="bg-light-black hover:bg-purple rounded-md p-2 text-white transition-colors"
        type="submit"
      />
    </form>
  )
}
