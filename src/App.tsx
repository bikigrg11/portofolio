import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'
import { Contact } from './sections/Contact'

function App() {
  return (
    <div className="min-h-screen bg-bg">
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
