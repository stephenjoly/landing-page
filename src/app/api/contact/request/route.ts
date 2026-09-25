import { NextResponse } from 'next/server'

import {
  configurationReady,
  isSameOrigin,
  privateHeaders,
  readForm,
  redis,
  REQUEST_TTL,
  sendEmail,
  siteUrl,
  token,
  tokenKey,
  type ContactRequest,
} from '@/lib/contactAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function back(result: string) {
  return NextResponse.redirect(new URL(`/contact?${result}`, siteUrl()), {
    status: 303,
    headers: privateHeaders,
  })
}

export async function POST(request: Request) {
  if (!configurationReady()) return back('error=unavailable')
  if (!isSameOrigin(request)) return new Response(null, { status: 403 })

  let form: URLSearchParams
  try {
    form = await readForm(request)
  } catch {
    return back('error=invalid')
  }
  if (form.get('website')) return back('sent=1')

  const name = (form.get('name') || '').trim()
  const email = (form.get('email') || '').trim().toLowerCase()
  const organization = (form.get('organization') || '').trim()
  const reason = (form.get('reason') || '').trim()
  const challenge = form.get('cf-turnstile-response') || ''

  if (
    !name || name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    !organization || organization.length > 120 ||
    reason.length < 20 || reason.length > 1000 ||
    !challenge || challenge.length > 2048
  ) return back('error=invalid')

  try {
    const verification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: challenge,
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      },
    )
    const result = (await verification.json()) as { success?: boolean; hostname?: string }
    if (!verification.ok || !result.success || result.hostname !== new URL(siteUrl()).hostname) {
      return back('error=invalid')
    }

    const store = await redis()
    const rateKey = `contact:rate:${tokenKey('request', email)}`
    const count = await store.incr(rateKey)
    if (count === 1) await store.expire(rateKey, 3600)
    if (count > 3) return back('error=unavailable')

    const approvalToken = token()
    const details: ContactRequest = {
      name, email, organization, reason, createdAt: new Date().toISOString(),
    }
    const requestKey = tokenKey('request', approvalToken)
    await store.set(requestKey, JSON.stringify(details), { EX: REQUEST_TTL })
    try {
      await sendEmail(
        process.env.CONTACT_OWNER_EMAIL!,
        'New contact access request',
        `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nReason:\n${reason}\n\nReview and approve or deny:\n${siteUrl()}/api/contact/approve?token=${approvalToken}\n\nThis request expires in 7 days.`,
      )
    } catch (error) {
      await store.del(requestKey)
      throw error
    }
    return back('sent=1')
  } catch {
    return back('error=unavailable')
  }
}
