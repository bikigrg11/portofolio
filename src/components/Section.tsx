import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  children?: ReactNode
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="max-w-[1200px] mx-auto px-[6vw] py-[110px]">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          {eyebrow}
        </p>
      )}
      {title && <h2 className="text-fg text-3xl font-sans font-semibold mb-8">{title}</h2>}
      {children}
    </section>
  )
}
