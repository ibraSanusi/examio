// front/services/userService.ts

export const userService = {
  async getUserData(): Promise<Response> {
    return await fetch("/api/users", { method: "GET" })
  },
  async deletUser(userId: string): Promise<Response> {
    return await fetch("/api/users", { method: "DELETE", body: userId })
  },
  async updateUser(
    userId: string,
    values: {
      [k: string]: FormDataEntryValue
    },
  ): Promise<Response> {
    return await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ userId, values }),
    })
    return await fetch("")
  },
}
