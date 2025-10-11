"use client"

import { useState } from "react"

export function ShortAnswer({ id }: { id: string }) {
  const [value, setValue] = useState("")
  return (
    <input
      name={id}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Tu respuesta..."
      className="rounded border p-2"
    />
  )
}

export function Essay({ id }: { id: string }) {
  const [value, setValue] = useState("")
  return (
    <textarea
      name={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Escribe aquí tu ensayo..."
      className="h-32 w-full rounded border p-2"
    />
  )
}

type Option = {
  label: string
}

export function MultipleChoice({ options, id }: { options: Option[]; id: string }) {
  return (
    <div>
      {options.map((opt, idx) => (
        <div key={idx} className="flex flex-row items-center gap-2">
          <input className="peer" id={id + idx} name={id} type="checkbox" value={opt.label} />
          <label htmlFor={id + idx} className="peer-checked:text-purple block">
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export function TrueFalse({ id }: { id: string }) {
  const trueKey = `verdadero-${id}`
  const falseKey = `falso-${id}`
  return (
    <div className="space-x-2">
      <div className="flex flex-row gap-2">
        <input className="peer" type="radio" id={trueKey} name={id} value="true" />
        <label
          htmlFor={trueKey}
          className="hover:text-yellow peer-checked:text-purple hover:underline"
        >
          Verdadero
        </label>
      </div>
      <div className="flex flex-row gap-2">
        <input className="peer" type="radio" id={falseKey} name={id} value="false" />
        <label
          htmlFor={falseKey}
          className="hover:text-yellow peer-checked:text-purple hover:underline"
        >
          Falso
        </label>
      </div>
    </div>
  )
}
