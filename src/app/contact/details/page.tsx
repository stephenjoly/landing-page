import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { SimpleLayout } from '@/components/SimpleLayout'
import { hasAccess, SESSION_COOKIE } from '@/lib/contactAccess'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact details',
  robots: { index: false, follow: false },
}

export default async function ContactDetails() {
  let authorized = false
  try {
    authorized = await hasAccess(cookies().get(SESSION_COOKIE)?.value)
  } catch {
    // Access fails closed if the session store is unavailable.
  }
  if (!authorized) redirect('/contact')

  const email = process.env.CONTACT_EMAIL
  const phone = process.env.CONTACT_PHONE
  if (!email || !phone) redirect('/contact')

  return (
    <SimpleLayout
      title="Contact Stephen"
      intro="Thanks for reaching out. These details are for the approved recipient. Please don’t share them or the résumé link."
    >
      <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
        <p>
          Email:{' '}
          <a className="text-teal-600 hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
        <p>
          Phone:{' '}
          <a className="text-teal-600 hover:underline" href={`tel:${phone}`}>
            {phone}
          </a>
        </p>
        <p>
          <a className="text-teal-600 hover:underline" href="/api/contact/resume">
            Download résumé (PDF)
          </a>
        </p>
      </div>
    </SimpleLayout>
  )
}
