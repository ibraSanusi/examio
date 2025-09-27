import { ReactNode } from "react"
import StainIcon from "./stain-icon"

interface Props {
  children: ReactNode
}

export default function NavBarItem({ children }: Props) {
  return (
    <div className="group relative rounded-xs p-2 text-white">
      <StainIcon className="text-purple absolute top-1/2 left-1/2 -z-10 size-16 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
      <span className="">{children}</span>
    </div>
  )
}
