import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import MagneticButton from './MagneticButton'

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern React e-commerce with Stripe integration",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    details: "Full-stack e-commerce platform with user authentication, product management, shopping cart, and secure payment processing.",
    github: "#",
    live: "#",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative project management tool",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    details: "Real-time collaborative task management with drag-and-drop functionality, team collaboration, and progress tracking.",
    github: "#",
    live: "#",
    category: "Web App"
  },
  {
    id: 3,
    title: "AI Chat Interface",
    description: "Intelligent chatbot with natural language processing",
    tech: ["Python", "FastAPI", "OpenAI", "React"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    details: "AI-powered chat interface with context awareness, conversation memory, and custom training capabilities.",
    github: "#",
    live: "#",
    category: "AI/ML"
  },
  {
    id: 4,
    title: "Portfolio CMS",
    description: "Headless CMS for portfolio websites",
    tech: ["Strapi", "GraphQL", "Next.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    details: "Customizable headless CMS with drag-and-drop page builder, media management, and API generation.",
    github: "#",
    live: "#",
    category: "Full Stack"
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description: "Mobile-first fitness and nutrition tracking app",
    tech: ["React Native", "Firebase", "Redux", "Chart.js"],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
    details: "Cross-platform fitness app with workout plans, nutrition tracking, progress charts, and social features.",
    github: "#",
    live: "#",
    category: "Mobile"
  },
  {
    id: 6,
    title: "Real-time Analytics Dashboard",
    description: "Live data visualization and monitoring",
    tech: ["React", "D3.js", "WebSocket", "Node.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    details: "Real-time analytics platform with interactive charts, custom dashboards, and alert notifications.",
    github: "#",
    live: "#",
    category: "Data Viz"
  }
]

// 3D Tilt Card Component with Enhanced Visual Effects
function ProjectCard({ project, onClick, index }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])
  const scale = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.98, 1.02, 0.98])

  // Fallback visibility timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated && cardRef.current) {
        gsap.set(cardRef.current, { opacity: 1, clearProps: 'transform' })
        setHasAnimated(true)
      }
    }, 2000 + index * 150) // Account for stagger delay

    return () => clearTimeout(timer)
  }, [hasAnimated, index])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  useEffect(() => {
    if (!cardRef.current || hasAnimated) return

    // Enhanced GSAP staggered reveal animation
    const animation = gsap.fromTo(cardRef.current, {
      opacity: 0,
      y: 100,
      scale: 0.8,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      delay: index * 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => setHasAnimated(true),
      },
    })

    return () => {
      animation.kill()
    }
  }, [index, hasAnimated])

  return (
    <motion.article
      ref={cardRef}
      style={{
        opacity: hasAnimated ? 1 : undefined,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="project-card group cursor-pointer h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => onClick(project)}
        className="relative w-full h-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-2xl overflow-hidden"
        aria-label={`View details for ${project.title}`}
      >
        {/* Animated Border Gradient - Multiple Layers for Depth */}
        <div className={`absolute -inset-[2px] rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 blur-md animate-gradient-xy"></div>
        </div>
        <div className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-primary-500 animate-gradient-xy" style={{ animationDuration: '4s' }}></div>
        </div>

        {/* Card Content with Glass Effect */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-900/95 backdrop-blur-xl h-full flex flex-col"
          style={{
            transform: "translateZ(50px)",
            boxShadow: isHovered 
              ? '0 30px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(102, 126, 234, 0.3)' 
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.5s ease-out',
          }}
        >
          {/* Image Container */}
          <div className="aspect-video overflow-hidden relative">
            <motion.img 
              src={project.image} 
              alt={`Screenshot of ${project.title}`}
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.15 : 1,
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60"></div>
            
            {/* Category Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: index * 0.15 + 0.5 }}
              className="absolute top-4 left-4 z-10"
            >
              <span className="px-4 py-2 bg-primary-500 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-glow border border-primary-400/50">
                {project.category}
              </span>
            </motion.div>

            {/* Hover Overlay with Project Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/95 to-gray-900/70 flex flex-col justify-end p-6 z-10"
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-200 text-sm leading-relaxed mb-4"
              >
                {project.details}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.15 }}
                className="flex gap-3"
              >
                <span className="px-5 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-bold rounded-lg shadow-glow flex items-center gap-2">
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>

            {/* Shimmer Effect on Hover */}
            {isHovered && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ transform: 'skewX(-20deg)' }}
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 flex-grow flex flex-col">
            <motion.h3 
              className="text-2xl font-bold mb-2"
              animate={{ 
                color: isHovered ? '#667eea' : '#ffffff',
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gradient-premium">{project.title}</span>
            </motion.h3>
            <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">{project.description}</p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <motion.span 
                  key={tech}
                  className="px-3 py-1 backdrop-blur-sm bg-white/5 border border-white/10 text-primary-300 rounded-full text-xs font-semibold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + techIndex * 0.05 + 0.6 }}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 0.5)',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Floating Light Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${mouseXSpring.get() * 100 + 50}% ${mouseYSpring.get() * 100 + 50}%, rgba(102, 126, 234, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>
      </button>
    </motion.article>
  )
}

// Enhanced Project Modal with Fullscreen Preview & Advanced Animations
function ProjectModal({ project, onClose }) {
  const modalRef = useRef()
  const [imageLoaded, setImageLoaded] = useState(false)

  // Focus modal on open
  useEffect(() => {
    modalRef.current?.focus()
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      {/* Blurred & Darkened Background with Grain */}
      <motion.div
        initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(10, 10, 15, 0)' }}
        animate={{ backdropFilter: 'blur(24px)', backgroundColor: 'rgba(10, 10, 15, 0.85)' }}
        exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(10, 10, 15, 0)' }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Animated Gradient Orbs in Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.6 }}
        className="absolute top-20 left-20 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Modal Content with Scale & Blur Animation */}
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.7, opacity: 0, y: 100, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.7, opacity: 0, y: 100, rotateX: 20 }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 300,
          opacity: { duration: 0.4 },
        }}
        className="relative max-w-6xl w-full max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Multi-Layer Animated Border Gradient */}
        <div className="absolute -inset-[3px] rounded-3xl overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 opacity-60 animate-gradient-xy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-primary-500 animate-gradient-xy"
            style={{ animationDuration: '6s' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </div>

        {/* Close Button with Enhanced Interaction */}
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-6 z-30 p-3 glass-card hover:bg-white/20 rounded-full transition-all duration-300 group shadow-glow"
          aria-label="Close project details"
        >
          <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Content Container with Scroll */}
        <div className="relative bg-gray-950/98 backdrop-blur-2xl rounded-3xl overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-primary-500/50 scrollbar-track-gray-800/50">
          {/* Hero Image Section with Parallax */}
          <div className="relative aspect-[21/9] overflow-hidden">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 animate-pulse" />
            )}
            
            <motion.img 
              src={project.image} 
              alt={`Full screenshot of ${project.title}`}
              className="w-full h-full object-cover"
              initial={{ scale: 1.3, filter: 'blur(20px)' }}
              animate={{ 
                scale: 1, 
                filter: imageLoaded ? 'blur(0px)' : 'blur(20px)',
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Multi-layer Gradient Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-transparent to-gray-950/50"></div>
            
            {/* Floating Category Badge with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute top-8 left-8 z-10"
            >
              <span className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-full shadow-glow text-sm border-2 border-white/20">
                {project.category}
              </span>
            </motion.div>

            {/* Animated Corner Accents */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Project Details Section */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Title with Stagger Animation */}
            <motion.h2
              id="modal-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span 
                className="text-gradient-premium inline-block"
                style={{
                  textShadow: '0 0 60px rgba(102, 126, 234, 0.4)',
                }}
              >
                {project.title}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-4xl"
            >
              {project.details}
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-10"
            />

            {/* Technologies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-3">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.7 + index * 0.08, 
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 2,
                      boxShadow: '0 0 30px rgba(102, 126, 234, 0.4)',
                    }}
                    className="px-6 py-3 glass-card text-primary-300 rounded-full font-semibold text-base border border-primary-500/30 hover:border-primary-400/60 transition-all cursor-default shimmer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <MagneticButton
                href={project.live}
                className="btn-premium flex items-center justify-center gap-3 text-lg px-8 py-4 shadow-glow"
                target="_blank"
                rel="noopener noreferrer"
                strength={0.35}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Demo
              </MagneticButton>
              <MagneticButton
                href={project.github}
                className="btn-outline-premium flex items-center justify-center gap-3 text-lg px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
                strength={0.35}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
                View Source Code
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects({ preview = false }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef()
  const titleRef = useRef()
  const displayProjects = preview ? projectsData.slice(0, 3) : projectsData

  // Initialize title visibility immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated && titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, clearProps: 'transform' })
        setHasAnimated(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasAnimated])

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return
    
    if (hasAnimated) return

    // Enhanced section title animation with once: true
    const animation = gsap.fromTo(titleRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.9,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setHasAnimated(true),
      },
    })

    return () => {
      if (animation) animation.kill()
    }
  }, [hasAnimated])

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Dynamic Background with Multiple Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Digital Gallery Style */}
        <div ref={titleRef} style={{ opacity: hasAnimated ? 1 : undefined }} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-full text-sm font-semibold text-primary-300 shadow-glow">
              ✨ Portfolio Showcase
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span 
              className="text-gradient-premium inline-block"
              style={{
                textShadow: '0 0 80px rgba(102, 126, 234, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              Featured Projects
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            A curated <span className="text-primary-400 font-semibold">digital gallery</span> of my recent work, 
            showcasing modern technologies, creative solutions, and meticulous attention to detail.
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[2px] w-32 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto mt-8"
          />
        </div>
        
        {/* Projects Grid - Gallery Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {displayProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              onClick={setSelectedProject}
              index={index}
            />
          ))}
        </div>

        {/* View All Button with Enhanced Style */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <MagneticButton
              href="/projects"
              className="btn-premium text-lg px-10 py-5 shadow-glow inline-flex items-center gap-3"
              strength={0.4}
            >
              View All Projects
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            
            {/* Count indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-gray-500 text-sm mt-4"
            >
              Showing {displayProjects.length} of {projectsData.length} projects
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Modal with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}