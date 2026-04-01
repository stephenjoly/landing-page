import { type Metadata } from 'next'
import ProjectsGallary from '@/components/ProjectsGallary'

import { codingProjects, consultingProjects } from './data'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A split view of coding and consulting work, from software experiments to client delivery.',
}

export default function Projects({
  searchParams,
}: {
  searchParams?: { tab?: string | string[] }
}) {
  const tabParam = Array.isArray(searchParams?.tab)
    ? searchParams?.tab[0]
    : searchParams?.tab

  const initialTab = tabParam === 'consulting' ? 'consulting' : 'coding'

  return (
    <ProjectsGallary
      codingProjects={codingProjects}
      consultingProjects={consultingProjects}
      initialTab={initialTab}
    />
  )
}
