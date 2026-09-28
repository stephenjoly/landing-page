export type ContactValues = {
  name: string
  email: string
  organization: string
  message: string
  website: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>
export type ContactResult =
  | { ok: true; deliveredAt: string }
  | { ok: false; error: string; fieldErrors?: ContactErrors }
export type SubmitContact = (values: ContactValues) => Promise<ContactResult>

export const emptyContactValues: ContactValues = {
  name: '',
  email: '',
  organization: '',
  message: '',
  website: '',
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length > 100)
    errors.name = 'Use 100 characters or fewer.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (
    values.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = 'Please enter a valid email address.'
  }
  if (values.organization.trim().length > 200)
    errors.organization = 'Use 200 characters or fewer.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length > 5000)
    errors.message = 'Use 5,000 characters or fewer.'
  return errors
}

export const submitContact: SubmitContact = async (values) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
    signal: AbortSignal.timeout(15000),
  })
  const result: ContactResult = await response.json()
  if (!response.ok && result.ok) throw new Error('Unexpected contact response')
  return result
}
