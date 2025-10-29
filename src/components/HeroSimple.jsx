import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { useLenis } from '../lib/lenis'
import { motion } from 'framer-motion'

// Premium Hero without heavy 3D dependencies
export default function HeroSimple() {
  const glassPanelRef = useRef()
  const scrollIndicatorRef = useRef()
  const titleRef = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollTo } = useLenis()
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse parallax effect
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  // Title animation
  useEffect(() => {
    if (!titleRef.current || prefersReducedMotion) return

    gsap.from(titleRef.current.children, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [prefersReducedMotion])

  // Glass panel animation
  useEffect(() => {
    if (!glassPanelRef.current || prefersReducedMotion) return

    gsap.from(glassPanelRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1.2,
      delay: 0.5,
      ease: 'power3.out',
    })
  }, [prefersReducedMotion])

  // Scroll indicator animation
  useEffect(() => {
    if (!scrollIndicatorRef.current || prefersReducedMotion) return

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [prefersReducedMotion])

  const scrollToSection = (sectionId) => {
    if (scrollTo) {
      scrollTo(sectionId, { 
        offset: 0, 
        duration: 1.8,
      })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl float-animation"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-purple-500/20 rounded-full blur-3xl float-animation"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl float-animation"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        {/* Floating 3D-style text (CSS only) */}
        <div 
          ref={titleRef}
          className="mb-8"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center leading-none">
            <span 
              className="block text-gradient-premium mb-4" 
              style={{ 
                textShadow: '0 0 60px rgba(99, 102, 241, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)',
                filter: 'none',
              }}
            >
              Hi 👋
            </span>
            <span 
              className="block text-white" 
              style={{ 
                textShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
                filter: 'none',
              }}
            >
              I'm Gowtham
            </span>
          </h1>
        </div>

        {/* Glass Panel with Role */}
        <motion.div
          ref={glassPanelRef}
          className="glass-card px-8 py-6 max-w-2xl w-full"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-center text-gray-200">
            <span className="text-gradient-premium font-semibold">Full Stack Developer</span>
            {' '}<span className="text-gray-400">|</span>{' '}
            <span className="text-gradient-premium font-semibold">Creative Engineer</span>
          </p>
          <p className="text-center text-gray-400 mt-3 text-sm md:text-base">
            Crafting immersive digital experiences with cutting-edge technology
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button 
              onClick={() => scrollToSection('#projects')}
              className="btn-premium"
            >
              View My Work
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-outline-premium"
            >
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 font-light uppercase tracking-wider">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full glow-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/40 pointer-events-none z-5"></div>
    </section>
  )
}
