import React from 'react'

interface ModalProps {
  isOpen: boolean
  onRequestClose: () => void
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="bg-opacity-75 fixed inset-0 flex items-center justify-center bg-gray-500">
      <div className="relative m-auto w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-sm font-bold text-white focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
