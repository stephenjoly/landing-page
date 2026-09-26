import { DialogTitle, Description } from '@headlessui/react'

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

  const years = [...new Set(project.timeline.match(/\b\d{4}\b/g) ?? [])]
  const duration = project.timeline.match(/\(([^)]+)\)/)?.[1]
  const contactHref = `mailto:stephen.a.joly@gmail.com?subject=${encodeURIComponent(
    `Let's discuss: ${project.name}`,
  )}&body=${encodeURIComponent(
    `Hi Stephen,\n\nI'd like to discuss work related to your case study: ${project.name}.\n\n`,
  )}`

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
      <article className="px-6 pt-6 pb-7 sm:px-[34px]">
        <p className="flex min-h-[38px] items-center pr-12 text-[10px] font-semibold tracking-[0.12em] text-zinc-500 uppercase dark:text-zinc-400">
          Case study / Consulting{years.length > 0 && ` / ${years.join('–')}`}
        </p>

        <header className="mt-4 grid gap-6 border-b border-zinc-200 pb-5 sm:grid-cols-[minmax(0,1fr)_194px] sm:gap-[38px] dark:border-zinc-800">
          <div>
            <DialogTitle
              as="h3"
              className="text-[26px] leading-[1.12] font-semibold tracking-tight text-zinc-900 sm:text-[30px] dark:text-zinc-50"
            >
              {project.name}
            </DialogTitle>
            <Description className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {project.description}
            </Description>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-1 sm:content-start sm:pt-1">
            <div>
              <dt className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                Client
              </dt>
              <dd className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">
                {project.descriptor}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
                {duration ? 'Duration' : 'Timeline'}
              </dt>
              <dd className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">
                {duration ?? project.timeline}
              </dd>
            </div>
          </dl>
        </header>

        <section className="mt-5">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Context
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.context}
          </p>
        </section>

        <section className="mt-5">
          <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            Contributions
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.role[0]}
          </p>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {project.role.slice(1).map((line, index) => (
              <li key={index} className="relative pl-4">
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-0 h-[5px] w-[5px] rounded-full bg-teal-500"
                />
                {line}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-6 flex flex-col gap-4 rounded-xl border border-teal-700/15 bg-[#F1F8F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-teal-400/20 dark:bg-teal-950/40">
          <div>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              Want to discuss related work?
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              This case study will be included in your email.
            </p>
          </div>
          <a
            href={contactHref}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#137E72] px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
          >
            Contact Stephen <span aria-hidden="true">→</span>
          </a>
        </footer>
      </article>
    </ModalWrapper>
  )
}

export default ProjectModal
