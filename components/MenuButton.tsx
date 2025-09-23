import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export default function MenuButton({
  children,
  className,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "flex w-[114px] flex-row items-center justify-between rounded-2xl bg-black p-1 px-3.5 text-white",
        className,
      )}
    >
      {children}
    </button>
  )
}
