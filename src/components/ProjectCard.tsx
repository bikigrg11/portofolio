import type { Project } from '../data/content'

const MAX_STACK = 4

type ProjectCardProps = {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex w-full flex-col rounded-2xl border border-muted/15 bg-bg2/50 p-6 text-left backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 cursor-pointer"
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,.02), rgba(10,15,26,.5) 60%)',
      }}
    >
      <h3 className="text-lg font-bold leading-tight text-fg">{project.title}</h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
        {project.category}
      </p>
      <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-muted">{project.built}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, MAX_STACK).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-muted/15 px-2.5 py-1 text-[11px] text-fg"
          >
            {tech}
          </span>
        ))}
      </div>

      <span className="mt-5 text-xs text-accent opacity-80 transition group-hover:opacity-100">
        View deep dive →
      </span>
    </button>
  )
}
