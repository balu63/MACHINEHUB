import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

function Core() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.x = state.clock.elapsedTime * 0.2
    group.current.rotation.y = state.clock.elapsedTime * 0.35
  })

  const orbitNodes = useMemo(
    () => [
      [-2.2, 0.8, 0.8],
      [2.2, -0.6, -0.3],
      [1.3, 1.9, 0.4],
      [-1.6, -1.7, 0.7],
      [0, 2.4, 0.6],
      [0, -2.4, -0.4],
    ],
    [],
  )

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <MeshDistortMaterial
            color="#d8d4ca"
            emissive="#b7c5d0"
            emissiveIntensity={0.15}
            metalness={0.9}
            roughness={0.22}
            distort={0.18}
            speed={2}
            transparent
            opacity={0.95}
          />
        </mesh>
      </Float>

      {orbitNodes.map(([x, y, z], index) => (
        <Float key={index} speed={1.5 + index / 10} rotationIntensity={1.2} floatIntensity={1.2}>
          <mesh position={[x, y, z]}>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#b8cbc3" emissive="#7dd3a7" emissiveIntensity={0.9} />
          </mesh>
        </Float>
      ))}

      <Line
        points={[
          [-2.2, 0.8, 0.8],
          [0, 0, 0],
          [1.3, 1.9, 0.4],
        ]}
        color="#d9c7a5"
        lineWidth={0.7}
        transparent
        opacity={0.6}
      />
      <Line
        points={[
          [2.2, -0.6, -0.3],
          [0, 0, 0],
          [-1.6, -1.7, 0.7],
        ]}
        color="#d7d9d0"
        lineWidth={0.7}
        transparent
        opacity={0.6}
      />
      <Line
        points={[
          [0, 2.4, 0.6],
          [0, 0, 0],
          [0, -2.4, -0.4],
        ]}
        color="#cfaec8"
        lineWidth={0.7}
        transparent
        opacity={0.6}
      />

      <group rotation={[0, 0, 1.2]}>
        <mesh position={[-2.4, 0, 0]} rotation={[0.2, 0.3, 0.7]}>
          <boxGeometry args={[1.5, 0.12, 1.5]} />
          <meshStandardMaterial color="#1a1d20" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[2.5, 0, 0]} rotation={[0.5, 0.8, -0.4]}>
          <boxGeometry args={[1.6, 0.12, 1.6]} />
          <meshStandardMaterial color="#171b1e" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  )
}

function ParticleField() {
  const ref = useRef<Group>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, idx) => ({
        id: idx,
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 6,
        scale: 0.03 + Math.random() * 0.08,
      })),
    [],
  )

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.08
  })

  return (
    <group ref={ref}>
      {particles.map((particle) => (
        <mesh key={particle.id} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshStandardMaterial color="#d3d9d5" emissive="#d3d9d5" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

export function MachineScene() {
  return (
    <div className="machine-scene-wrap">
      <Canvas camera={{ position: [0, 0, 6.4], fov: 42 }}>
        <color attach="background" args={['#07080a']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 4, 4]} intensity={1.6} color="#f2f4f1" />
        <directionalLight position={[-6, -2, 4]} intensity={1.1} color="#cbb9ff" />

        <ParticleField />
        <Core />
      </Canvas>
    </div>
  )
}
