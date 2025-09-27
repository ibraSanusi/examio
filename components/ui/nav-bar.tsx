import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function NavBar({ children }: Props) {
  return (
    <nav className="fixed top-[calc(100%-100px)] left-1/2 m-auto flex w-[300px] max-w-4xl -translate-x-1/2 transform justify-between rounded-md bg-black px-4 py-2">
      {children}
    </nav>
  )
}
