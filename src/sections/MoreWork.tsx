import { projects } from '../data/content'
import { Section } from '../components/Section'

export function MoreWork() {
  const rest = projects.filter((p) => !p.featured)

  return (
    <Section id="more-work" eyebrow="More" title="Other work & experiments">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {rest.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-muted/15 p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/40"
          >
            <p className="text-[11px] tracking-wide text-accent">
              {project.num} — {project.year}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-fg">{project.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{project.built}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-muted/15 px-2.5 py-1 text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
