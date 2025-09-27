// Tipos genéricos
export type ApiResponseSuccess<T> = {
  success: true
  data: T
  message?: string
}

export type ApiResponseError = {
  success: false
  error: {
    code: string
    message: string
    fields?: string[]
  }
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError

export type ByExamIdParamsType = {
  params: {
    examId: string
  }
}
