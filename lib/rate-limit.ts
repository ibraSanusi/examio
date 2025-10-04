import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"

const EXAMS_REQUESTS_LEFT = "exams-requests-left"
const EXAMS_REQUESTS_LEFT_IN_SESSION = "exams-requests-left-in-session"
const EXAM_LIMIT_IN_SESSION = 20
const EXAM_LIMIT_NOT_IN_SESSION = 3

export async function decreaseExamsRequests(
  cookieStore: ReadonlyRequestCookies,
  cookieOptions: Partial<ResponseCookie>,
) {
  const { maxAge } = cookieOptions
  const session = await getServerSession(authOptions)

  if (session) {
    const requestLeft = cookieStore.get(EXAMS_REQUESTS_LEFT)?.value
    if (requestLeft) cookieStore.delete(EXAMS_REQUESTS_LEFT)
  } else {
    const requestLeft = cookieStore.get(EXAMS_REQUESTS_LEFT_IN_SESSION)?.value
    if (requestLeft) cookieStore.delete(EXAMS_REQUESTS_LEFT_IN_SESSION)
  }

  // restar peticiones al usuario
  const cookieExamsLeft = cookieStore.get(
    `${session ? EXAMS_REQUESTS_LEFT_IN_SESSION : EXAMS_REQUESTS_LEFT}`,
  )?.value
  const parsedExamsRequestLeft: number =
    Number.parseInt(
      cookieExamsLeft ||
        `${session ? EXAM_LIMIT_IN_SESSION.toString() : EXAM_LIMIT_NOT_IN_SESSION.toString()}`,
    ) - 1

  const examsLeft: string = parsedExamsRequestLeft.toString()

  if (parsedExamsRequestLeft > 0)
    cookieStore.set(
      `${session ? EXAMS_REQUESTS_LEFT_IN_SESSION : EXAMS_REQUESTS_LEFT}`,
      examsLeft,
      { httpOnly: true, maxAge },
    )

  return parsedExamsRequestLeft
}
