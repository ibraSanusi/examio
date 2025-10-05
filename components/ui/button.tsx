import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

export default function Button({
  children,
  className,
}: ButtonProps & ButtonHTMLAttributes<ButtonProps>) {
  return (
    <button
      className={cn("bg-purple hover:bg-yellow rounded-lg p-2 font-semibold text-white", className)}
    >
      {children}
    </button>
  )
}
