import { cookies } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Link from "next/link"

export default async function CorrectionPage() {
  const cookieStore = await cookies()
  const correctionHeaderCookieScore = cookieStore.get("correction")
  const correction = correctionHeaderCookieScore?.value

  if (!correction) {
    const correctionErrorCookie = cookieStore.get("correction-error")
    const errorMessage = correctionErrorCookie?.value

    return (
      <div>
        <p className="text-red text-2xl">{errorMessage}</p>
        <Link className="bg-red hover:bg-light-black rounded-md p-2" href={"/"}>
          Ir a Home
        </Link>
      </div>
    )
  }

  return <MDXRemote source={correction} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
}
