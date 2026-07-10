import { projects } from '../data/content'
import { Section } from '../components/Section'
import { CaseStudy } from './CaseStudy'

export function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section id="projects" eyebrow="Case studies" title="Selected work, in depth">
      {featured.map((project, index) => (
        <CaseStudy key={project.id} project={project} index={index} />
      ))}
    </Section>
  )
}
