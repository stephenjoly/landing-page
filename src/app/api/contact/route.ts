import { NextResponse } from 'next/server'
import {
  emptyContactValues,
  validateContact,
  type ContactValues,
} from '@/lib/contact'
import { contactRateLimit } from '@/lib/contactRateLimit'

export const runtime = 'nodejs'
const maxBodyBytes = 32 * 1024
const unavailable =
  'Your message could not be sent. Please try again later or reach me through one of the links below.'

function failure(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status })
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new Error('Missing body')
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let body = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBodyBytes) {
        await reader.cancel()
        throw new Error('Body too large')
      }
      body += decoder.decode(value, { stream: true })
    }
    return JSON.parse(body + decoder.decode())
  } finally {
    reader.releaseLock()
  }
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return failure('Please submit the contact form again.', 415)
  }
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return failure('Please submit the form from this website.', 403)
  }
  if (Number(request.headers.get('content-length')) > maxBodyBytes) {
    return failure(
      'Your message is too long. Please shorten it and try again.',
      413,
    )
  }

  let body: unknown
  try {
    body = await readBody(request)
  } catch {
    return failure(
      'Unable to read your message. Please check it and try again.',
      400,
    )
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return failure('Please check your message and try again.', 400)
  }
  const input = body as Record<string, unknown>
  const values = { ...emptyContactValues }
  for (const key of Object.keys(values) as (keyof ContactValues)[]) {
    const value = input[key]
    if (value !== undefined && typeof value !== 'string') {
      return failure('Please check your message and try again.', 400)
    }
    values[key] = typeof value === 'string' ? value.trim() : ''
  }
  if (values.website)
    return failure('Unable to send this message. Please try again.', 400)
  const fieldErrors = validateContact(values)
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { ok: false, error: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 },
    )
  }
  const retryAfter = contactRateLimit(values.email)
  if (retryAfter) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Too many messages right now. Please try again in 15 minutes.',
      },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) return failure(unavailable, 503)

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: 'New message from your website',
        text: `Name: ${values.name}\nEmail: ${values.email}\nOrganization: ${values.organization || 'Not provided'}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    })
    if (!response.ok) return failure(unavailable, 502)
    const result: unknown = await response.json()
    if (
      !result ||
      typeof result !== 'object' ||
      !('id' in result) ||
      typeof result.id !== 'string'
    ) {
      return failure(unavailable, 502)
    }
    return NextResponse.json({
      ok: true,
      deliveredAt: new Date().toISOString(),
    })
  } catch {
    // Do not log message content, credentials, or provider responses.
    return failure(unavailable, 502)
  }
}
