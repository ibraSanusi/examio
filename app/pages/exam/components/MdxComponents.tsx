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
        <label key={idx} className="block">
          <input name={id} type="checkbox" value={opt.label} /> {opt.label}
        </label>
      ))}
    </div>
  )
}

export function TrueFalse({ id }: { id: string }) {
  return (
    <div>
      <label>
        <input type="radio" name={id} value="true" /> Verdadero
      </label>
      <label>
        <input type="radio" name={id} value="false" /> Falso
      </label>
    </div>
  )
}
