import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useWebGLSupported } from '../hooks/useWebGLSupported'
import { NodeGraph } from './NodeGraph'

const MOBILE_BREAKPOINT_PX = 700
const MOBILE_NODE_COUNT = 55
const DESKTOP_NODE_COUNT = 90

type HeroCanvasProps = {
  /**
   * Whether the hero is currently intersecting the viewport. When false the
   * R3F frameloop is stopped entirely (no useFrame ticks), saving perf/battery
   * while the user has scrolled past it. Defaults to true so the canvas
   * renders normally until a parent wires up visibility tracking.
   */
  isVisible?: boolean
}

/**
 * Full-bleed fixed background: the 3D node-graph when WebGL + motion are
 * available, otherwise a static gradient so nothing crashes or animates
 * against a user's accessibility preference.
 */
export function HeroCanvas({ isVisible = true }: HeroCanvasProps) {
  const webglSupported = useWebGLSupported()

  // Reactive reduced-motion detection that responds to OS settings changes
  const [reducedMotion, setReducedMotion] = useState(false)

  // Fewer nodes on small screens to keep the scene smooth on mobile GPUs.
  // Computed once at mount; the node count doesn't need to react live to
  // resize (rotating a phone doesn't cross the breakpoint in practice).
  const [nodeCount] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT_PX
      ? MOBILE_NODE_COUNT
      : DESKTOP_NODE_COUNT,
  )

  useEffect(() => {
    // Default for SSR/jsdom or if matchMedia is unavailable
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setReducedMotion(false)
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Set initial value
    setReducedMotion(mediaQuery.matches)

    // Subscribe to changes
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (!webglSupported || reducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(34,230,214,0.18), rgba(59,130,246,0.10) 45%, #05070d 80%)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <Canvas
      className="fixed inset-0 -z-10"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 14], fov: 55 }}
      frameloop={isVisible ? 'always' : 'never'}
    >
      <NodeGraph nodeCount={nodeCount} />
    </Canvas>
  )
}
