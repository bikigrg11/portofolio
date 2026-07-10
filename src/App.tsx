import { Nav } from './components/Nav'
import { Section } from './components/Section'
import { Hero } from './sections/Hero'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Hero />
      <main>
        <Section id="work" eyebrow="Work" title="Work">
          <p className="text-muted">Placeholder — work experience coming soon.</p>
        </Section>
        <Section id="projects" eyebrow="Projects" title="Projects">
          <p className="text-muted">Placeholder — projects grid coming soon.</p>
        </Section>
        <Section id="stack" eyebrow="Stack" title="Stack">
          <p className="text-muted">Placeholder — skills/stack coming soon.</p>
        </Section>
        <Section id="contact" eyebrow="Contact" title="Contact">
          <p className="text-muted">Placeholder — contact info coming soon.</p>
        </Section>
      </main>
    </div>
  )
}

export default App
