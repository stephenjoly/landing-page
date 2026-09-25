import {
  INVITE_TTL,
  isSameOrigin,
  privateHeaders,
  readForm,
  redis,
  sendEmail,
  siteUrl,
  token,
  tokenKey,
  validToken,
  type ContactRequest,
} from '@/lib/contactAccess'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const pageHeaders = {
  ...privateHeaders,
  'Content-Type': 'text/html; charset=utf-8',
  'Content-Security-Policy': "default-src 'none'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }
    return entities[character]
  })
}

function page(content: string, status = 200) {
  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><title>Contact request</title><main>${content}</main></html>`,
    { status, headers: pageHeaders },
  )
}

function parseRequest(value: string): ContactRequest {
  const data = JSON.parse(value) as ContactRequest
  if (
    typeof data.name !== 'string' ||
    typeof data.email !== 'string' ||
    typeof data.organization !== 'string' ||
    typeof data.reason !== 'string' ||
    typeof data.createdAt !== 'string'
  ) throw new Error('Invalid request record')
  return data
}

export async function GET(request: Request) {
  const approvalToken = new URL(request.url).searchParams.get('token') || ''
  if (!validToken(approvalToken)) return page('<h1>Invalid request link</h1>', 400)

  let details: ContactRequest
  try {
    const raw = await (await redis()).get(tokenKey('request', approvalToken))
    if (!raw) return page('<h1>This request has expired or was already reviewed.</h1>', 410)
    details = parseRequest(raw)
  } catch {
    return page('<h1>Please try again later.</h1>', 503)
  }

  return page(
    `<h1>Review contact request</h1><p><strong>Name:</strong> ${escapeHtml(details.name)}</p><p><strong>Email:</strong> ${escapeHtml(details.email)}</p><p><strong>Organization:</strong> ${escapeHtml(details.organization)}</p><p><strong>Reason:</strong></p><pre>${escapeHtml(details.reason)}</pre><p>Submitted ${escapeHtml(details.createdAt)}. Approve only if you recognize a legitimate professional request.</p><form method="post" action="/api/contact/approve"><input type="hidden" name="token" value="${approvalToken}"><button name="decision" value="approve" type="submit">Approve and email access link</button> <button name="decision" value="deny" type="submit">Deny</button></form>`,
  )
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return new Response(null, { status: 403 })
  let form: URLSearchParams
  try {
    form = await readForm(request, 1024)
  } catch {
    return page('<h1>Invalid request.</h1>', 400)
  }
  const approvalToken = form.get('token') || ''
  const decision = form.get('decision')
  if (!validToken(approvalToken) || (decision !== 'approve' && decision !== 'deny')) {
    return page('<h1>Invalid request.</h1>', 400)
  }

  try {
    const store = await redis()
    const requestKey = tokenKey('request', approvalToken)
    const lockKey = `${requestKey}:reviewing`
    const locked = await store.set(lockKey, '1', { NX: true, EX: 30 })
    if (!locked) return page('<h1>This request is being reviewed.</h1>', 409)
    try {
      const raw = await store.get(requestKey)
      if (!raw) return page('<h1>This request has expired or was already reviewed.</h1>', 410)
      const details = parseRequest(raw)
      if (decision === 'deny') {
        await store.del(requestKey)
        return page('<h1>Request denied.</h1>')
      }

      const accessToken = token()
      const inviteKey = tokenKey('invite', accessToken)
      await store.set(inviteKey, details.email, { EX: INVITE_TTL })
      try {
        await sendEmail(
          details.email,
          'Your contact access request was approved',
          `Stephen approved your request. Open this one-time link to view his contact details and résumé:\n\n${siteUrl()}/api/contact/access?token=${accessToken}\n\nThe link expires in 48 hours. The resulting browser access lasts seven days. Please do not forward it.`,
        )
      } catch (error) {
        await store.del(inviteKey)
        throw error
      }
      await store.del(requestKey)
      return page('<h1>Approved.</h1><p>The access link was emailed to the requester.</p>')
    } finally {
      await store.del(lockKey)
    }
  } catch {
    return page('<h1>Approval could not be completed. Please try again.</h1>', 503)
  }
}
