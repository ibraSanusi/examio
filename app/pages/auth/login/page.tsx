"use client"

import { signIn, useSession } from "next-auth/react"

export default function LoginPage() {
  const { data: session } = useSession()

  if (session) return <p>Ya estás logueado como {session.user?.name}</p>

  return (
    <div>
      <h1>Login con Discord</h1>
      <button
        onClick={() =>
          signIn(
            "discord",
            {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
            { callbackUrl: "/" },
          )
        }
      >
        Sign in
      </button>
    </div>
  )
}
