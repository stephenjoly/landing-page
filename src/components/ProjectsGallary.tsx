'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type {
  CodingProject,
  ConsultingProject,
} from '@/app/projects/data'
import { Card } from '@/components/Card'
import ProjectModal from '@/components/ProjectModal'
import { SimpleLayout } from '@/components/SimpleLayout'

type ProjectTab = 'coding' | 'consulting'

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function getValidTab(tab: string | null | undefined): ProjectTab {
  return tab === 'consulting' ? 'consulting' : 'coding'
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'rounded-full px-4 py-2 text-sm font-medium transition',
        active
          ? 'bg-zinc-800 text-zinc-100 shadow-sm dark:bg-zinc-100 dark:text-zinc-900'
          : 'text-zinc-600 hover:text-teal-500 dark:text-zinc-300 dark:hover:text-teal-400',
      )}
    >
      {children}
    </button>
  )
}

function CodingProjectsGrid({ projects }: { projects: CodingProject[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Card as="li" key={project.name}>
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <Image src={project.logo} alt="" className="h-8 w-8" unoptimized />
          </div>
          <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <Card.Link href={project.link.href}>{project.name}</Card.Link>
          </h2>
          <Card.Description>{project.description}</Card.Description>
          <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
            <LinkIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">{project.link.label}</span>
          </p>
        </Card>
      ))}
    </ul>
  )
}

function ConsultingProjectsGrid({
  onProjectSelect,
  projects,
}: {
  onProjectSelect: (project: ConsultingProject) => void
  projects: ConsultingProject[]
}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <Card as="li" key={project.name}>
          <div className="flex items-center space-x-3 pb-2">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={project.logo} alt="" className="h-8 w-8" unoptimized />
            </div>
            <h2 className="flex-grow font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Button onClick={() => onProjectSelect(project)}>
                <span className="text-left">{project.name}</span>
              </Card.Button>
            </h2>
          </div>
          <Card.Description>{project.description}</Card.Description>
          <p className="relative z-10 mt-4 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
            <LinkIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">Click here to learn more</span>
          </p>
        </Card>
      ))}
    </ul>
  )
}

interface ProjectsProps {
  codingProjects: CodingProject[]
  consultingProjects: ConsultingProject[]
  initialTab: ProjectTab
}

export default function ProjectsGallary({
  codingProjects,
  consultingProjects,
  initialTab,
}: ProjectsProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedProject, setSelectedProject] =
    useState<ConsultingProject | null>(null)

  const activeTab = getValidTab(searchParams.get('tab') ?? initialTab)

  const setTab = (tab: ProjectTab) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('tab', tab)

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    if (activeTab === 'coding') {
      setSelectedProject(null)
    }
  }, [activeTab])

  return (
    <>
      <SimpleLayout
        title="Projects across software, systems, and client delivery."
        intro="This page brings together the work I build and the work I help deliver. Use the split view to move between coding projects and consulting engagements."
      >
        <div className="space-y-10">
          <div className="inline-flex rounded-full bg-white/90 p-1 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10">
            <TabButton
              active={activeTab === 'coding'}
              onClick={() => setTab('coding')}
            >
              Coding
            </TabButton>
            <TabButton
              active={activeTab === 'consulting'}
              onClick={() => setTab('consulting')}
            >
              Consulting
            </TabButton>
          </div>

          {activeTab === 'coding' ? (
            <CodingProjectsGrid projects={codingProjects} />
          ) : (
            <ConsultingProjectsGrid
              projects={consultingProjects}
              onProjectSelect={setSelectedProject}
            />
          )}
        </div>
      </SimpleLayout>

      {selectedProject ? (
        <ProjectModal
          isOpen
          onRequestClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      ) : null}
    </>
  )
}
