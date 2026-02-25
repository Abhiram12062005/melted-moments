'use client'

import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

// Generate Voronoi-style fracture shapes
function generateFractureShapes(numPieces = 12) {
  const seeds: THREE.Vector2[] = Array.from({ length: numPieces }, (_, i) => {
    const angle = (i / numPieces) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
    const r = 0.15 + Math.random() * 0.6
    return new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r)
  })
  seeds.push(new THREE.Vector2(0.05, -0.05))

  return seeds.map((seed, idx) => {
    const sampleCount = 14
    const pts: THREE.Vector2[] = []

    for (let s = 0; s < sampleCount; s++) {
      const angle = (s / sampleCount) * Math.PI * 2
      const dir = new THREE.Vector2(Math.cos(angle), Math.sin(angle))
      let minT = 1.4

      for (let j = 0; j < seeds.length; j++) {
        if (j === idx) continue
        const other = seeds[j]
        const midX = (seed.x + other.x) / 2
        const midY = (seed.y + other.y) / 2
        const nx = other.x - seed.x
        const ny = other.y - seed.y
        const denom = dir.x * nx + dir.y * ny
        if (Math.abs(denom) > 0.001) {
          const t = ((midX - seed.x) * nx + (midY - seed.y) * ny) / denom
          if (t > 0.02 && t < minT) minT = t
        }
      }

      const distToEdge = 1.0 - Math.sqrt(seed.x * seed.x + seed.y * seed.y)
      minT = Math.min(minT, distToEdge + 0.15)
      pts.push(new THREE.Vector2(seed.x + dir.x * minT, seed.y + dir.y * minT))
    }

    const filtered = pts.filter((p) => Math.sqrt(p.x * p.x + p.y * p.y) <= 1.08)
    return { seed, points: filtered.length >= 3 ? filtered : pts, idx }
  })
}

// Single fracture piece
function FracturePiece({
  shape,
  broken,
  cookieRadius,
  cookieHeight,
}: {
  shape: { seed: THREE.Vector2; points: THREE.Vector2[]; idx: number }
  broken: boolean
  cookieRadius: number
  cookieHeight: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const posRef = useRef(new THREE.Vector3(shape.seed.x * cookieRadius, 0, shape.seed.y * cookieRadius))
  const velRef = useRef(
    new THREE.Vector3(
      shape.seed.x * (2 + Math.random() * 3.5),
      2.5 + Math.random() * 5,
      shape.seed.y * (2 + Math.random() * 3.5)
    )
  )
  const rotVel = useRef(
    new THREE.Vector3(
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 9
    )
  )

  const geometry = useMemo(() => {
    const pts = shape.points
    if (pts.length < 3) return new THREE.BoxGeometry(0.3, cookieHeight, 0.3)
    const shape2D = new THREE.Shape(
      pts.map((p) => new THREE.Vector2(p.x * cookieRadius, p.y * cookieRadius))
    )
    const extrudeSettings = {
      depth: cookieHeight,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 2,
    }
    return new THREE.ExtrudeGeometry(shape2D, extrudeSettings)
  }, [shape, cookieRadius, cookieHeight])

  const color = useMemo(() => {
    const colors = ['#7a4f2e', '#8B5E3C', '#6B4226', '#9B6B47', '#5c3620', '#a07040']
    return colors[shape.idx % colors.length]
  }, [shape.idx])

  useFrame((_, delta) => {
    if (!broken || !meshRef.current) return
    velRef.current.y -= 13 * delta
    posRef.current.addScaledVector(velRef.current, delta)
    meshRef.current.position.copy(posRef.current)
    meshRef.current.rotation.x += rotVel.current.x * delta
    meshRef.current.rotation.y += rotVel.current.y * delta
    meshRef.current.rotation.z += rotVel.current.z * delta
    if (posRef.current.y < -15) meshRef.current.visible = false
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[shape.seed.x * cookieRadius, -cookieHeight / 2, shape.seed.y * cookieRadius]}
      castShadow
    >
      <meshStandardMaterial color={color} roughness={0.88} metalness={0.0} />
    </mesh>
  )
}

// Chocolate chips
function ChocolateChips({ count = 18, radius }: { count?: number; radius: number }) {
  const chips = useMemo(
    () =>
      Array.from({ length: count }, () => {
        let x: number, z: number
        do {
          x = (Math.random() - 0.5) * radius * 1.7
          z = (Math.random() - 0.5) * radius * 1.7
        } while (Math.sqrt(x * x + z * z) > radius * 0.88)
        return { x, z, scale: 0.055 + Math.random() * 0.04 }
      }),
    [count, radius]
  )

  return (
    <>
      {chips.map((chip, i) => (
        <mesh key={i} position={[chip.x, 0.22, chip.z]} castShadow>
          <sphereGeometry args={[chip.scale, 7, 5]} />
          <meshStandardMaterial color="#120600" roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </>
  )
}

// Intact cookie
function IntactCookie({ radius, height }: { radius: number; height: number }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.25
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.08
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius * 0.96, height, 48, 3]} />
        <meshStandardMaterial color="#8B5E3C" roughness={0.9} metalness={0.0} />
      </mesh>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, 0.025, 48]} />
        <meshStandardMaterial color="#7a5230" roughness={0.95} />
      </mesh>
      <mesh>
        <torusGeometry args={[radius - 0.05, 0.07, 8, 48]} />
        <meshStandardMaterial color="#6B4226" roughness={0.85} />
      </mesh>
      {/* Surface crack hints */}
      <mesh position={[0, height / 2 + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[radius * 1.6, 0.02]} />
        <meshStandardMaterial color="#4a2e18" roughness={1} transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, height / 2 + 0.012, 0]} rotation={[-Math.PI / 2, 0, -0.85]}>
        <planeGeometry args={[radius * 1.3, 0.02]} />
        <meshStandardMaterial color="#4a2e18" roughness={1} transparent opacity={0.25} />
      </mesh>
      <ChocolateChips count={18} radius={radius} />
    </group>
  )
}

