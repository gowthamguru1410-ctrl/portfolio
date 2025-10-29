import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'

// Floating particles component
function FloatingParticles() {
  const ref = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()

  // Generate random particle positions in a sphere
  const particles = useMemo(() => {
    const temp = []
    const count = 1500 // Number of particles

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 3 + Math.random() * 5

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      temp.push(x, y, z)
    }

    return new Float32Array(temp)
  }, [])

  // Animate particles
  useFrame((state) => {
    if (prefersReducedMotion || !ref.current) return

    const time = state.clock.elapsedTime

    // Gentle rotation
    ref.current.rotation.x = time * 0.05
    ref.current.rotation.y = time * 0.075

    // Subtle pulsing effect
    const scale = 1 + Math.sin(time * 0.5) * 0.05
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <Points
      ref={ref}
      positions={particles}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#667eea"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Glowing orbs for accent
function GlowingOrbs() {
  const orbsRef = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()

  const orbData = useMemo(() => [
    { position: [-3, 2, -2], color: '#667eea', scale: 0.3 },
    { position: [3, -1, -3], color: '#764ba2', scale: 0.25 },
    { position: [0, 3, -4], color: '#f093fb', scale: 0.2 },
  ], [])

  useFrame((state) => {
    if (prefersReducedMotion) return

    const time = state.clock.elapsedTime

    orbsRef.current.forEach((orb, i) => {
      if (!orb) return

      const offset = i * Math.PI * 0.66
      
      // Floating motion
      orb.position.y += Math.sin(time * 0.5 + offset) * 0.002
      orb.position.x += Math.cos(time * 0.3 + offset) * 0.001
      
      // Gentle rotation
      orb.rotation.x = time * 0.2
      orb.rotation.y = time * 0.15
    })
  })

  return (
    <>
      {orbData.map((orb, index) => (
        <mesh
          key={index}
          ref={(el) => (orbsRef.current[index] = el)}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
          {/* Glow effect */}
          <mesh scale={1.5}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0.05}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </mesh>
      ))}
    </>
  )
}

// Main particle background component
export default function ParticleBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        performance={{ min: 0.5 }}
        gl={{
          alpha: true,
          antialias: false, // Disable for better performance
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: 'transparent' }}
      >
        {/* Subtle ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Glowing accent orbs */}
        <GlowingOrbs />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0f', 5, 15]} />
      </Canvas>
    </div>
  )
}

// Placeholder for lazy loading
export function ParticleBackgroundPlaceholder() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="w-full h-full bg-gradient-to-br from-primary-900/5 to-purple-900/5 animate-pulse"></div>
    </div>
  )
}
