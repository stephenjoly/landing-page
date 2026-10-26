import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json(
    { apiKey: process.env.POSTHOG_KEY ?? null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
