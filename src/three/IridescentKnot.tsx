import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'

// Iridescent shader ported from prototypes/4-monolith.html, retinted to the
// site's cyan/blue palette so it reads as an accent rather than a rainbow.
const vertexShader = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vPos;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 3.0 + uTime) * 0.04 + cos(p.y * 3.0 + uTime * 1.3) * 0.04;
    p += normal * w;
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    vPos = p;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vPos;
  uniform float uTime;
  void main() {
    float f = pow(1.0 - max(dot(vN, vView), 0.0), 2.2); // fresnel rim
    float shift = dot(vN, vView) * 1.5 + vPos.y * 0.4 + uTime * 0.25;
    vec3 cyan = vec3(0.133, 0.902, 0.839); // #22e6d6
    vec3 blue = vec3(0.231, 0.510, 0.965); // #3b82f6
    vec3 teal = vec3(0.20, 0.80, 0.90);
    vec3 body = mix(blue, cyan, 0.5 + 0.5 * sin(shift));
    body = mix(body, teal, 0.5 + 0.5 * sin(shift * 1.7));
    vec3 col = body * 0.45 + cyan * f * 1.6 + vec3(1.0) * f * 0.4;
    gl_FragColor = vec4(col, 1.0);
  }
`

/**
 * A small iridescent torus-knot accent that slowly rotates in the background,
 * echoing the "monolith" prototype in the site's cyan/blue palette.
 */
export function IridescentKnot(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    const mesh = meshRef.current
    if (mesh) {
      mesh.rotation.y += 0.12 * delta
      mesh.rotation.x += 0.05 * delta
    }
  })

  return (
    <mesh ref={meshRef} {...props}>
      <torusKnotGeometry args={[1.3, 0.42, 180, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
