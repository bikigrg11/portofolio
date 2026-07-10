const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-20 backdrop-blur bg-bg/50 border-b line">
      <div className="max-w-[1200px] mx-auto px-[6vw] h-16 flex items-center justify-between">
        <a href="#" className="font-sans text-sm font-semibold tracking-widest text-fg">
          BIKI<span className="text-accent">.</span>GURUNG
        </a>
        <nav className="flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
