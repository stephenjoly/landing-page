import React, { useEffect, useRef } from 'react'

interface ModalProps {
  descriptionId?: string
  isOpen: boolean
  onRequestClose: () => void
  titleId?: string
  children?: React.ReactNode
}

const ModalWrapper: React.FC<ModalProps> = ({
  descriptionId,
  isOpen,
  onRequestClose,
  titleId,
  children,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    modalContentRef.current?.focus()

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onRequestClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onRequestClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center overflow-y-auto bg-zinc-950/50 px-4 py-6 backdrop-blur-sm backdrop-filter sm:px-6 sm:py-10">
      <div
        ref={modalContentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-3rem)] min-h-[24rem] w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/20 outline-none sm:max-h-[calc(100dvh-5rem)] sm:min-h-[26rem] sm:w-[50rem] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40"
      >
        <button
          ref={closeButtonRef}
          onClick={onRequestClose}
          aria-label="Close project details"
          className="absolute top-3.5 right-3.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 dark:focus-visible:ring-teal-400"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-4 w-4 stroke-current"
            fill="none"
          >
            <path
              d="m4.25 4.25 7.5 7.5m0-7.5-7.5 7.5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default ModalWrapper
