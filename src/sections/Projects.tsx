import { projects } from '../data/content'
import { Section } from '../components/Section'
import { ProjectCarousel } from '../components/ProjectCarousel'
import { CaseStudy } from './CaseStudy'
import { PersonalProjects } from './PersonalProjects'

export function Projects() {
  const work = projects.filter((p) => p.role.includes('DraftKings'))

  return (
    <Section id="projects" eyebrow="Projects" title="Drag to explore">
      <ProjectCarousel />

      <div className="mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Work · DraftKings
        </p>
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Deep dives
        </h3>
        {work.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Personal Projects
        </p>
        <h3 className="mb-8 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          Built on the side
        </h3>
        <PersonalProjects />
      </div>
    </Section>
  )
}
