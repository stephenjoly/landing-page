'use client'

import { useEffect } from 'react'

const site = 'stephenjoly.net'

export function PostHogAnalytics() {
  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase()
    if (hostname !== site && hostname !== `www.${site}`) return

    let cancelled = false
    async function start() {
      const response = await fetch('/api/analytics-config', { cache: 'no-store' })
      if (!response.ok || cancelled) return
      const { apiKey } = (await response.json()) as { apiKey?: string }
      if (!apiKey || cancelled) return
      const { default: posthog } = await import('posthog-js')
      if (cancelled) return

      posthog.init(apiKey, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only',
        autocapture: false,
        capture_pageview: 'history_change',
        capture_pageleave: true,
        disable_session_recording: true,
        disable_surveys: true,
        persistence: 'localStorage+cookie',
        cross_subdomain_cookie: true,
        ip: false,
        loaded: (client) => client.register({ site }),
      })
    }
    void start().catch(() => {
      // Analytics must not interrupt page rendering if the endpoint is unavailable.
    })

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
