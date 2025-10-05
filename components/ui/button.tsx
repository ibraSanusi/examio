import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

export default function Button({ children }: ButtonProps & ButtonHTMLAttributes<ButtonProps>) {
  return (
    <button className="bg-purple hover:bg-yellow rounded-lg p-2 font-semibold text-white">
      {children}
    </button>
  )
}
