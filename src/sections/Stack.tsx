import { skills } from '../data/content'
import { Section } from '../components/Section'

export function Stack() {
  return (
    <Section id="stack" eyebrow="Toolbox" title="The stack I run on">
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div
            key={group.group}
            className="group flex h-full flex-col rounded-2xl border border-muted/15 bg-bg2/40 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-bg2/60"
          >
            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-1 rounded-full bg-accent transition-all duration-300 group-hover:h-5" />
                <h3 className="text-[15px] font-semibold leading-snug text-fg">{group.group}</h3>
              </div>
              <span className="shrink-0 text-[11px] font-medium tabular-nums text-muted/70">
                {group.items.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-muted/10 bg-white/[.03] px-2.5 py-1.5 text-[12px] leading-tight text-[#c3ccdb] transition duration-200 hover:border-accent/40 hover:bg-accent/[.08] hover:text-accent"
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
