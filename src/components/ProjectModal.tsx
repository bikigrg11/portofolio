import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../data/content'
import { ShotFrame } from './ShotFrame'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-[92vw] max-w-3xl overflow-y-auto rounded-2xl border border-muted/20 bg-bg2 p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{project.icon}</div>
                <div>
                  <h3 className="text-xl font-bold leading-tight text-fg sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                    {project.category}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-muted/15 text-fg transition hover:border-accent hover:text-accent"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-[13px] text-muted">
              {project.year} · {project.role}
            </p>

            {(project.visual || project.shot) && (
              <div className="mt-6">
                <ShotFrame
                  src={project.shot}
                  alt={project.title}
                  label={project.title}
                  visual={project.visual}
                />
              </div>
            )}

            {project.problem && (
              <div className="my-5">
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  Problem
                </div>
                <p className="text-[15px] leading-relaxed text-[#c3ccdb]">{project.problem}</p>
              </div>
            )}

            <div className="my-5">
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
                What I built
              </div>
              <p className="text-[15px] leading-relaxed text-[#c3ccdb]">{project.built}</p>
            </div>

            {project.metrics.length > 0 && (
              <div className="my-6 flex flex-wrap gap-7">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl font-bold text-accent">{metric.n}</div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-muted/15 px-3 py-1.5 text-xs text-fg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3.5">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-transparent text-[13px] font-semibold text-accent transition hover:border-accent"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
