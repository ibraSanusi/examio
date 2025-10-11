"use client"

import Image from "next/image"
import { Shapes } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Button from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

interface Props {
  className?: string
}

export default function Header({ className }: Props) {
  const { data: session } = useSession()

  const handleSessionButtonAction = () => {
    if (!session)
      return signIn(
        "discord",
        {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
        { callbackUrl: "/" },
      )

    return signOut()
  }

  const buttonText = session ? "Cerrar sesión" : "Iniciar sesión"

  return (
    <header className={cn("flex w-full flex-row items-center justify-between", className)}>
      <div className="flex flex-row items-center gap-1">
        <Link className="flex cursor-pointer flex-row items-end gap-2" href={"/"}>
          <Image
            src="/images/icon.png"
            alt="Icono de un alumno estudiando."
            width={34}
            height={34}
          />
          <span className="text-xl">examio</span>
        </Link>

        <span className="decoration-yellow self-end px-2 py-1 text-sm italic underline decoration-2">
          beta
        </span>
      </div>
      <div className="button-after relative">
        <Button
          className="hover:bg-purple bg-yellow flex translate-x-1.5 -translate-y-1.5 transform cursor-pointer flex-row items-center gap-2 rounded-[4px] p-2 font-semibold text-white hover:translate-0 active:scale-90"
          onClick={handleSessionButtonAction}
        >
          {buttonText}
          <Shapes />
        </Button>
      </div>
    </header>
  )
}