// Crumb explosion particles
function CrumbParticles({ explode }: { explode: boolean }) {
  const count = 70
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.6),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          Math.random() * 5 + 1,
          (Math.random() - 0.5) * 6
        ),
        scale: 0.015 + Math.random() * 0.045,
      })),
    []
  )

  useFrame((_, delta) => {
    if (!meshRef.current || !explode) return
    data.forEach((d, i) => {
      d.vel.y -= 10 * delta
      d.pos.addScaledVector(d.vel, delta)
      dummy.position.copy(d.pos)
      const s = Math.max(0.001, d.scale)
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="#8B5E3C" roughness={1} />
    </instancedMesh>
  )
}

// Ambient floating gold particles
function AmbientParticles() {
  const count = 45
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const positions = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 22,
      y: (Math.random() - 0.5) * 14,
      z: (Math.random() - 0.5) * 8 - 2,
      speed: 0.003 + Math.random() * 0.005,
    }))
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    positions.current.forEach((p, i) => {
      p.y += p.speed
      if (p.y > 7) p.y = -7
      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(clock.elapsedTime * 0.3 + i, clock.elapsedTime * 0.2 + i, 0)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.4} transparent opacity={0.5} />
    </instancedMesh>
  )
}

// Camera: positioned to center cookie nicely
function CameraSetup() {
  const { camera } = useThree()
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    cam.position.set(0, 2.2, 5.5)
    cam.lookAt(0, 0, 0)
    cam.fov = 42
    cam.updateProjectionMatrix()
  }, [camera])
  return null
}

// Inner scene
function CookieBreaker({ onBreakComplete }: { onBreakComplete?: () => void }) {
  const [broken, setBroken] = useState(false)
  const [explode, setExplode] = useState(false)
  const COOKIE_RADIUS = 1.4
  const COOKIE_HEIGHT = 0.42

  const fractureShapes = useMemo(() => generateFractureShapes(14), [])

  useEffect(() => {
    const t = setTimeout(() => {
      setExplode(true)
      setBroken(true)
      if (onBreakComplete) setTimeout(onBreakComplete, 350)
    }, 1800)
    return () => clearTimeout(t)
  }, [onBreakComplete])

  return (
    <>
      <CameraSetup />
      <AmbientParticles />
      <CrumbParticles explode={explode} />

      {!broken && <IntactCookie radius={COOKIE_RADIUS} height={COOKIE_HEIGHT} />}

      {broken &&
        fractureShapes.map((shape) => (
          <FracturePiece
            key={shape.idx}
            shape={shape}
            broken={broken}
            cookieRadius={COOKIE_RADIUS}
            cookieHeight={COOKIE_HEIGHT}
          />
        ))}
    </>
  )
}

export default function CookieScene({ onBreakComplete }: { onBreakComplete?: () => void }) {
  return (
    // Use 100% width/height — let the parent control dimensions
    // Do NOT use 100vw here as that ignores scrollbar width and causes layout overflow
    <Canvas
      camera={{ position: [0, 2.2, 5.5], fov: 42 }}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 10, 6]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#fff5e0"
      />
      <pointLight position={[-4, 4, -3]} intensity={0.9} color="#D4AF37" />
      <pointLight position={[0, -2, 5]} intensity={0.3} color="#8B4513" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <CookieBreaker onBreakComplete={onBreakComplete} />
      </Suspense>
    </Canvas>
  )
}