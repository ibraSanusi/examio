"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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

  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{exam}</ReactMarkdown>
    </div>
  )
}
