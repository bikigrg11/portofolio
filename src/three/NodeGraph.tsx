import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 90
const PULSE_COUNT = 40
const EDGE_DISTANCE = 2.4
const STAR_COUNT = 600

/**
 * Builds the fibonacci-ish sphere of node positions, matching
 * prototypes/1-cluster.html's layout so the visual ports 1:1.
 */
function useClusterGeometry() {
  return useMemo(() => {
    const nodes: THREE.Vector3[] = []
    const positions = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 5 + (i % 3) * 0.9
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT)
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
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
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
  }, [])
}

export function NodeGraph() {
  const { nodePositions, linePositions, edges, starPositions } = useClusterGeometry()

  const groupRef = useRef<THREE.Group>(null)
  const pointsMatRef = useRef<THREE.PointsMaterial>(null)
  const pulsePointsRef = useRef<THREE.Points>(null)

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

  // Pointer-driven drift target, mirroring the prototype's tx/ty interaction.
  const drift = useRef({ tx: 0, ty: 0 })
  const clock = useRef(0)

  useFrame((state, delta) => {
    clock.current += delta
    const t = clock.current

    const nx = state.pointer.x / 2
    const ny = -state.pointer.y / 2
    drift.current.tx = nx * 0.6
    drift.current.ty = ny * 0.6

    const group = groupRef.current
    if (group) {
      group.rotation.y += 0.0016 * (delta * 60)
      group.rotation.x = drift.current.ty * 0.5
    }

    state.camera.position.x += (drift.current.tx * 4 - state.camera.position.x) * 0.05
    state.camera.position.y += (-drift.current.ty * 4 - state.camera.position.y) * 0.05
    state.camera.lookAt(0, 0, 0)

    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = 0.6 + Math.sin(t * 2) * 0.15
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
        const v = a.clone().lerp(b, pu.t)
        arr[i * 3] = v.x
        arr[i * 3 + 1] = v.y
        arr[i * 3 + 2] = v.z
      })
      pulsePointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[nodePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={pointsMatRef}
            color="#22e6d6"
            size={0.16}
            transparent
            opacity={0.95}
            sizeAttenuation
          />
        </points>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.22} />
        </lineSegments>

        <points ref={pulsePointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[pulsePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#ffffff"
            size={0.18}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#33507a" size={0.08} transparent opacity={0.6} />
      </points>
    </>
  )
}
