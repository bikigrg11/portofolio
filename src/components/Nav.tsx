import { KnotLogo } from './KnotLogo'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-20 backdrop-blur bg-bg/50 border-b line">
      <div className="max-w-[1200px] mx-auto px-[5vw] sm:px-[6vw] h-14 sm:h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest text-fg whitespace-nowrap">
          <KnotLogo />
          BIKI<span className="text-accent">.</span>GURUNG
        </a>
        <nav className="flex items-center gap-3 sm:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
