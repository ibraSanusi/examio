export type GradeFormProps = {
  grade: {
    name: string
    topics: string[]
  }
  i: number
}

export type ExamState = {
  success: boolean
  error?: {
    code: string
    message: string
  }
}
