import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "bg-purple hover:bg-yellow cursor-pointer rounded-lg p-2 font-semibold text-white",
        className,
      )}
    >
      {children}
    </button>
  )
}
