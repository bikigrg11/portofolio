import { projects } from '../data/content'
import { Section } from '../components/Section'
import { ProjectCarousel } from '../components/ProjectCarousel'
import { CaseStudy } from './CaseStudy'

export function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section id="projects" eyebrow="Selected work" title="Drag to explore">
      <ProjectCarousel />

      <div className="mt-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
          Deep dives
        </p>
        {featured.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
