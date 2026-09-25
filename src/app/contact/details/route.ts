import { type NextRequest } from 'next/server'

import { hasAccess, privateHeaders, SESSION_COOKIE } from '@/lib/contactAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }
    return entities[character]
  })
}

export async function GET(request: NextRequest) {
  let authorized = false
  try {
    authorized = await hasAccess(request.cookies.get(SESSION_COOKIE)?.value)
  } catch {
    // Access fails closed if the session store is unavailable.
  }
  if (!authorized) return new Response(null, { status: 404, headers: privateHeaders })

  const email = process.env.CONTACT_EMAIL
  const phone = process.env.CONTACT_PHONE
  if (!email || !phone) {
    return new Response('Contact details unavailable.', { status: 503, headers: privateHeaders })
  }

  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Contact Stephen Joly</title><style>body{max-width:42rem;margin:5rem auto;padding:0 1.5rem;font:1rem/1.6 system-ui,sans-serif;color:#27272a}a{color:#0d9488}@media(prefers-color-scheme:dark){body{background:#09090b;color:#e4e4e7}a{color:#2dd4bf}}</style><main><h1>Contact Stephen</h1><p>Thanks for reaching out. These details are for the approved recipient. Please don’t share them or the résumé link.</p><p>Email: <a href="mailto:${encodeURIComponent(email)}">${escapeHtml(email)}</a></p><p>Phone: <a href="tel:${encodeURIComponent(phone)}">${escapeHtml(phone)}</a></p><p><a href="/api/contact/resume">Download résumé (PDF)</a></p></main></html>`

  return new Response(html, {
    headers: {
      ...privateHeaders,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
