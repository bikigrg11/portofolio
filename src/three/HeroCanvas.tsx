import { Canvas } from '@react-three/fiber'
import { useWebGLSupported } from '../hooks/useWebGLSupported'
import { NodeGraph } from './NodeGraph'

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Full-bleed fixed background: the 3D node-graph when WebGL + motion are
 * available, otherwise a static gradient so nothing crashes or animates
 * against a user's accessibility preference.
 */
export function HeroCanvas() {
  const webglSupported = useWebGLSupported()
  const reducedMotion = prefersReducedMotion()

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
    >
      <NodeGraph />
    </Canvas>
  )
}
