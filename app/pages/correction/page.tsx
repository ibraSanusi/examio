import { cookies } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Link from "next/link"

export default async function CorrectionPage() {
  const LinkComponent = () => (
    <Link
      className="bg-purple hover:bg-yellow w-fit rounded-lg p-2 font-semibold text-white"
      href={"/"}
    >
      Ir a Home
    </Link>
  )

  const cookieStore = await cookies()
  const correctionCookie = cookieStore.get("correction")
  const correction = correctionCookie?.value

  if (!correction) {
    const correctionErrorCookie = cookieStore.get("correction-error")
    const errorMessage = correctionErrorCookie?.value

    return (
      <div>
        <p className="text-red text-2xl">{errorMessage}</p>
        <LinkComponent />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <MDXRemote source={correction} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      <LinkComponent />
    </div>
  )
}
