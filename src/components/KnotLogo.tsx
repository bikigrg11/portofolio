import { Canvas } from '@react-three/fiber'
import { IridescentKnot } from '../three/IridescentKnot'

/**
 * Small live-spinning version of the background's iridescent knot, used as the
 * brand mark in the nav. Its own tiny WebGL canvas (transparent) so it tumbles
 * independently of the page background.
 */
export function KnotLogo() {
  return (
    <div className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true }}
        frameloop="always"
      >
        <IridescentKnot scale={0.95} />
      </Canvas>
    </div>
  )
}
