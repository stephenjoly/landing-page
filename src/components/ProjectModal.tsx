import { useId } from 'react'

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
  const titleId = useId()
  const descriptionId = useId()

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <div className="flex max-h-[calc(100dvh-3rem)] flex-col px-6 py-7 sm:max-h-[calc(100dvh-5rem)] sm:px-8 sm:py-8">
        <div className="border-b border-zinc-100 pb-5 pr-14 dark:border-zinc-800">
          <div className="min-w-0 max-w-3xl">
            <h3
              id={titleId}
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-[2rem]"
            >
              {project.name}
            </h3>
            <p
              id={descriptionId}
              className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400"
            >
              {project.description}
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {project.timeline}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pt-6 pr-2 sm:pr-3">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Client Context
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {project.context}
            </p>
          </section>

          <section className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Role and Contributions
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {project.role[0]}
            </p>
            <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-zinc-700 marker:text-teal-500 dark:text-zinc-300 dark:marker:text-teal-400">
              {project.role.slice(1).map((line, index) => (
                <li key={index} className="list-disc pl-1">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ProjectModal
