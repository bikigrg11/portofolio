import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { Contact } from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen">
      {/* Dark veil over the 3D background so text stays readable — lighter at
          the hero (top), darker over the content-heavy sections below. Sits
          between the -z-10 canvas and the page content. */}
      <div
        className="pointer-events-none fixed inset-0 -z-[5]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,7,13,0.30) 0%, rgba(5,7,13,0.62) 55%, rgba(5,7,13,0.78) 100%)',
        }}
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
