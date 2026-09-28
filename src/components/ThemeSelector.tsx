'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const options = [
  {
    value: 'light',
    label: 'Light',
    path: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  },
  {
    value: 'dark',
    label: 'Dark',
    path: 'M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z',
  },
  {
    value: 'system',
    label: 'System',
    path: 'M4 3h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 14v4m-4 0h8',
  },
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <fieldset className="flex shrink-0 self-end rounded-full bg-zinc-100 p-0.5 lg:self-start dark:bg-zinc-800">
      <legend className="sr-only">Appearance</legend>
      {options.map(({ value, label, path }) => (
        <label key={value} className="relative cursor-pointer">
          <input
            type="radio"
            name="appearance"
            value={value}
            checked={mounted && theme === value}
            disabled={!mounted}
            onChange={() => setTheme(value)}
            className="peer sr-only"
          />
          <span className="flex h-11 items-center gap-1.5 rounded-full border border-transparent px-3 text-sm font-medium text-zinc-500 transition peer-checked:border-zinc-200 peer-checked:bg-white peer-checked:text-zinc-800 peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-600 dark:text-zinc-400 dark:peer-checked:border-zinc-600 dark:peer-checked:bg-zinc-700 dark:peer-checked:text-zinc-100 dark:peer-focus-visible:outline-teal-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path d={path} />
            </svg>
            {label}
          </span>
        </label>
      ))}
    </fieldset>
  )
}
