import { skills } from '../data/content'
import { Section } from '../components/Section'

export function Stack() {
  return (
    <Section id="stack" eyebrow="Toolbox" title="The stack I run on">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div
            key={group.group}
            className="rounded-2xl border border-muted/20 bg-gradient-to-b from-white/[.02] to-transparent p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/40 hover:from-accent/[.06]"
          >
            <h3 className="mb-3 text-lg font-semibold text-fg">{group.group}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-muted/20 px-3 py-1 text-xs text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
