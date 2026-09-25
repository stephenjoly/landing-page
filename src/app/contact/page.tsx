import { type Metadata } from 'next'
import Script from 'next/script'

import { SimpleLayout } from '@/components/SimpleLayout'
import { configurationReady } from '@/lib/contactAccess'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Request contact details',
  description: 'Request access to Stephen Joly’s contact details and résumé.',
  robots: { index: false, follow: false },
}

const inputClass =
  'mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100'

export default function Contact({
  searchParams,
}: {
  searchParams?: { sent?: string; error?: string }
}) {
  const ready = configurationReady()

  return (
    <SimpleLayout
      title="Request contact details"
      intro="If you’re reaching out about a job or professional opportunity, tell me who you are and why you’d like to connect. I review requests personally."
    >
      {searchParams?.sent === '1' ? (
        <p role="status" className="text-sm text-teal-700 dark:text-teal-400">
          Your request was sent. If I approve it, you’ll receive an access link by email.
        </p>
      ) : !ready ? (
        <p role="status" className="text-sm text-zinc-600 dark:text-zinc-400">
          Access requests are temporarily unavailable. Please check back later.
        </p>
      ) : (
        <>
          {searchParams?.error && (
            <p role="alert" className="mb-6 text-sm text-red-700 dark:text-red-400">
              {searchParams.error === 'invalid'
                ? 'Please check the form and try again.'
                : 'Your request could not be sent. Please try again later.'}
            </p>
          )}
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <form action="/api/contact/request" method="post" className="max-w-xl space-y-5">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Name
              <input className={inputClass} name="name" maxLength={100} required />
            </label>
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Email
              <input className={inputClass} name="email" type="email" maxLength={254} required />
            </label>
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Organization
              <input className={inputClass} name="organization" maxLength={120} required />
            </label>
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Why would you like to connect?
              <textarea className={inputClass} name="reason" rows={5} minLength={20} maxLength={1000} required />
            </label>
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <div className="cf-turnstile" data-sitekey={process.env.TURNSTILE_SITE_KEY} />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Resend emails me a copy of your name, email, organization, and reason.
              The site’s pending request record expires after seven days.
            </p>
            <button
              type="submit"
              className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              Request access
            </button>
          </form>
        </>
      )}
    </SimpleLayout>
  )
}
