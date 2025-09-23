type CacheEntry = {
  value: string
  expiresAt: number
}

const cache: Record<string, CacheEntry> = {}

export const ExamCache = {
  saveText: (key: string, value: string, ttl = 60000) => {
    cache[key] = { value, expiresAt: Date.now() + ttl }
    console.log("saveText: ", cache[key])
  },

  getText: (key: string) => {
    console.log("getText: ", cache[key])
    const entry = cache[key]

    if (!entry || entry.expiresAt < Date.now()) {
      return null
    }

    return entry.value
  },
}
