'use client'

import { useEffect, useState } from 'react'
import { SimpleLayout } from './SimpleLayout'
import { Card } from './Card'
import Image from 'next/image'
import ProjectModal from './ProjectModal'
import { ProjectType } from '../app/projects/data'

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

interface ProjectsProps {
  projects: ProjectType[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project: any) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  // Add a useEffect to handle the body scroll
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = '' // Cleanup on unmount or when modal is closed
    }
  }, [selectedProject])

  return (
    <>
      <SimpleLayout
        title="Things I’ve been a part of, trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years, all of which have taught me something that makes me who I am today. I'd love to talk about these projects and explore what problems we can solve together."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project: ProjectType) => (
            <Card as="li" key={project.name}>
              <div className="flex items-center space-x-3 pb-2">
                <div className="">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                    <Image
                      src={project.logo}
                      alt=""
                      className="h-8 w-8"
                      unoptimized
                    />
                  </div>
                </div>
                <h2 className="flex-grow font-semibold text-zinc-800 dark:text-zinc-100">
                  <Card.Button onClick={() => openModal(project)}>
                    <p className="text-left">{project.name}</p>
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
      </SimpleLayout>
      {selectedProject && (
        <ProjectModal
          isOpen={true}
          onRequestClose={closeModal}
          project={selectedProject}
        />
      )}
    </>
  )
}
