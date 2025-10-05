"use client"

import { useEffect, useState } from "react"
import { MDXClient, SerializeResult } from "next-mdx-remote-client"
import {
  ShortAnswer,
  Essay,
  MultipleChoice,
  TrueFalse,
} from "@/app/pages/exam/components/MdxComponents"
import { Exam } from "@/types/models"

type ExamsCardProps = {
  mdxSource: SerializeResult
  exam: Exam
}

const components = {
  ShortAnswer,
  Essay,
  MultipleChoice,
  TrueFalse,
}

export default function Card({ mdxSource, exam }: ExamsCardProps) {
  const [openExamModal, setOpenExamModal] = useState(false)
  const [createdAt, setCreatedAt] = useState<string>()

  useEffect(() => {
    setCreatedAt(exam.createdAt.toLocaleDateString())
  }, [])

  const handleModalClick = () => {
    setOpenExamModal((prev) => !prev)
  }

  if ("error" in mdxSource) {
    return <p>Error al procesar examen</p>
  }

  return (
    createdAt && (
      <article
        onClick={handleModalClick}
        className="bg-purple flex h-56 items-center justify-center rounded-md"
      >
        <h2 className="text-4xl font-bold text-white">{createdAt}</h2>

        <dialog open={openExamModal} className="absolute top-0 left-0 m-auto w-full max-w-7xl p-8">
          <MDXClient {...mdxSource} components={components} />
        </dialog>
      </article>
    )
  )
}
