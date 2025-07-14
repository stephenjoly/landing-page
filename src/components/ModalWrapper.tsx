import React, { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children?: React.ReactNode
}

const ModalWrapper: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

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
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/30 backdrop-blur-sm backdrop-filter">
      <div
        ref={modalContentRef}
        className="relative m-auto w-full max-w-2xl rounded-lg bg-white p-6 pr-8 shadow-2xl dark:bg-zinc-800"
      >
        <div>{children}</div>
        <div className="mt-2">
          <button
            onClick={onRequestClose}
            className="absolute right-5 bottom-5 rounded-full bg-gray-400 px-2 text-sm text-white shadow-md hover:bg-gray-600 focus:outline-none dark:bg-gray-500"
          >
            Close &times;
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper
