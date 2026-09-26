import 'server-only'

import { createHash, randomBytes } from 'node:crypto'
import { createClient } from 'redis'

export const SESSION_COOKIE = 'sj_contact_access'
export const REQUEST_TTL = 7 * 24 * 60 * 60
export const INVITE_TTL = 2 * 24 * 60 * 60
export const SESSION_TTL = 7 * 24 * 60 * 60

// UI-only preview: never grants a real session or sends email.
export function isContactPreview() {
  return process.env.CONTACT_UI_PREVIEW === '1'
}

export type ContactRequest = {
  name: string
  email: string
  organization: string
  reason: string
  createdAt: string
}

export const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Referrer-Policy': 'no-referrer',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
}

let redisPromise: ReturnType<ReturnType<typeof createClient>['connect']> | undefined

export function configurationReady() {
  return Boolean(
    process.env.CONTACT_ACCESS_ENABLED === '1' &&
      process.env.CONTACT_OWNER_EMAIL &&
      process.env.CONTACT_EMAIL &&
      process.env.CONTACT_PHONE &&
      process.env.PRIVATE_RESUME_PATH &&
      process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.REDIS_URL &&
      process.env.TURNSTILE_SITE_KEY &&
      process.env.TURNSTILE_SECRET_KEY,
  )
}

export function siteUrl() {
  return (process.env.CONTACT_SITE_URL || 'https://stephenjoly.net').replace(
    /\/$/,
    '',
  )
}

export function isSameOrigin(request: Request) {
  return request.headers.get('origin') === siteUrl()
}

export function token() {
  return randomBytes(32).toString('base64url')
}

export function tokenKey(kind: 'request' | 'invite' | 'session', value: string) {
  return `contact:${kind}:${createHash('sha256').update(value).digest('hex')}`
}

export function validToken(value: string) {
  return /^[A-Za-z0-9_-]{43}$/.test(value)
}

export async function redis() {
  if (!process.env.REDIS_URL) throw new Error('REDIS_URL is not configured')
  if (!redisPromise) {
    const client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries) =>
          retries < 3 ? retries * 200 : new Error('Redis unavailable'),
      },
    })
    client.on('error', () => {})
    redisPromise = client.connect().catch((error) => {
      redisPromise = undefined
      throw error
    })
  }
  return redisPromise
}

export async function sendEmail(to: string, subject: string, body: string) {
  if (isContactPreview()) throw new Error('Email is disabled in UI previews')
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!key || !from) throw new Error('Resend is not configured')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, text: body }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  })
  if (!response.ok) throw new Error(`Resend returned ${response.status}`)
}

export async function hasAccess(cookieValue: string | undefined) {
  if (!cookieValue || !validToken(cookieValue)) return false
  return Boolean(await (await redis()).get(tokenKey('session', cookieValue)))
}

export async function readForm(request: Request, maxBytes = 8192) {
  if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) {
    throw new Error('Unsupported content type')
  }
  const reader = request.body?.getReader()
  if (!reader) throw new Error('Missing body')
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > maxBytes) {
      await reader.cancel()
      throw new Error('Form too large')
    }
    chunks.push(value)
  }
  return new URLSearchParams(Buffer.concat(chunks).toString('utf8'))
}
