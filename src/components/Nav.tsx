import { useEffect, useState } from 'react'
import { KnotLogo } from './KnotLogo'

const LINKS = [
  { href: '#about', label: 'About', id: 'about' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#stack', label: 'Stack', id: 'stack' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

export function Nav() {
  const [active, setActive] = useState('about')
  const [progress, setProgress] = useState(0)

  // Scroll-progress bar under the nav.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-20 backdrop-blur bg-bg/50 border-b line">
      <div className="px-[5vw] sm:px-[6vw] h-14 sm:h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest text-fg whitespace-nowrap"
        >
          <KnotLogo />
          BIKI<span className="text-accent">.</span>GURUNG
        </a>
        <nav className="flex items-center gap-3 sm:gap-7">
          {LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 text-xs sm:text-sm transition-colors ${
                  isActive ? 'text-accent' : 'text-muted hover:text-accent'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>
      </div>
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-accent2"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    </header>
  )
}
