import { motion } from 'framer-motion'
import { experience, education } from '../data/content'
import { Section } from '../components/Section'

export function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <div className="relative">
        {/* Vertical timeline rule */}
        <div className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-gradient-to-b from-accent/60 via-muted/15 to-transparent sm:block" />

        <div className="flex flex-col gap-8">
          {experience.map((entry, index) => (
            <motion.div
              key={`${entry.company}-${entry.role}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              className="relative pl-0 sm:pl-10"
            >
              {/* Timeline dot */}
              <span
                className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg sm:block"
                aria-hidden="true"
              />

              <div className="rounded-2xl border border-muted/15 bg-bg2/60 p-6 backdrop-blur transition duration-300 hover:border-accent/40 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold text-fg sm:text-xl">{entry.role}</h3>
                  <span className="text-[13px] font-semibold text-accent">{entry.period}</span>
                </div>
                <p className="mt-1 text-[13px] text-muted">
                  {entry.company}
                  {entry.location ? ` · ${entry.location}` : ''}
                </p>

                <ul className="mt-4 flex flex-col gap-2.5">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-4 text-[14px] leading-relaxed text-[#c3ccdb]"
                    >
                      <span className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-10 text-[13px] text-muted sm:pl-10"
        >
          <span className="text-fg">{education.degree}</span> — {education.school} ·{' '}
          <span className="text-accent">{education.year}</span>
        </motion.p>
      </div>
    </Section>
  )
}
