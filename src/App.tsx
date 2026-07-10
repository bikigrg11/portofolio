import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { Contact } from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Uniform dark veil over the 3D background so text stays readable at a
          consistent dimness the whole way down (no fade-to-black on scroll).
          Sits between the -z-10 canvas and the page content. */}
      <div
        className="pointer-events-none fixed inset-0 -z-[5]"
        aria-hidden="true"
        style={{ background: 'rgba(5,7,13,0.58)' }}
      />
      <Nav />
      <Hero />
      <main>
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </div>
  )
}

export default App
