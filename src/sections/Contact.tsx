import { profile } from '../data/content'
import { Section } from '../components/Section'

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build reliable things.">
      <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">
        Open to conversations about reliability, platform engineering, and interesting
        infrastructure problems. Reach out any time.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
        <a
          href={`mailto:${profile.email}`}
          className="border-b border-transparent text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
        >
          {profile.email}
        </a>
        <a
          href={`https://${profile.github}`}
          className="border-b border-transparent text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
        >
          {profile.github}
        </a>
        <a
          href={`https://${profile.linkedin}`}
          className="border-b border-transparent text-sm font-semibold text-fg transition hover:border-accent hover:text-accent"
        >
          {profile.linkedin}
        </a>
        <span className="text-sm text-muted">{profile.location}</span>
      </div>
    </Section>
  )
}
