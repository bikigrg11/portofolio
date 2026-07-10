import { Nav } from './components/Nav'
import { Section } from './components/Section'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Stack } from './sections/Stack'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Hero />
      <main>
        <About />
        <Section id="projects" eyebrow="Projects" title="Projects">
          <p className="text-muted">Placeholder — projects grid coming soon.</p>
        </Section>
        <Stack />
        <Section id="contact" eyebrow="Contact" title="Contact">
          <p className="text-muted">Placeholder — contact info coming soon.</p>
        </Section>
      </main>
    </div>
  )
}

export default App
