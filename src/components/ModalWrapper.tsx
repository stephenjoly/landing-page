import { Dialog, DialogPanel } from '@headlessui/react'
import { useEffect, useState, type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children?: ReactNode
}

export default function ModalWrapper({
  isOpen,
  onRequestClose,
  children,
}: ModalProps) {
  const [trigger] = useState(() =>
    typeof document === 'undefined' ? null : document.activeElement,
  )

  useEffect(() => {
    return () => {
      // The gallery unmounts the dialog immediately when a case study closes.
      requestAnimationFrame(() => {
        if (trigger instanceof HTMLElement && trigger.isConnected)
          trigger.focus()
      })
    }
  }, [trigger])

  return (
    <Dialog open={isOpen} onClose={onRequestClose} className="relative z-200">
      <div
        className="fixed inset-0 bg-zinc-950/55 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
          <DialogPanel className="relative w-full max-w-[877px] rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/20 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
            <button
              type="button"
              data-autofocus
              onClick={onRequestClose}
              aria-label="Close project details"
              className="absolute top-6 right-5 inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 sm:right-[34px] dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
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
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
