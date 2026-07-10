import { motion } from 'framer-motion'
import type { Project } from '../data/content'
import { ShotFrame } from '../components/ShotFrame'

type CaseStudyProps = {
  project: Project
  index: number
}

export function CaseStudy({ project, index }: CaseStudyProps) {
  const frameOnLeft = index % 2 === 0

  const shot = (
    <div className={frameOnLeft ? 'md:order-1' : 'md:order-2'}>
      <div
        className={`transition-transform duration-500 ease-out hover:[transform:perspective(1400px)_rotateY(0)_translateY(-6px)] ${
          frameOnLeft
            ? '[transform:perspective(1400px)_rotateY(6deg)]'
            : '[transform:perspective(1400px)_rotateY(-6deg)]'
        }`}
      >
        <ShotFrame src={project.shot} alt={project.title} label={project.title} />
      </div>
    </div>
  )

  const info = (
    <div className={frameOnLeft ? 'md:order-2' : 'md:order-1'}>
      <p className="text-[13px] tracking-wide text-accent">
        {project.num} — {project.year}
      </p>
      <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-fg sm:text-3xl md:text-[38px]">
        {project.title}
      </h3>
      <p className="mb-5 mt-1.5 text-[13px] text-muted">{project.role}</p>

      <div className="my-4">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
          Problem
        </div>
        <p className="text-[15px] leading-relaxed text-[#c3ccdb]">{project.problem}</p>
      </div>

      <div className="my-4">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent">
          What I built
        </div>
        <p className="text-[15px] leading-relaxed text-[#c3ccdb]">{project.built}</p>
      </div>

      <div className="my-6 flex flex-wrap gap-7">
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <div className="text-2xl font-bold text-accent">{metric.n}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted">{metric.label}</div>
          </div>
        ))}
      </div>

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
              className="border-b border-transparent text-[13px] font-semibold text-accent transition hover:border-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="grid grid-cols-1 items-center gap-9 py-16 md:grid-cols-2 md:gap-16"
    >
      {shot}
      {info}
    </motion.div>
  )
}
