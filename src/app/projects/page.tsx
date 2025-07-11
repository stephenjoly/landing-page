import { type Metadata } from 'next'
import ProjectsGallary from '@/components/ProjectsGallary'

import { projects } from './data'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Things I’ve been a part of, trying to put my dent in the universe.',
}

export default function Projects() {
  return <ProjectsGallary projects={projects}></ProjectsGallary>
}
