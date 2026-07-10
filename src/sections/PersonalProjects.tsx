import { motion } from 'framer-motion'
import { projects } from '../data/content'

const MAX_STACK = 4

export function PersonalProjects() {
  const personal = projects.filter((p) => !p.role.includes('DraftKings'))

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {personal.map((project, index) => {
        const primaryLink = project.links[0]
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.06 }}
            className="group flex flex-col rounded-2xl border border-muted/15 bg-bg2/50 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,.02), rgba(10,15,26,.5) 60%)',
            }}
          >
            <div className="text-2xl">{project.icon}</div>
            <h3 className="mt-3 text-lg font-bold leading-tight text-fg">{project.title}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
              {project.category}
            </p>
            <p className="mt-3 line-clamp-4 text-[14px] leading-relaxed text-muted">
              {project.built}
            </p>

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

            {primaryLink && (
              <a
                href={primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 text-[13px] font-semibold text-accent"
              >
                {primaryLink.label} ↗
              </a>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
