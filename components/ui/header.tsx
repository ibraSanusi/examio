"use client"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import MenuButton from "@/components/MenuButton"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"

interface Props {
  className?: string
}

export default function Header({ className }: Props) {
  const [open, setOpen] = useState(false)
  const isOpen = open

  return (
    <header className={cn("flex w-full flex-row items-center justify-between", className)}>
      <Link className="cursor-pointer" href={"/"}>
        <Image src="/images/icon.png" alt="Icono de un alumno estudiando." width={34} height={34} />
      </Link>
      <MenuButton onClick={() => setOpen((prev) => !prev)}>
        {isOpen ? <X /> : <Menu />}
        <span>{isOpen ? "Close" : "Open"}</span>
      </MenuButton>
    </header>
  )
}
