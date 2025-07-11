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
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 rounded-full bg-gray-400 px-2 text-sm font-bold text-white shadow-md hover:bg-gray-600 focus:outline-none dark:bg-gray-500"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
