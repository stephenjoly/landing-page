import Image from 'next/image'

import type { ConsultingProject } from '@/app/projects/data'
import ModalWrapper from './ModalWrapper'

interface ProjectModalProps {
  isOpen: boolean
  onRequestClose: () => void
  project?: ConsultingProject
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onRequestClose,
  project,
}) => {
  if (!isOpen || !project) return null

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center">
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image src={project.logo} alt="" className="h-8 w-8" unoptimized />
          </div>
          <h3 className="ml-2 text-xl font-medium text-gray-900 dark:text-white">
            {project.name}
          </h3>
        </div>
        <p className="mt-1 pt-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </p>
        <hr className="my-3 border-t border-gray-300 dark:border-gray-700" />
        <div className="max-h-[calc(100vh-20rem)] overflow-y-auto pr-4">
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <strong>Project Dates:</strong> {project.timeline}
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <strong>Client Descriptor:</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.descriptor}
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <strong>Client Context:</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.context}
          </p>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <strong>Role and Contributions:</strong>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.role[0]}
          </p>
          <ul className="ml-6 text-sm text-gray-500 dark:text-gray-400">
            {project.role.slice(1).map((line, index) => (
              <li key={index} className="list-disc py-1">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ProjectModal
