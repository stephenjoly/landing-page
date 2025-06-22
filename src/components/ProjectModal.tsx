import React, { useState } from 'react'
import Modal from './ModalWrapper'

const ProjectModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Open Modal
      </button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white">
          <div className="px-4 py-5 sm:px-6">
            {/* Content goes here */}
            <h3 className="text-xl font-medium text-gray-900">Modal Title</h3>
            <p className="mt-1 text-sm text-gray-500">
              This is the content of the modal.
            </p>
          </div>
          <div className="px-4 py-3 sm:px-6">
            {/* Additional content or buttons */}
            <button
              onClick={onRequestClose}
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Close Modal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectModal
