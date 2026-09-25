import { readFile } from 'node:fs/promises'

import { type NextRequest } from 'next/server'

import { hasAccess, privateHeaders, SESSION_COOKIE } from '@/lib/contactAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  let authorized = false
  try {
    authorized = await hasAccess(request.cookies.get(SESSION_COOKIE)?.value)
  } catch {
    // Access fails closed if the session store is unavailable.
  }
  if (!authorized) return new Response(null, { status: 404, headers: privateHeaders })

  const path = process.env.PRIVATE_RESUME_PATH
  if (!path) return new Response('Résumé unavailable.', { status: 503, headers: privateHeaders })
  try {
    const pdf = await readFile(path)
    if (pdf.subarray(0, 5).toString() !== '%PDF-') throw new Error('Invalid PDF')
    return new Response(pdf, {
      headers: {
        ...privateHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Stephen-Joly-Resume.pdf"',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch {
    return new Response('Résumé unavailable.', { status: 503, headers: privateHeaders })
  }
}
