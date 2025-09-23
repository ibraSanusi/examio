import { HTMLAttributes } from "react"

type Props = {
  name: string
}

export default function Subject({ name, ...props }: Props & HTMLAttributes<HTMLElement>) {
  return (
    <article {...props}>
      <h2 className="border-purple bg-yellow to-light-black w-full rounded-lg border bg-linear-to-br from-black from-25% to-75% p-8 text-center text-2xl text-white">
        {name}
      </h2>
    </article>
  )
}
