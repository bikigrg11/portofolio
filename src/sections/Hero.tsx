import { profile } from '../data/content'
import { HeroCanvas } from '../three/HeroCanvas'

export function Hero() {
  return (
    <>
      <HeroCanvas />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col justify-center px-[6vw] py-32">
        <span className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {profile.title} · NYC
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-fg sm:text-5xl md:text-6xl">
          I keep{' '}
          <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            100+ clusters
          </span>{' '}
          alive at scale.
        </h1>

        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{profile.blurb}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
          >
            View projects →
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-muted/40 px-6 py-3 font-semibold text-fg transition hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-16 flex flex-wrap gap-10">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-accent sm:text-4xl">{stat.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
