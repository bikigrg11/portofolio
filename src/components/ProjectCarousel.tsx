import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { projects } from '../data/content'

const GAP = 260
const ROT = 42
const DEPTH = 340
const DIM = 0.5
const MAX_STACK = 4

// Mobile: tighter spacing so neighboring cards don't spill off-screen.
const GAP_MOBILE = 140
const DEPTH_MOBILE = 220
const MOBILE_BREAKPOINT_PX = 640

export function ProjectCarousel() {
  const [index, setIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT_PX,
  )
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ down: boolean; startX: number; moved: number }>({
    down: false,
    startX: 0,
    moved: 0,
  })
  const [dragOffset, setDragOffset] = useState(0)
  const wheelLock = useRef(false)

  const total = projects.length

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(total - 1, next)))
    },
    [total],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1)
      else if (e.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, go])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (wheelLock.current) return
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(d) > 10) {
        wheelLock.current = true
        go(index + (d > 0 ? 1 : -1))
        setTimeout(() => {
          wheelLock.current = false
        }, 450)
      }
    }
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [index, go])

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = { down: true, startX: e.clientX, moved: 0 }
    trackRef.current?.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.down) return
    const moved = e.clientX - dragState.current.startX
    dragState.current.moved = moved
    setDragOffset(moved * 0.25)
  }

  const endDrag = () => {
    if (!dragState.current.down) return
    dragState.current.down = false
    const moved = dragState.current.moved
    setDragOffset(0)
    if (moved < -60) go(index + 1)
    else if (moved > 60) go(index - 1)
  }

  const gap = isMobile ? GAP_MOBILE : GAP
  const depth = isMobile ? DEPTH_MOBILE : DEPTH

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm text-muted">
        <span className="font-semibold text-fg">{index + 1}</span> / {total}
      </p>

      <div
        className="relative h-[420px] w-full max-w-[420px] sm:h-[440px]"
        style={{ perspective: '1600px' }}
      >
        <div
          ref={trackRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateX(${dragOffset}px)`,
            touchAction: 'pan-y',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {projects.map((project, i) => {
            const off = i - index
            const abs = Math.abs(off)
            const x = off * gap
            const z = -abs * depth
            const ry = -off * ROT
            const sc = Math.max(0.6, 1 - abs * 0.12)
            const isActive = i === index
            const primaryLink = project.links[0]

            return (
              <div
                key={project.id}
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${sc})`,
                  opacity: abs > 2.6 ? 0 : 1,
                  zIndex: 100 - Math.round(abs),
                  filter: abs === 0 ? 'none' : `brightness(${1 - abs * DIM * 0.5})`,
                  transition: 'transform .6s cubic-bezier(.22,.61,.36,1), opacity .6s',
                  willChange: 'transform, opacity',
                  pointerEvents: abs > 2.6 ? 'none' : 'auto',
                }}
              >
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-md sm:p-8 ${
                    isActive ? 'border-accent/50' : 'border-muted/15'
                  }`}
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(34,230,214,.08), rgba(10,17,32,.55) 60%)',
                    boxShadow: '0 30px 80px rgba(0,0,0,.55)',
                  }}
                >
                  <div
                    className="pointer-events-none absolute -left-[30%] -top-[40%] h-[80%] w-[80%] rounded-full blur-[20px]"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(34,230,214,.22), transparent 70%)',
                    }}
                  />
                  <div className="relative text-3xl">{project.icon}</div>
                  <div className="relative mt-1.5 text-xs tracking-[2px] text-accent">
                    {project.num}
                  </div>
                  <h3 className="relative mb-2 mt-3.5 text-xl font-bold leading-tight text-fg sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="relative text-xs uppercase tracking-wide text-muted">
                    {project.category}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted line-clamp-4">
                    {project.built}
                  </p>
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    {project.stack.slice(0, MAX_STACK).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-muted/15 px-2.5 py-1 text-[11px] text-fg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {primaryLink && (
                    <a
                      href={primaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-3 text-[13px] font-semibold text-accent"
                    >
                      {primaryLink.label} ↗
                    </a>
                  )}
                  <div className="relative mt-auto pt-4 text-[11px] tracking-wide text-muted">
                    {project.year} · {project.role}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => go(index - 1)}
          className="grid h-12 w-12 place-items-center rounded-full border border-muted/15 bg-bg2/60 text-fg backdrop-blur transition hover:border-accent hover:text-accent hover:shadow-[0_0_24px_rgba(34,230,214,.4)]"
        >
          ‹
        </button>
        <div className="flex gap-2.5">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to ${project.title}`}
              onClick={() => go(i)}
              className={`h-[9px] rounded-full transition-all duration-200 ${
                i === index
                  ? 'w-[26px] bg-accent shadow-[0_0_12px_theme(colors.accent)]'
                  : 'w-[9px] bg-muted/15'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => go(index + 1)}
          className="grid h-12 w-12 place-items-center rounded-full border border-muted/15 bg-bg2/60 text-fg backdrop-blur transition hover:border-accent hover:text-accent hover:shadow-[0_0_24px_rgba(34,230,214,.4)]"
        >
          ›
        </button>
      </div>

      <p className="mt-4 text-xs tracking-wide text-muted">
        Drag · swipe · ← → arrows · click dots
      </p>
    </div>
  )
}
