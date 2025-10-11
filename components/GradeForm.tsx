"use client"

import { MoveUpRight } from "lucide-react"
import { MouseEventHandler, useActionState, useState } from "react"
import CreatingExam from "./loading/CreatingExam"
import { ExamState, GradeFormProps } from "@/types/exam"
import { createExam } from "@/app/actions"

const initialState: ExamState = { success: true }

export default function GradeForm({ grade, i }: GradeFormProps) {
  const [state, action, isLoading] = useActionState(createExam, initialState)
  const [topics, setTopics] = useState<string[]>([])

  console.log("isLoading: ", isLoading)

  if (isLoading) return <CreatingExam />
  if (!state.success) return <p className="text-4xl text-red-500">{state.error?.message}</p>

  const handleCheck: MouseEventHandler<HTMLInputElement> = (e) => {
    const entryTopic = e.currentTarget.value
    const checked = e.currentTarget.checked

    if (!checked) {
      const topicsFiltered = topics.filter((topic) => topic !== entryTopic)
      setTopics(topicsFiltered)
      return
    }

    setTopics((prev) => [...prev, entryTopic])
  }

  return (
    <form className="space-y-6 pt-3" action={action}>
      <input
        type="checkbox"
        name={grade.name}
        defaultValue={grade.name}
        className="hidden"
        defaultChecked
      />
      {grade.topics.map((topic, j) => {
        const inputId = `${topic}-input-${i}-${j}`.split(" ").join("")
        const articleKey = `${topic}-fragment-${i}-${j}`.split(" ").join("")

        return (
          <article
            className="article-after pointer-events-auto relative flex w-full flex-col space-y-2"
            key={articleKey}
          >
            <input
              className="peer hidden"
              type="checkbox"
              value={topic}
              name={grade.name}
              id={inputId}
              onClick={handleCheck}
            />
            <label
              className="border-light-black bg-light-brown-gray peer-checked:bg-purple w-full translate-x-2 -translate-y-2 transform cursor-pointer rounded-lg border p-8 text-center text-black peer-checked:translate-0 peer-checked:text-white hover:translate-x-0 hover:translate-y-0"
              htmlFor={inputId}
            >
              {topic}
            </label>
          </article>
        )
      })}

      <div className="flex w-full flex-row justify-end">
        {topics.length > 0 && (
          <button
            type="submit"
            className="bg-light-brown-gray hover:bg-purple flex cursor-pointer flex-row items-center gap-2 rounded-lg border-black p-4 text-black hover:text-white"
          >
            Crear Examen
            <MoveUpRight />
          </button>
        )}
      </div>
    </form>
  )
}
