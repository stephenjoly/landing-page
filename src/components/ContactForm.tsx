'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import portraitImage from '@/images/portrait.jpg'
import { socialProfiles } from '@/lib/socialProfiles'
import {
  emptyContactValues,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/lib/contact'

const headingClass =
  'text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100'
const linkClass =
  'rounded-sm font-semibold text-teal-700 hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-teal-400'
const inputClass =
  'mt-2 block w-full rounded-[7px] border border-zinc-300 bg-white px-3 text-base text-zinc-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/30 aria-[invalid=true]:border-red-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-teal-400 dark:focus:ring-teal-400/30'
const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name', maxLength: 100 },
  { name: 'email', label: 'Email', autoComplete: 'email', maxLength: 254 },
  {
    name: 'organization',
    label: 'Organization (optional)',
    autoComplete: 'organization',
    maxLength: 200,
  },
  { name: 'message', label: 'Message', autoComplete: 'off', maxLength: 5000 },
] as const

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ ...emptyContactValues })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [receipt, setReceipt] = useState<{
    values: ContactValues
    deliveredAt: string
  } | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const submitting = useRef(false)
  const focusTarget = useRef<string | null>(null)

  useEffect(() => {
    if (receipt) headingRef.current?.focus()
  }, [receipt])

  useEffect(() => {
    if (!sending && focusTarget.current) {
      const field = formRef.current?.elements.namedItem(focusTarget.current)
      if (field instanceof HTMLElement) field.focus()
      focusTarget.current = null
    }
  }, [sending, errors, receipt])

  function focusField(fieldErrors: ContactErrors) {
    focusTarget.current =
      fields.find(({ name }) => fieldErrors[name])?.name ?? null
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const fieldErrors = validateContact(values)
    setErrors(fieldErrors)
    setError('')
    if (Object.keys(fieldErrors).length) {
      setError('Please check the highlighted fields.')
      focusField(fieldErrors)
      return
    }
    submitting.current = true
    setSending(true)
    const submitted = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as ContactValues
    try {
      const result = await submitContact(submitted)
      if (result.ok) {
        setReceipt({ values: submitted, deliveredAt: result.deliveredAt })
      } else {
        setError(result.error)
        setErrors(result.fieldErrors ?? {})
        focusField(result.fieldErrors ?? {})
      }
    } catch {
      setError(
        'Something went wrong. Your message is still here. Please try again.',
      )
    } finally {
      submitting.current = false
      setSending(false)
    }
  }

  function reset() {
    focusTarget.current = 'name'
    setReceipt(null)
    setValues({ ...emptyContactValues })
    setErrors({})
    setError('')
  }

  return (
    <>
      <p className="mb-4 text-[11px] font-bold tracking-[0.1em] text-teal-700 dark:text-teal-400">
        CONTACT
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className={`${headingClass} rounded-sm [overflow-wrap:anywhere] focus:outline-teal-600`}
      >
        {receipt
          ? `Thanks, ${receipt.values.name}. Message sent.`
          : 'Let’s start a conversation.'}
      </h1>
      <p className="mt-5 text-base leading-7 [overflow-wrap:anywhere] text-zinc-600 dark:text-zinc-400">
        {receipt
          ? `It’s in my inbox now. I’ll reply to ${receipt.values.email} as soon as I can.`
          : 'Tell me what you’re working on, a role you have in mind, or an idea you’d like to explore.'}
      </p>
      {receipt ? (
        <div className="mt-8">
          <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 dark:border-teal-800 dark:bg-teal-950/40">
            <p className="flex items-center gap-2 text-sm font-medium text-teal-800 dark:text-teal-300">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12 3 3 5-6" />
              </svg>
              <span>
                Delivered ·{' '}
                <time dateTime={receipt.deliveredAt}>
                  {new Date(receipt.deliveredAt).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </time>
              </span>
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
              {receipt.values.message.length > 240
                ? `${receipt.values.message.slice(0, 240)}…`
                : receipt.values.message}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm">
            <button type="button" onClick={reset} className={linkClass}>
              Send another message
            </button>
            <Link href="/articles" className={linkClass}>
              Read recent articles →
            </Link>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="mt-8"
          aria-busy={sending}
        >
          <div aria-live="polite" aria-atomic="true">
            {error && (
              <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                {error}
              </p>
            )}
          </div>
          <fieldset
            disabled={sending}
            className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <legend className="sr-only">
              Your contact details and message
            </legend>
            {fields.map(({ name, label, autoComplete, maxLength }) => {
              const props = {
                id: `contact-${name}`,
                name,
                autoComplete,
                maxLength,
                required: name !== 'organization',
                value: values[name],
                'aria-invalid': Boolean(errors[name]),
                'aria-describedby': errors[name] ? `${name}-error` : undefined,
                onChange: (
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                ) => {
                  setValues((current) => ({
                    ...current,
                    [name]: event.target.value,
                  }))
                  setErrors((current) => ({ ...current, [name]: undefined }))
                },
              }
              return (
                <div
                  key={name}
                  className={
                    name === 'organization' || name === 'message'
                      ? 'sm:col-span-2'
                      : ''
                  }
                >
                  <label
                    htmlFor={props.id}
                    className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    {label}
                  </label>
                  {name === 'message' ? (
                    <textarea
                      {...props}
                      rows={5}
                      className={`${inputClass} h-36 min-h-36 resize-y py-3`}
                    />
                  ) : (
                    <input
                      {...props}
                      type={name === 'email' ? 'email' : 'text'}
                      className={`${inputClass} h-12`}
                    />
                  )}
                  {errors[name] && (
                    <p
                      id={`${name}-error`}
                      className="mt-2 text-sm text-red-700 dark:text-red-300"
                    >
                      {errors[name]}
                    </p>
                  )}
                </div>
              )
            })}
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Leave this field blank</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    website: event.target.value,
                  }))
                }
              />
            </div>
          </fieldset>
          <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={sending}
              className="shrink-0 rounded-lg bg-zinc-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 disabled:cursor-wait disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {sending ? 'Sending…' : 'Send message →'}
            </button>
            <div className="flex items-center gap-3">
              <Image
                src={portraitImage}
                alt=""
                width={32}
                height={32}
                sizes="32px"
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
              <p className="max-w-64 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                Comes straight to me.
                <br />
                I’ll reply as soon as I can.
              </p>
            </div>
          </div>
        </form>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">Elsewhere</span>
        {socialProfiles.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="rounded-sm text-zinc-600 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-zinc-400 dark:hover:text-teal-400"
          >
            {label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </>
  )
}
