import { createHash } from 'node:crypto'

const windowMs = 15 * 60 * 1000
const maxPerEmail = 5
const maxTotal = 30

// Bounded, process-local protection for the single-container deployment.
// The global budget also limits callers rotating emails or spoofing IP headers.
export function createContactRateLimiter() {
  let expiresAt = 0
  let total = 0
  const emails = new Map<string, number>()

  return (email: string, now = Date.now()): number => {
    if (now >= expiresAt) {
      expiresAt = now + windowMs
      total = 0
      emails.clear()
    }
    const key = createHash('sha256').update(email.toLowerCase()).digest('hex')
    const count = emails.get(key) ?? 0
    if (total >= maxTotal || count >= maxPerEmail) {
      return Math.ceil((expiresAt - now) / 1000)
    }
    total += 1
    emails.set(key, count + 1)
    return 0
  }
}

export const contactRateLimit = createContactRateLimiter()
