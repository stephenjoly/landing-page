'use client'

import { useEffect, useState } from 'react'
import styles from './cv.module.css'

const sections = [
  ['professional', 'Professional experience'],
  ['early', 'Research and early experience'],
  ['leadership', 'Leadership and community'],
  ['education', 'Education'],
  ['skills', 'Skills and languages'],
  ['awards', 'Awards and recognition'],
] as const

export function CVNavigation() {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0
    const elements = sections
      .map(([id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    function update() {
      frame = 0
      let active: string | null = null
      for (const section of elements) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) {
          active = section.id
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        active = elements.at(-1)?.id ?? null
      }
      setActiveId(active)
    }

    function queueUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    queueUpdate()
    return () => {
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className={styles.toc} aria-labelledby="toc-title">
      <h2 id="toc-title" className={styles['toc-title']}>
        On this page
      </h2>
      <ul>
        {sections.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a
        className={styles['toc-download']}
        href="/files/Stephen%20Joly%20-%20Resume.pdf"
        download="Stephen Joly - Resume.pdf"
      >
        Download résumé
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className={styles['icon-16']}
        >
          <path d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5" />
        </svg>
      </a>
    </nav>
  )
}
