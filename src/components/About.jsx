import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function About() {
  const sectionRef = useRef()
  const photoRef = useRef()
  const textRefs = useRef([])
  const parallaxLayerRef = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Initialize visibility immediately to prevent blank content
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated && !prefersReducedMotion) {
        // Fallback: show content if animation hasn't started
        if (photoRef.current) gsap.set(photoRef.current, { opacity: 1, clearProps: 'transform' })
        textRefs.current.forEach(text => {
          if (text) gsap.set(text, { opacity: 1, clearProps: 'transform' })
        })
        setHasAnimated(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasAnimated, prefersReducedMotion])

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setMousePosition({ x, y })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!photoRef.current) return

    if (prefersReducedMotion) {
      // Show everything immediately if reduced motion
      gsap.set(photoRef.current, { opacity: 1, scale: 1, rotation: 0, clearProps: 'all' })
      textRefs.current.forEach(text => {
        if (text) gsap.set(text, { opacity: 1, x: 0, clearProps: 'all' })
      })
      setHasAnimated(true)
      return
    }

    if (hasAnimated) return

    const ctx = gsap.context(() => {
      // Photo entrance animation with dramatic tilt and scale
      if (photoRef.current) {
        gsap.fromTo(photoRef.current, {
          scale: 0.5,
          opacity: 0,
          rotation: -15,
        }, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.6)',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
            once: true,
            onEnter: () => setHasAnimated(true),
          },
        })
      }

      // Animated text paragraphs sliding in with stagger
      textRefs.current.forEach((text, index) => {
        if (!text) return
        
        gsap.fromTo(text, {
          x: 100,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
            once: true,
          },
        })
      })

      // Subtle parallax on scroll
      if (!isMobile && parallaxLayerRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            
            // Parallax for background layer
            if (parallaxLayerRef.current) {
              gsap.to(parallaxLayerRef.current, {
                y: progress * 100,
                duration: 0.3,
              })
            }
            
            // Counter-parallax for photo
            if (photoRef.current) {
              gsap.to(photoRef.current, {
                y: progress * -50,
                duration: 0.3,
              })
            }
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, isMobile, hasAnimated])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Animated Background with Parallax */}
      <div 
        ref={parallaxLayerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span 
              className="text-gradient-premium inline-block"
              style={{
                textShadow: '0 0 80px rgba(102, 126, 234, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Passionate about creating <span className="text-primary-400 font-semibold">immersive digital experiences</span> that 
            push the boundaries of web technology
          </p>
        </motion.div>

        {/* Split Layout - Photo & Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto mb-32">
          {/* Left Side - Photo with Glow & Tilt */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              ref={photoRef}
              style={{ 
                opacity: hasAnimated || prefersReducedMotion ? 1 : undefined,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                transition: 'transform 0.4s ease-out',
              }}
              whileHover={{ 
                rotateY: 15,
                rotateX: -5,
                scale: 1.08,
                transition: { duration: 0.6, ease: 'power2.out' }
              }}
              className="relative group cursor-pointer"
            >
              {/* Multi-layer Animated Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-700" 
                style={{
                  animation: 'float-animation 8s ease-in-out infinite',
                }}
              />
              <div className="absolute -inset-8 bg-gradient-to-r from-pink-500 via-purple-500 to-primary-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700" 
                style={{
                  animation: 'float-animation 6s ease-in-out infinite reverse',
                }}
              />
              
              {/* Photo Container with 3D border */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                style={{
                  boxShadow: `
                    0 0 60px rgba(102, 126, 234, 0.4),
                    0 20px 60px rgba(0, 0, 0, 0.5),
                    inset 0 0 40px rgba(255, 255, 255, 0.1)
                  `,
                }}
              >
                {/* Gradient Avatar */}
                <div className="w-full h-full bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
                  {/* Animated shimmer overlay */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      animation: 'shimmer 3s ease-in-out infinite',
                    }}
                  />
                  <span className="text-9xl md:text-[12rem] relative z-10">👨‍💻</span>
                </div>
                {/* Replace with your photo: */}
                {/* <img 
                  src="/path/to/your/photo.jpg" 
                  alt="Gowtham" 
                  className="w-full h-full object-cover"
                /> */}
              </div>

              {/* Floating Accent Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 w-12 h-12 bg-primary-500 rounded-full blur-md opacity-80"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 w-10 h-10 bg-purple-500 rounded-full blur-md opacity-80"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-1/4 -left-8 w-8 h-8 bg-pink-500 rounded-full blur-sm"
              />

              {/* Stats Cards with Glass Effect */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                whileHover={{ scale: 1.05, x: -5 }}
                className="absolute -left-8 top-1/4 glass-card px-6 py-4 hidden lg:block border-2 border-primary-500/30"
              >
                <div className="text-3xl font-bold text-gradient-premium">4+</div>
                <div className="text-sm text-gray-300 font-medium">Years Exp</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="absolute -right-8 bottom-1/4 glass-card px-6 py-4 hidden lg:block border-2 border-purple-500/30"
              >
                <div className="text-3xl font-bold text-gradient-premium">20+</div>
                <div className="text-sm text-gray-300 font-medium">Projects</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Animated Content */}
          <div className="space-y-8">
            {/* Text Paragraphs with Slide-in Animation */}
            <div className="space-y-6">
              <p
                ref={(el) => (textRefs.current[0] = el)}
                style={{ opacity: hasAnimated || prefersReducedMotion ? 1 : undefined }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed"
              >
                Hi! I'm <span className="text-gradient-premium font-bold text-2xl">Gowtham</span>, 
                a passionate <span className="text-primary-400 font-semibold">full-stack developer</span> with <span className="text-primary-400 font-semibold">4+ years of experience</span> creating 
                digital experiences that seamlessly blend cutting-edge technology with beautiful, intuitive design.
              </p>
              <p
                ref={(el) => (textRefs.current[1] = el)}
                style={{ opacity: hasAnimated || prefersReducedMotion ? 1 : undefined }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed"
              >
                My journey began with a simple curiosity about how the web works and has evolved into a 
                deep passion for building <span className="text-purple-400 font-semibold">scalable, performant applications</span> that 
                solve real-world problems and delight users.
              </p>
              <p
                ref={(el) => (textRefs.current[2] = el)}
                style={{ opacity: hasAnimated || prefersReducedMotion ? 1 : undefined }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed"
              >
                I specialize in creating <span className="text-pink-400 font-semibold">immersive 3D web experiences</span> using 
                modern frameworks, WebGL, and interactive animations—always pushing the boundaries of what's 
                possible in the browser.
              </p>
            </div>

            {/* What I Do - Glass Card */}
            <motion.div
              ref={(el) => (textRefs.current[3] = el)}
              style={{ opacity: hasAnimated || prefersReducedMotion ? 1 : undefined }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-8 border-2 border-primary-500/20"
            >
              <h3 className="text-3xl font-bold mb-6">
                <span className="text-gradient-premium">What I Do</span>
              </h3>
              <ul className="space-y-4 text-gray-300">
                {[
                  { icon: '🎨', text: 'Frontend Development with React/Next.js & TypeScript' },
                  { icon: '⚙️', text: 'Backend APIs with Node.js, Python & GraphQL' },
                  { icon: '🗄️', text: 'Database Design & Optimization (SQL/NoSQL)' },
                  { icon: '☁️', text: 'Cloud Architecture & DevOps (AWS/Docker/K8s)' },
                  { icon: '✨', text: '3D Graphics, WebGL & Interactive Animations' },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-start gap-4 group cursor-default"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                    <span className="text-lg pt-1">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info Quick Access */}
            <motion.div
              ref={(el) => (textRefs.current[3.5] = el)}
              style={{ opacity: hasAnimated || prefersReducedMotion ? 1 : undefined }}
              className="glass-card p-6 border-2 border-purple-500/20"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-gradient-premium">📬 Contact Info</span>
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3 group hover:text-red-400 transition-colors">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  <span className="text-sm">your.email@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 group hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-3 group hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">City, Country</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              ref={(el) => (textRefs.current[4] = el)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton 
                className="btn-premium text-lg px-8 py-4"
                strength={0.4}
              >
                Download Resume
              </MagneticButton>
              <MagneticButton 
                className="btn-outline-premium text-lg px-8 py-4"
                strength={0.4}
              >
                View Certifications
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Interactive Skills Showcase Section */}
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold mb-16 text-center"
          >
            <span className="text-gradient-premium">Skills & Expertise</span>
          </motion.h3>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Animated Skill Circles Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative h-96 glass-card rounded-2xl overflow-hidden border-2 border-primary-500/20 p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)',
              }}
            >
              {/* Skill Circles Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Center Core */}
                <motion.div 
                  className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-glow-lg z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span className="text-3xl">⚡</span>
                </motion.div>

                {/* Orbiting Skills */}
                {[
                  { name: 'React', color: 'from-blue-400 to-cyan-400', angle: 0, icon: '⚛️' },
                  { name: 'Node.js', color: 'from-green-400 to-emerald-400', angle: 60, icon: '🟢' },
                  { name: 'TypeScript', color: 'from-blue-500 to-blue-600', angle: 120, icon: '📘' },
                  { name: 'Python', color: 'from-yellow-400 to-blue-500', angle: 180, icon: '🐍' },
                  { name: 'Three.js', color: 'from-gray-700 to-gray-900', angle: 240, icon: '🎨' },
                  { name: 'AWS', color: 'from-orange-400 to-orange-600', angle: 300, icon: '☁️' },
                ].map((skill, index) => {
                  const radius = 140;
                  const angle = (skill.angle * Math.PI) / 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                    >
                      <motion.div
                        animate={{
                          x: [x, x + 10, x],
                          y: [y, y - 10, y],
                        }}
                        transition={{
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <motion.div
                          className={`relative -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg cursor-pointer group`}
                          whileHover={{ scale: 1.3, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <span className="text-2xl">{skill.icon}</span>
                          
                          {/* Tooltip */}
                          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                              {skill.name}
                            </span>
                          </div>

                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.color} blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="140"
                    stroke="url(#skillGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="50%" stopColor="#764ba2" />
                      <stop offset="100%" stopColor="#f093fb" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Tech Stack & Currently Learning */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card p-8 border-2 border-purple-500/20"
              >
                <h4 className="text-2xl font-bold mb-6 text-gradient-premium">Tech Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
                    'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Three.js',
                    'GSAP', 'Tailwind CSS', 'GraphQL', 'Redis', 'Kubernetes'
                  ].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="px-5 py-3 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full text-sm font-semibold text-gray-200 hover:bg-white/15 hover:border-primary-400/50 hover:shadow-glow transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card p-8 border-2 border-pink-500/30 relative overflow-hidden"
              >
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent blur-2xl" />
                
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-pink-500 rounded-full shadow-glow"
                  />
                  <h4 className="text-2xl font-bold text-gradient-premium">Currently Exploring</h4>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                  Diving deep into <span className="text-primary-400 font-bold">AI/ML integration</span> for 
                  intelligent web apps, mastering advanced <span className="text-purple-400 font-bold">WebGL shaders</span> for 
                  stunning visuals, and exploring <span className="text-pink-400 font-bold">WebXR/VR</span> to 
                  create truly immersive digital experiences.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}