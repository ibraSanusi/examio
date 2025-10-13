"use client"

import React, { ReactNode, useEffect, useState } from "react"
import StainIcon from "./stain-icon"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PATHNAMES = {
  home: "/",
  dashboard: "/dashboard",
  settings: "/settings",
}

export default function NavBar() {
  const [showMenuBar, setShowMenubar] = useState(false)

  const handleMenuBarVisibility = () => {
    setShowMenubar(true)
  }

  useEffect(() => {
    if (!showMenuBar) return
    setTimeout(() => setShowMenubar(false), 5000)
  }, [showMenuBar])

  return showMenuBar ? (
    <nav className="fixed top-[calc(100%-100px)] left-1/2 m-auto flex w-[300px] max-w-4xl -translate-x-1/2 transform justify-between rounded-md bg-black px-4 py-2">
      <NavBarItem path={PATHNAMES.home} href="/">
        Home
      </NavBarItem>
      <NavBarItem path={PATHNAMES.dashboard} href="/dashboard">
        Exams
      </NavBarItem>
      <NavBarItem path={PATHNAMES.settings} href="/settings">
        Settings
      </NavBarItem>
    </nav>
  ) : (
    <button
      onClick={handleMenuBarVisibility}
      className="repeat-infinite animate-ball-alert fixed top-[calc(100%-58px)] right-[calc(100%-60px)] size-10 rounded-full bg-black duration-[5000s]"
    ></button>
  )
}

interface NavBarItemProps {
  children: ReactNode
  path: string
  href: string
}

function NavBarItem({ children, path, href }: NavBarItemProps) {
  const currentPath = usePathname()

  const isInCurrentPath = path === currentPath

  return (
    <Link href={href} className="group relative rounded-xs p-2 text-white">
      <StainIcon
        className={`absolute top-1/2 left-1/2 -z-10 size-16 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-70 ${isInCurrentPath ? "text-purple opacity-70" : "text-yellow"}`}
      />
      <span>{children}</span>
    </Link>
  )
}
