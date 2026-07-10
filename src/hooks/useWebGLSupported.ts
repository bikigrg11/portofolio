import { useEffect, useState } from 'react'

/**
 * Detects whether the browser can obtain a WebGL rendering context.
 * Defaults to `true` so SSR / test (jsdom) environments — which have no
 * real canvas/WebGL — don't accidentally suppress the 3D scene. Actual
 * unsupported browsers get flipped to `false` after the effect runs.
 */
export function useWebGLSupported(): boolean {
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
