'use client'

import { Children, useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import clsx from 'clsx'

import type { ConsultingProject } from '@/app/projects/data'
import ProjectModal from '@/components/ProjectModal'

// How long each position stays put before the track glides on.
const ROTATION_DELAY = 6000
// Clones of the first slides let the track keep moving forward past the last
// slide; three covers the widest (desktop) layout.
const CLONE_COUNT = 3

function ChevronIcon({
  direction,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d={
          direction === 'left'
            ? 'M9.25 10.25 6.75 8l2.5-2.25'
            : 'M6.75 5.75 9.25 8l-2.5 2.25'
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PauseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <rect x="4.5" y="4" width="2.25" height="8" rx="0.75" />
      <rect x="9.25" y="4" width="2.25" height="8" rx="0.75" />
    </svg>
  )
}

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M5.5 4.6v6.8a.6.6 0 0 0 .9.52l5.6-3.4a.6.6 0 0 0 0-1.04l-5.6-3.4a.6.6 0 0 0-.9.52Z" />
    </svg>
  )
}

function ControlButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      className={clsx(
        'group flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition hover:ring-zinc-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:outline-teal-400',
        className,
      )}
      {...props}
    />
  )
}

function usePerView() {
  // Unknown until mounted; the server render relies on responsive CSS.
  let [perView, setPerView] = useState<number | null>(null)

  useEffect(() => {
    // Matches the sm and lg breakpoints used by the slide widths below.
    let tablet = window.matchMedia('(min-width: 640px)')
    let desktop = window.matchMedia('(min-width: 1024px)')
    let update = () => setPerView(desktop.matches ? 3 : tablet.matches ? 2 : 1)

    update()
    tablet.addEventListener('change', update)
    desktop.addEventListener('change', update)
    return () => {
      tablet.removeEventListener('change', update)
      desktop.removeEventListener('change', update)
    }
  }, [])

  return perView
}

