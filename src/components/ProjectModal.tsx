import { useId } from 'react'
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
        <div className="border-b border-zinc-200 px-6 pt-5 pr-14 pb-4 sm:px-8 sm:pr-16 dark:border-zinc-800">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <Image
                src={project.logo}
                alt=""
                className="h-6 w-6 object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span>{project.descriptor}</span>
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
                className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl dark:text-zinc-50"
              >
                {project.name}
              </h3>
              <p
                id={descriptionId}
                className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400"
              >
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
          <section>
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
              Client Context
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {project.context}
            </p>
          </section>

          <section className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase dark:text-zinc-400">
              Role and Contributions
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {project.role[0]}
            </p>
            <ul className="mt-4 space-y-3 border-l border-zinc-200 pl-4 text-sm leading-6 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
              {project.role.slice(1).map((line, index) => (
                <li key={index} className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 -left-[1.3125rem] h-2 w-2 rounded-full bg-teal-500 ring-4 ring-white dark:bg-teal-400 dark:ring-zinc-950"
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
