'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// useLayoutEffect warns during SSR; the effect only matters in the browser.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const keyframes: Keyframe[] = [
  { opacity: 0, transform: 'translateY(8px)' },
  { opacity: 1, transform: 'none' },
]

const timing: KeyframeAnimationOptions = {
  id: 'page-motion',
  duration: 320,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

// Fades page content in after a pathname change. Server-rendered content is
// never hidden: the animation only runs in the browser, after the new route
// has committed, and leaves no styles behind once it finishes or is cancelled.
export function PageMotion({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let ref = useRef<HTMLElement>(null)
  let previousPathname = useRef(pathname)
  let animation = useRef<Animation | null>(null)

  useIsomorphicLayoutEffect(() => {
    let element = ref.current

    if (previousPathname.current === pathname) return
    previousPathname.current = pathname

    animation.current?.cancel()
    animation.current = null

    if (
      !element ||
      typeof element.animate !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    animation.current = element.animate(keyframes, timing)
  }, [pathname])

  useEffect(() => () => animation.current?.cancel(), [])

  return (
    <main ref={ref} className="flex-auto" data-page-motion="">
      {children}
    </main>
  )
}
