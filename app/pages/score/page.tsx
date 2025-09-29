import { cookies } from "next/headers"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { redirect } from "next/navigation"

export default async function ScorePage() {
  const cookieStore = await cookies()
  const headerCookieScore = cookieStore.get("score")
  const score = headerCookieScore?.value

  if (!score) {
    redirect("/")
  }

  return <MDXRemote source={score} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
}
