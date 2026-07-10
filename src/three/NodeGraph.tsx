import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DEFAULT_NODE_COUNT = 90
const PULSE_COUNT = 40
const EDGE_DISTANCE = 2.4
const STAR_COUNT = 600

/**
 * Builds the fibonacci-ish sphere of node positions, matching
 * prototypes/1-cluster.html's layout so the visual ports 1:1.
 */
function useClusterGeometry(nodeCount: number) {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = []
    const positions = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      const r = 5 + (i % 3) * 0.9
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const p = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
      nodes.push(p)
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }

    const linePositions: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < EDGE_DISTANCE) {
          linePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z,
          )
        }
      }
    }

    const edges: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < linePositions.length; i += 6) {
      edges.push([
        new THREE.Vector3(linePositions[i], linePositions[i + 1], linePositions[i + 2]),
        new THREE.Vector3(linePositions[i + 3], linePositions[i + 4], linePositions[i + 5]),
      ])
    }

    const starPositions = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60
    }

    return {
      nodePositions: positions,
      linePositions: new Float32Array(linePositions),
      edges,
      starPositions,
    }
  }, [nodeCount])
}

type NodeGraphProps = {
  /** Number of cluster nodes to render; lower on small screens for perf. */
  nodeCount?: number
}

export function NodeGraph({ nodeCount = DEFAULT_NODE_COUNT }: NodeGraphProps) {
  const { nodePositions, linePositions, edges, starPositions } = useClusterGeometry(nodeCount)

  const groupRef = useRef<THREE.Group>(null)
  const pointsMatRef = useRef<THREE.PointsMaterial>(null)
  const pulsePointsRef = useRef<THREE.Points>(null)
  const starsRef = useRef<THREE.Points>(null)

  const pulses = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * Math.max(edges.length, 1)),
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.01,
      })),
    [edges.length],
  )

  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), [])

  // Reusable scratch vector to avoid per-frame allocations in pulse loop
  const scratchVector = useMemo(() => new THREE.Vector3(), [])

  // Soft circular sprite so points render as round dots, not square pixels.
  const dotTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.55, 'rgba(255,255,255,1)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Pointer-driven drift target, mirroring the prototype's tx/ty interaction.
  const drift = useRef({ tx: 0, ty: 0 })
  const clock = useRef(0)

  // Scroll progress (0..1) feeds a gentle parallax rotation/zoom of the whole
  // graph as the page scrolls — a background-only animation that never touches
  // text legibility.
  const scrollProgress = useRef(0)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    clock.current += delta
    const t = clock.current

    const nx = state.pointer.x / 2
    const ny = -state.pointer.y / 2
    drift.current.tx = nx * 0.6
    drift.current.ty = ny * 0.6

    const scroll = scrollProgress.current

    const group = groupRef.current
    if (group) {
      // continuous slow spin + extra rotation driven by scroll position
      group.rotation.y += 0.0016 * (delta * 60) + scroll * 0.0006
      group.rotation.x = drift.current.ty * 0.5 + scroll * 0.6
    }

    state.camera.position.x += (drift.current.tx * 4 - state.camera.position.x) * 0.05
    state.camera.position.y += (-drift.current.ty * 4 - state.camera.position.y) * 0.05
    // gentle parallax dolly: pull back a little as the page scrolls down
    const targetZ = 14 + scroll * 6
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05
    state.camera.lookAt(0, 0, 0)

    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = 0.42 + Math.sin(t * 2) * 0.1
    }

    // Slow drift of the starfield so the background pixels feel alive,
    // echoing the carousel prototype's rotating stars.
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00025 * (delta * 60)
      starsRef.current.rotation.x += 0.0001 * (delta * 60)
    }

    if (edges.length > 0 && pulsePointsRef.current) {
      const arr = pulsePointsRef.current.geometry.attributes.position.array as Float32Array
      pulses.forEach((pu, i) => {
        pu.t += pu.speed
        if (pu.t > 1) {
          pu.t = 0
          pu.edge = Math.floor(Math.random() * edges.length)
        }
        const [a, b] = edges[pu.edge]
        scratchVector.lerpVectors(a, b, pu.t)
        arr[i * 3] = scratchVector.x
        arr[i * 3 + 1] = scratchVector.y
        arr[i * 3 + 2] = scratchVector.z
      })
      pulsePointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={pointsMatRef}
            color="#22e6d6"
            size={0.09}
            map={dotTexture}
            alphaTest={0.01}
            transparent
            opacity={0.95}
            sizeAttenuation
          />
        </points>

        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.12} />
        </lineSegments>

        <points ref={pulsePointsRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[pulsePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ffffff"
            size={0.12}
            map={dotTexture}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <points ref={starsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#22e6d6"
          size={0.045}
          map={dotTexture}
          alphaTest={0.01}
          transparent
          opacity={0.28}
          sizeAttenuation
        />
      </points>
    </>
  )
}
