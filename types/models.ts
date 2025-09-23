export type Exam = {
  userId: string
  createdAt: Date
  id_examen: string
  chat_examen: string
  score?: number
}

export type User = {
  id: string
  name?: string | null
  email: string
  emailVerified?: Date | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
  username?: string | null
  grade?: string | null
  age?: string | null
}
