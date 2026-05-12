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
  const titleId = useId()
  const descriptionId = useId()

  if (!isOpen || !project) return null

  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      titleId={titleId}
      descriptionId={descriptionId}
    >
      <div className="flex max-h-[calc(100dvh-3rem)] flex-col sm:max-h-[calc(100dvh-5rem)]">
        <div className="border-b border-zinc-200 px-6 py-5 sm:px-8 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pr-10 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="rounded-md border border-zinc-200 px-2 py-0.5 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              {project.descriptor}
            </span>
            <span
              aria-hidden="true"
              className="text-zinc-300 dark:text-zinc-700"
            >
              /
            </span>
            <span>{project.timeline}</span>
          </div>

          <h3
            id={titleId}
            className="mt-4 text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl dark:text-zinc-50"
          >
            {project.name}
          </h3>
          <p
            id={descriptionId}
            className="mt-2 max-w-[38rem] text-sm leading-6 text-zinc-600 dark:text-zinc-400"
          >
            {project.description}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <section>
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
              Context
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {project.context}
            </p>
          </section>

          <section className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
              Contributions
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {project.role[0]}
            </p>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {project.role.slice(1).map((line, index) => (
                <li key={index} className="relative pl-5">
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-0 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
                  />
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
