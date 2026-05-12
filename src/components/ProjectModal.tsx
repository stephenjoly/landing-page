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
        <div className="border-b border-zinc-200 bg-zinc-50/80 px-6 pt-6 pr-16 pb-5 sm:px-8 sm:pt-8 sm:pr-20 sm:pb-6 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <Image
                src={project.logo}
                alt=""
                className="h-7 w-7 object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  {project.descriptor}
                </span>
                <span className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                  {project.timeline}
                </span>
              </div>
              <h3
                id={titleId}
                className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50"
              >
                {project.name}
              </h3>
              <p
                id={descriptionId}
                className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400"
              >
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          <section className="grid gap-3 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
              Client Context
            </p>
            <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {project.context}
            </p>
          </section>

          <section className="mt-8 grid gap-3 border-t border-zinc-200 pt-7 sm:grid-cols-[9rem_1fr] sm:gap-8 dark:border-zinc-800">
            <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
              Role and Contributions
            </p>
            <div>
              <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
                {project.role[0]}
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {project.role.slice(1).map((line, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[1.5rem_1fr] gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm shadow-zinc-950/[0.02] dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-[0.6875rem] leading-none font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                      {index + 1}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ProjectModal
