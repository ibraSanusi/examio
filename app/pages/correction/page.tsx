import { cookies } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { redirect } from "next/navigation"

export default async function CorrectionPage() {
  const cookieStore = await cookies()
  const headerCookieScore = cookieStore.get("correction")
  const correction = headerCookieScore?.value

  if (!correction) {
    redirect("/")
  }

  return <MDXRemote source={correction} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
}
