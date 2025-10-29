import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { useLenis } from '../lib/lenis'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { rafThrottle } from '../utils/debounce'

// Main Hero Component
export default function Hero() {
  const heroTextRef = useRef()
  const glassPanelRef = useRef()
  const scrollIndicatorRef = useRef()
  const titleWordsRef = useRef([])
  const profileImageRef = useRef()
  const techBadgesRef = useRef()
  const floatingElementsRef = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollTo } = useLenis()
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typewriterText, setTypewriterText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Tech stack badges to display
  const techStack = ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'MongoDB']
  
  // Roles for typewriter effect
  const roles = [
    'Full Stack Developer',
    'Creative Engineer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Innovator'
  ]

  // Mouse parallax effect with RAF throttle for performance
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = rafThrottle((e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    })

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  // Typewriter effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypewriterText(roles[0])
      return
    }

    const currentRole = roles[currentRoleIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typewriterText.length < currentRole.length) {
          setTypewriterText(currentRole.slice(0, typewriterText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        // Deleting
        if (typewriterText.length > 0) {
          setTypewriterText(currentRole.slice(0, typewriterText.length - 1))
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [typewriterText, isDeleting, currentRoleIndex, prefersReducedMotion, roles])

  // Hero text animation - Split text reveal
  useEffect(() => {
    if (!heroTextRef.current || prefersReducedMotion || titleWordsRef.current.length === 0) {
      if (titleWordsRef.current.length > 0) {
        gsap.set(titleWordsRef.current, { opacity: 1, y: 0, scale: 1, rotationX: 0 })
      }
      return
    }

    const tl = gsap.timeline({ delay: 0.3 })
    
    // Animate each word individually
    titleWordsRef.current.forEach((word, index) => {
      tl.fromTo(word, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -90,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, index * 0.1)
    })
    
    return () => tl.kill()
  }, [prefersReducedMotion])

  // Profile image animation
  useEffect(() => {
    if (!profileImageRef.current || prefersReducedMotion) {
      if (profileImageRef.current) {
        gsap.set(profileImageRef.current, { opacity: 1, scale: 1, rotation: 0 })
      }
      return
    }

    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(profileImageRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: -180,
    }, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    })

    // Continuous floating animation
    gsap.to(profileImageRef.current, {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    
    return () => tl.kill()
  }, [prefersReducedMotion])

  // Glass panel animation
  useEffect(() => {
    if (!glassPanelRef.current || prefersReducedMotion) {
      if (glassPanelRef.current) {
        gsap.set(glassPanelRef.current, { opacity: 1, y: 0, scale: 1 })
      }
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(glassPanelRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.9,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      delay: 1.2,
      ease: 'power3.out',
    })
    
    return () => tl.kill()
  }, [prefersReducedMotion])

  // Tech badges animation
  useEffect(() => {
    if (!techBadgesRef.current || prefersReducedMotion) {
      if (techBadgesRef.current) {
        const badges = techBadgesRef.current.querySelectorAll('.tech-badge')
        gsap.set(badges, { opacity: 1, y: 0, scale: 1 })
      }
      return
    }

    const badges = techBadgesRef.current.querySelectorAll('.tech-badge')
    const tl = gsap.timeline({ delay: 1.5 })
    
    badges.forEach((badge, index) => {
      tl.fromTo(badge, {
        opacity: 0,
        y: 30,
        scale: 0.5,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, index * 0.08)
    })
    
    return () => tl.kill()
  }, [prefersReducedMotion])

  // Floating decorative elements
  useEffect(() => {
    if (floatingElementsRef.current.length === 0 || prefersReducedMotion) return

    floatingElementsRef.current.forEach((el, index) => {
      if (!el) return
      
      gsap.to(el, {
        y: `${index % 2 === 0 ? '-' : '+'}=${20 + index * 5}`,
        x: `${index % 2 === 0 ? '+' : '-'}=${10 + index * 3}`,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })
    })
  }, [prefersReducedMotion])

  // Scroll indicator animation
  useEffect(() => {
    if (!scrollIndicatorRef.current || prefersReducedMotion) return

    gsap.to(scrollIndicatorRef.current, {
      y: 15,
      duration: 1.8,
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950">
      {/* Animated Background Blobs with Parallax */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl float-animation"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.6s ease-out',
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-purple-500/15 rounded-full blur-3xl float-animation"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.6s ease-out',
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl float-animation"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.6s ease-out',
          }}
        ></div>

        {/* Floating Geometric Elements */}
        <div 
          ref={(el) => (floatingElementsRef.current[0] = el)}
          className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-primary-400/30 rounded-lg rotate-45 pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)` }}
        ></div>
        <div 
          ref={(el) => (floatingElementsRef.current[1] = el)}
          className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-purple-400/30 rounded-full pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` }}
        ></div>
        <div 
          ref={(el) => (floatingElementsRef.current[2] = el)}
          className="absolute top-1/3 left-1/4 w-12 h-12 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-md rotate-12 pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        ></div>
        <div 
          ref={(el) => (floatingElementsRef.current[3] = el)}
          className="absolute bottom-1/3 right-1/3 w-8 h-8 border-2 border-pink-400/40 rounded-sm rotate-45 pointer-events-none"
          style={{ transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)` }}
        ></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mx-auto lg:mx-0"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-body text-sm text-gray-300">Available for opportunities</span>
          </motion.div>

          {/* Main Heading with Split Text Animation */}
          <div ref={heroTextRef} className="relative">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter">
              <div className="mb-3">
                <span 
                  ref={(el) => (titleWordsRef.current[0] = el)}
                  className="inline-block mr-4 text-gray-100"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  Hi
                </span>
                <span 
                  ref={(el) => (titleWordsRef.current[1] = el)}
                  className="inline-block text-gradient-cosmic"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    textShadow: '0 0 40px rgba(102, 126, 234, 0.5), 0 0 80px rgba(118, 75, 162, 0.3)'
                  }}
                >
                  👋
                </span>
              </div>
              <div className="mb-3">
                <span 
                  ref={(el) => (titleWordsRef.current[2] = el)}
                  className="inline-block mr-4 text-gray-100"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  I'm
                </span>
                <span 
                  ref={(el) => (titleWordsRef.current[3] = el)}
                  className="inline-block text-gradient-cosmic"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    textShadow: '0 0 40px rgba(102, 126, 234, 0.5), 0 0 80px rgba(118, 75, 162, 0.3)'
                  }}
                >
                  Gowtham
                </span>
              </div>
            </h1>
          </div>

          {/* Role Description */}
          <motion.div
            ref={glassPanelRef}
            className="space-y-4"
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 min-h-[3rem] md:min-h-[4rem]">
              <span className="text-gradient-cosmic">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>
            <p className="font-body text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              <span className="text-primary-400 font-semibold">4+ years of experience</span> in software development, 
              crafting immersive digital experiences with cutting-edge technology. 
              Specialized in building scalable web applications and interactive user interfaces.
            </p>
          </motion.div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 justify-center lg:justify-start">
            <motion.a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="font-body text-sm text-gray-300 group-hover:text-blue-400 transition-colors">LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-body text-sm text-gray-300 group-hover:text-purple-400 transition-colors">GitHub</span>
            </motion.a>

            <motion.a
              href="mailto:your.email@gmail.com"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              <span className="font-body text-sm text-gray-300 group-hover:text-red-400 transition-colors">Gmail</span>
            </motion.a>
          </div>

          {/* Tech Stack Badges */}
          <div ref={techBadgesRef} className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="tech-badge px-4 py-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-lg font-body text-sm font-medium text-gray-300 hover:border-primary-400/50 hover:from-primary-500/20 hover:to-purple-500/20 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <MagneticButton 
              onClick={() => scrollToSection('#projects')}
              className="btn-premium group"
              strength={0.4}
            >
              <span className="flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </MagneticButton>
            <MagneticButton 
              onClick={() => scrollToSection('#contact')}
              className="btn-outline-premium group"
              strength={0.4}
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Side - Profile Image with Decorations */}
        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="relative">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-110"></div>
            
            {/* Rotating Border Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 p-[2px]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
            />

            {/* Profile Image Container */}
            <motion.div
              ref={profileImageRef}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              }}
            >
              {/* Placeholder with Gradient and Icon */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-900/50 via-purple-900/50 to-pink-900/50">
                <div className="text-center">
                  <div className="text-8xl mb-4">👨‍💻</div>
                  <div className="font-heading text-white/70 text-lg">Gowtham</div>
                  <div className="font-body text-white/50 text-sm">Software Developer</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Mini Badges Around Image */}
            <motion.div
              className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-body text-white text-sm font-bold">4+ Years Exp</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="font-body text-white text-sm font-bold">Full Stack</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">⚡</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={() => scrollToSection('#about')}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-heading text-xs text-gray-400 font-semibold uppercase tracking-widest shimmer">
              Scroll to Explore
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2 glow-pulse hover:border-primary-400/50 transition-colors">
              <div className="w-1.5 h-1.5 bg-primary-400 rounded-full shadow-glow"></div>
            </div>
            <svg 
              className="w-5 h-5 text-primary-400 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
      )}

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-gray-950/50 pointer-events-none z-5"></div>
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.7) 100%)',
        }}
      ></div>
    </section>
  )
}
