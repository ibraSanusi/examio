"use client"

import { useState } from "react"

export function ShortAnswer() {
  const [value, setValue] = useState("")
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Tu respuesta..."
      className="rounded border p-2"
    />
  )
}

export function Essay() {
  const [value, setValue] = useState("")
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Escribe aquí tu ensayo..."
      className="h-32 w-full rounded border p-2"
    />
  )
}
