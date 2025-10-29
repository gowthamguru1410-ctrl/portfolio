import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'

// Animated Stars with Depth - Optimized
function Stars({ count = 5000, reducedMotion = false }) {
  const ref = useRef()
  const rotationSpeed = useRef({ x: 0, y: 0 })
  
  // Generate random star positions with depth
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a sphere around camera
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Color variation - purple to blue gradient
      const colorMix = Math.random()
      colors[i * 3] = 0.4 + colorMix * 0.4     // R
      colors[i * 3 + 1] = 0.5 + colorMix * 0.3 // G
      colors[i * 3 + 2] = 0.9 + colorMix * 0.1 // B
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return
    
    // Smooth rotation with lerp for performance
    rotationSpeed.current.x = THREE.MathUtils.lerp(rotationSpeed.current.x, delta * 0.05, 0.1)
    rotationSpeed.current.y = THREE.MathUtils.lerp(rotationSpeed.current.y, delta * 0.075, 0.1)
    
    ref.current.rotation.x += rotationSpeed.current.x
    ref.current.rotation.y += rotationSpeed.current.y
    
    // Pulse effect - less frequent updates
    if (state.clock.getElapsedTime() % 0.1 < delta) {
      const time = state.clock.getElapsedTime()
      ref.current.material.size = 0.015 + Math.sin(time * 0.5) * 0.005
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Floating Particles with Physics - Optimized
function FloatingParticles({ count = 100, reducedMotion = false }) {
  const ref = useRef()
  const frameCount = useRef(0)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = []
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      })
    }
    
    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!ref.current || reducedMotion) return
    
    // Update every 2 frames for performance
    frameCount.current++
    if (frameCount.current % 2 !== 0) return
    
    const positions = ref.current.geometry.attributes.position.array
    
    for (let i = 0; i < count; i++) {
      // Update positions based on velocity
      positions[i * 3] += particles.velocities[i].x
      positions[i * 3 + 1] += particles.velocities[i].y
      positions[i * 3 + 2] += particles.velocities[i].z
      
      // Boundary check and wrap around
      if (Math.abs(positions[i * 3]) > 15) positions[i * 3] *= -1
      if (Math.abs(positions[i * 3 + 1]) > 15) positions[i * 3 + 1] *= -1
      if (Math.abs(positions[i * 3 + 2]) > 7.5) positions[i * 3 + 2] *= -1
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={particles.positions}>
      <PointMaterial
        transparent
        color="#667eea"
        size={0.05}
        sizeAttenuation={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Animated Gradient Plane (Background) - Optimized
function GradientPlane({ reducedMotion = false }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current || reducedMotion) return
    const time = state.clock.getElapsedTime()
    
    // Shift colors over time
    ref.current.material.uniforms.time.value = time
  })

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#0a0a0f') },
        color2: { value: new THREE.Color('#1a1a2e') },
        color3: { value: new THREE.Color('#16213e') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Animated gradient mixing
          float mixer1 = sin(time * 0.3 + uv.x * 2.0) * 0.5 + 0.5;
          float mixer2 = cos(time * 0.2 + uv.y * 2.0) * 0.5 + 0.5;
          
          vec3 color = mix(color1, color2, mixer1);
          color = mix(color, color3, mixer2 * 0.5);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    })
  }, [])

  return (
    <mesh ref={ref} position={[0, 0, -10]} material={shaderMaterial}>
      <planeGeometry args={[100, 100, 1, 1]} />
    </mesh>
  )
}

// Main Background Component with Performance Optimizations
export default function Background({ showStars = true, showParticles = true }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  // Reduce particle count based on device
  const starCount = useMemo(() => {
    const isMobile = window.innerWidth < 768
    if (prefersReducedMotion) return 0
    return isMobile ? 2000 : 5000
  }, [prefersReducedMotion])
  
  const particleCount = useMemo(() => {
    const isMobile = window.innerWidth < 768
    if (prefersReducedMotion) return 0
    return isMobile ? 50 : 100
  }, [prefersReducedMotion])
  
  // Fallback for devices without WebGL
  const FallbackBackground = useMemo(() => (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950" />
  ), [])
  
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={FallbackBackground}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
          }}
          frameloop={prefersReducedMotion ? "never" : "always"}
        >
          <GradientPlane reducedMotion={prefersReducedMotion} />
          {showStars && starCount > 0 && (
            <Stars count={starCount} reducedMotion={prefersReducedMotion} />
          )}
          {showParticles && particleCount > 0 && (
            <FloatingParticles count={particleCount} reducedMotion={prefersReducedMotion} />
          )}
          <ambientLight intensity={0.5} />
        </Canvas>
      </Suspense>
      
      {/* CSS Gradient Overlay for extra depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(240, 147, 251, 0.1) 0%, transparent 70%)
          `,
          animation: prefersReducedMotion ? 'none' : 'gradientShift 20s ease-in-out infinite',
        }}
      />
      
      {/* Animated vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 20%, rgba(10, 10, 15, 0.8) 100%)',
        }}
      />
    </div>
  )
}
