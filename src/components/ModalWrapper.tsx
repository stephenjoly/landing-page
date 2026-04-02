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

    closeButtonRef.current?.focus()

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
    <div className="fixed inset-0 z-200 flex items-start justify-center overflow-y-auto bg-zinc-950/45 px-4 py-6 backdrop-blur-sm backdrop-filter sm:px-6 sm:py-10">
      <div
        ref={modalContentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-zinc-900/10 dark:bg-zinc-900 dark:ring-white/10 max-h-[calc(100dvh-3rem)] sm:max-h-[calc(100dvh-5rem)]"
      >
        <button
          ref={closeButtonRef}
          onClick={onRequestClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 shadow-sm ring-1 ring-zinc-900/5 transition hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-zinc-800/80 dark:text-zinc-500 dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 dark:focus:ring-teal-400"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ×
          </span>
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default ModalWrapper
