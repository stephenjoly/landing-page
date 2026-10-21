import { type Metadata } from 'next'
import ProjectsGallary from '@/components/ProjectsGallary'
import { pageMetadata } from '@/lib/site'

import { codingProjects, consultingProjects } from './data'

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'A split view of coding and consulting work, from software experiments to client delivery.',
  path: '/projects',
})

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>
}) {
  const query = await searchParams
  const tabParam = Array.isArray(query.tab) ? query.tab[0] : query.tab

  const initialTab = tabParam === 'consulting' ? 'consulting' : 'coding'

  return (
    <ProjectsGallary
      codingProjects={codingProjects}
      consultingProjects={consultingProjects}
      initialTab={initialTab}
    />
  )
}
