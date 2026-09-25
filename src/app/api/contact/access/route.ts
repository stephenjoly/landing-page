import { NextResponse } from 'next/server'

import {
  isSameOrigin,
  privateHeaders,
  readForm,
  redis,
  SESSION_COOKIE,
  SESSION_TTL,
  siteUrl,
  token,
  tokenKey,
  validToken,
} from '@/lib/contactAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const pageHeaders = {
  ...privateHeaders,
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Security-Policy': "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
}

export async function GET(request: Request) {
  const accessToken = new URL(request.url).searchParams.get('token') || ''
  if (!validToken(accessToken)) {
    return new Response('This access link is invalid.', { status: 400, headers: privateHeaders })
  }
  try {
    const exists = await (await redis()).exists(tokenKey('invite', accessToken))
    if (!exists) {
      return new Response('This access link has expired or was already used.', {
        status: 410,
        headers: privateHeaders,
      })
    }
  } catch {
    return new Response('Please try again later.', { status: 503, headers: privateHeaders })
  }

  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><title>Contact access</title><main><h1>Contact access</h1><p>This link can be used once. Continue to view the approved contact details and résumé.</p><form method="post" action="/api/contact/access"><input type="hidden" name="token" value="${accessToken}"><button type="submit">Continue</button></form></main></html>`,
    { headers: pageHeaders },
  )
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return new Response(null, { status: 403 })
  let form: URLSearchParams
  try {
    form = await readForm(request, 1024)
  } catch {
    return new Response('Invalid request.', { status: 400, headers: privateHeaders })
  }
  const accessToken = form.get('token') || ''
  if (!validToken(accessToken)) {
    return new Response('Invalid access link.', { status: 400, headers: privateHeaders })
  }
  try {
    const store = await redis()
    const recipient = await store.getDel(tokenKey('invite', accessToken))
    if (!recipient) {
      return new Response('This access link has expired or was already used.', {
        status: 410,
        headers: privateHeaders,
      })
    }
    const sessionToken = token()
    await store.set(tokenKey('session', sessionToken), recipient, { EX: SESSION_TTL })
    const response = NextResponse.redirect(new URL('/contact/details', siteUrl()), {
      status: 303,
      headers: privateHeaders,
    })
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: new URL(siteUrl()).protocol === 'https:',
      sameSite: 'lax',
      maxAge: SESSION_TTL,
      path: '/',
    })
    return response
  } catch {
    return new Response('Please try again later.', { status: 503, headers: privateHeaders })
  }
}