export function ConsultingProjectsCarousel({
  label,
  children,
  projects,
}: {
  projects: ConsultingProject[]
  label: string
  children: React.ReactNode
}) {
  let slides = Children.toArray(children)
  let count = slides.length
  let measuredPerView = usePerView()
  let perView = measuredPerView ?? 3

  let rootRef = useRef<HTMLDivElement>(null)
  let trackRef = useRef<HTMLDivElement>(null)
  let progressRef = useRef<HTMLSpanElement>(null)
  let indexRef = useRef(0)
  // Time already spent on the current position, kept across pauses so the
  // progress bar and the timer resume where they stopped.
  let elapsedRef = useRef(0)
  let elapsedIndexRef = useRef(0)
  let [index, setIndex] = useState(0)
  let [animate, setAnimate] = useState(true)
  let [reducedMotion, setReducedMotion] = useState(false)
  let [playing, setPlaying] = useState(true)
  let [pressed, setPressed] = useState(false)
  let [focused, setFocused] = useState(false)
  let [inView, setInView] = useState(false)
  let [pageVisible, setPageVisible] = useState(true)
  let [selectedProject, setSelectedProject] = useState<ConsultingProject>()
  // Also guard the timer synchronously when activation lands near its deadline.
  let modalOpenRef = useRef(false)

  indexRef.current = index
  let activeIndex = index % count
  let canRotate = count > perView
  // Resting the pointer over the carousel deliberately does not pause it;
  // only keyboard focus, a press in progress, the Pause control, or the
  // carousel being out of sight do.
  let rotating =
    canRotate &&
    playing &&
    !selectedProject &&
    !pressed &&
    !focused &&
    inView &&
    pageVisible

  useEffect(() => {
    let query = window.matchMedia('(prefers-reduced-motion: reduce)')
    let update = () => {
      setReducedMotion(query.matches)
      // Reduced motion starts paused; visitors can still choose to play.
      if (query.matches) setPlaying(false)
    }

    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let update = () => setPageVisible(document.visibilityState === 'visible')

    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    let root = rootRef.current
    if (!root) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    // Wait until most of the carousel is on screen, so the first move
    // happens where visitors can see it.
    let observer = new IntersectionObserver(
      ([entry]) =>
        setInView(
          entry.intersectionRatio >= 0.5 ||
            entry.intersectionRect.height >= window.innerHeight * 0.5,
        ),
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pressed) return

    let release = () => setPressed(false)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [pressed])

  let move = useCallback(
    (delta: 1 | -1) => {
      if (count < 2) return

      if (reducedMotion) {
        setAnimate(false)
        setIndex((indexRef.current + delta + count) % count)
        return
      }

      // Keep the move within the rendered slides by first jumping, without
      // animation, to the identical position on the other side of the loop.
      let from = indexRef.current
      if (from + delta > count) from -= count
      if (from + delta < 0) from += count

      if (from !== indexRef.current) {
        flushSync(() => {
          setAnimate(false)
          setIndex(from)
        })
        trackRef.current?.getBoundingClientRect()
      }

      setAnimate(true)
      setIndex(from + delta)
    },
    [count, reducedMotion],
  )

  useEffect(() => {
    if (!canRotate) return

    // A new position, whether reached automatically or by hand, starts a
    // full interval.
    if (elapsedIndexRef.current !== activeIndex) {
      elapsedIndexRef.current = activeIndex
      elapsedRef.current = 0
    }

    let progress = progressRef.current?.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: ROTATION_DELAY, fill: 'forwards' },
    )
    if (progress) progress.currentTime = elapsedRef.current

    if (!rotating) {
      progress?.pause()
      return () => progress?.cancel()
    }

    let start = performance.now()
    let timeout = window.setTimeout(() => {
      if (!modalOpenRef.current) move(1)
    }, ROTATION_DELAY - elapsedRef.current)
    return () => {
      window.clearTimeout(timeout)
      elapsedRef.current = Math.min(
        ROTATION_DELAY,
        elapsedRef.current + performance.now() - start,
      )
      progress?.cancel()
    }
  }, [canRotate, rotating, activeIndex, move])

  let cloneCount = canRotate ? Math.min(CLONE_COUNT, count) : 0
  let renderedSlides = [
    ...slides.map((slide, slideIndex) => ({ slide, slideIndex, clone: false })),
    ...slides
      .slice(0, cloneCount)
      .map((slide, slideIndex) => ({ slide, slideIndex, clone: true })),
  ]
  let firstVisible = activeIndex + 1
  let lastVisible = ((index + Math.min(perView, count) - 1) % count) + 1

  return (
    <>
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        onClickCapture={(event) => {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return

          let link = (event.target as Element).closest<HTMLAnchorElement>(
            'a[data-home-project]',
          )
          if (
            !link ||
            link.target === '_blank' ||
            link.hasAttribute('download')
          )
            return
          let slug = link.dataset.homeProject
          let project = projects.find((project) => project.slug === slug)
          if (!project) return

          event.preventDefault()
          // Focus before mounting so the shared dialog records the real trigger,
          // including browsers that do not focus anchors on pointer activation.
          link.focus({ preventScroll: true })
          modalOpenRef.current = true
          setSelectedProject(project)
        }}
        // Never move a project out from under a press that is about to become
        // a click.
        onPointerDown={() => setPressed(true)}
        // Mouse clicks also focus buttons in some browsers, so only focus that
        // shows a keyboard focus ring pauses rotation.
        onFocus={(event) => {
          if (event.target.matches(':focus-visible')) setFocused(true)
        }}
        onKeyDown={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false)
          }
        }}
      >
        {/* Padding leaves room for the cards' hover surfaces and focus rings
          while the clipped neighbours stay out of view behind the gap. */}
        <div className="-mx-4 -my-6 overflow-hidden px-4 py-6 sm:-mx-6 sm:px-6">
          <div
            ref={trackRef}
            aria-live={rotating ? 'off' : 'polite'}
            className={clsx(
              'flex gap-(--gap) [--gap:3rem] [--per-view:1] sm:[--per-view:2] lg:[--per-view:3]',
              animate &&
                'transition-transform duration-[850ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
            )}
            style={{
              transform: `translateX(calc(${index} * -1 * (100% + var(--gap)) / var(--per-view)))`,
            }}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === 'transform' &&
                !modalOpenRef.current &&
                indexRef.current >= count
              ) {
                setAnimate(false)
                setIndex(indexRef.current - count)
              }
            }}
          >
            {renderedSlides.map(({ slide, slideIndex, clone }, position) => {
              let hidden = position < index || position >= index + perView
              // Before the layout is measured, hide the second and third slides
              // wherever CSS places them offscreen so they cannot take focus.
              let offscreenBeforeMeasure =
                measuredPerView === null &&
                (position === 1
                  ? 'max-sm:invisible'
                  : position === 2 && 'max-lg:invisible')

              return (
                <div
                  key={`${clone ? 'clone' : 'slide'}-${slideIndex}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slideIndex + 1} of ${count}`}
                  aria-hidden={hidden || undefined}
                  inert={hidden || undefined}
                  className={clsx(
                    'flex flex-none',
                    offscreenBeforeMeasure,
                    // Projects fade as they glide past the edges. Loop jumps
                    // happen without animation, so they never flicker.
                    measuredPerView !== null && hidden && 'opacity-0',
                    animate &&
                      'transition-opacity duration-[850ms] ease-out motion-reduce:transition-none',
                  )}
                  style={{
                    flexBasis:
                      'calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view))',
                  }}
                >
                  {slide}
                </div>
              )
            })}
          </div>
        </div>

        {canRotate ? (
          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Position and time until the next move; the count beside it
                carries the same information for assistive technology. */}
              <div aria-hidden="true" className="flex items-center gap-1.5">
                {slides.map((_, slideIndex) => (
                  <span
                    key={slideIndex}
                    className={clsx(
                      'relative h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none',
                      slideIndex === activeIndex
                        ? 'w-8 bg-zinc-200 dark:bg-zinc-700'
                        : 'w-1.5 bg-zinc-300 dark:bg-zinc-600',
                    )}
                  >
                    {slideIndex === activeIndex ? (
                      <span
                        ref={progressRef}
                        className={clsx(
                          'absolute inset-0 origin-left rounded-full transition-colors duration-300',
                          rotating
                            ? 'bg-teal-500 dark:bg-teal-400'
                            : 'bg-zinc-400 dark:bg-zinc-500',
                        )}
                        style={{ transform: 'scaleX(0)' }}
                      />
                    ) : null}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
                <span className="sr-only">Showing projects </span>
                {measuredPerView === null ? (
                  <>
                    1
                    <span className="max-sm:hidden">
                      –<span className="lg:hidden">2</span>
                      <span className="max-lg:hidden">3</span>
                    </span>
                  </>
                ) : firstVisible === lastVisible ? (
                  firstVisible
                ) : (
                  `${firstVisible}–${lastVisible}`
                )}{' '}
                of {count}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ControlButton
                aria-label="Previous project"
                onClick={() => move(-1)}
              >
                <ChevronIcon
                  direction="left"
                  className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-200"
                />
              </ControlButton>
              <ControlButton
                aria-label={
                  playing
                    ? 'Pause automatic rotation'
                    : 'Start automatic rotation'
                }
                onClick={() => {
                  // Keyboard focus pauses rotation, but an explicit start
                  // resumes it until the next keyboard interaction.
                  if (!playing) setFocused(false)
                  setPlaying(!playing)
                }}
              >
                {playing ? (
                  <PauseIcon className="h-4 w-4 fill-zinc-500 transition group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-200" />
                ) : (
                  <PlayIcon className="h-4 w-4 fill-zinc-500 transition group-hover:fill-zinc-700 dark:fill-zinc-400 dark:group-hover:fill-zinc-200" />
                )}
              </ControlButton>
              <ControlButton aria-label="Next project" onClick={() => move(1)}>
                <ChevronIcon
                  direction="right"
                  className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-200"
                />
              </ControlButton>
            </div>
          </div>
        ) : null}
      </div>
      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onRequestClose={() => {
          modalOpenRef.current = false
          setSelectedProject(undefined)
        }}
      />
    </>
  )
}
