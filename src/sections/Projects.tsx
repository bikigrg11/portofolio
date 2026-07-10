import { useState } from 'react'
import { projects } from '../data/content'
import type { Project } from '../data/content'
import { Section } from '../components/Section'
import { ProjectCarousel } from '../components/ProjectCarousel'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectModal } from '../components/ProjectModal'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const work = projects.filter((p) => p.role.includes('DraftKings'))
  const personal = projects.filter((p) => !p.role.includes('DraftKings'))

  return (
    <Section id="projects" eyebrow="Projects" title="Drag to explore">
      <ProjectCarousel onOpen={setSelected} />

      <div className="mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Work · DraftKings
        </p>
        <h3 className="mb-8 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Deep dives
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <div className="mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Personal Projects
        </p>
        <h3 className="mb-8 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Built on the side
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personal.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
