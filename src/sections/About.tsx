import { profile } from '../data/content'
import { Section } from '../components/Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="About">
      <p className="max-w-[560px] text-base leading-relaxed text-muted sm:text-lg">
        {profile.blurb} I work as an SRE on DraftKings&apos; Cloud Compute team, keeping
        Kubernetes clusters reliable for live, latency-sensitive sportsbook traffic — and outside
        of work I like building side projects, from automation tooling to small trading and game
        experiments.
      </p>
    </Section>
  )
}
