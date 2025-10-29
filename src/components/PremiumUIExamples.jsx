// Premium UI Components Example
// Demonstrates how to use the new glassmorphism and cinematic styles

import { motion } from 'framer-motion'

// Example 1: Premium Glassmorphism Card
export function PremiumCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={`glass-card-hover p-8 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Example 2: Premium Hero Section
export function PremiumHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-overlay reveal-section">
      <div className="container mx-auto px-6 text-center z-10">
        {/* Main heading with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-bold mb-6 text-gradient-premium leading-tight"
        >
          Premium Portfolio
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
        >
          Crafting digital experiences with modern design and cutting-edge technology
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="btn-premium">
            View My Work
          </button>
          <button className="btn-outline-premium">
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

// Example 3: Project Card with Glassmorphism
export function PremiumProjectCard({ project }) {
  return (
    <PremiumCard className="group cursor-pointer overflow-hidden">
      {/* Image with overlay */}
      <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-white font-semibold">View Project →</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-gradient-premium">
        {project.title}
      </h3>
      <p className="text-gray-400 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-medium backdrop-blur-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </PremiumCard>
  )
}

// Example 4: Stats Section with Glassmorphism
export function PremiumStatsSection() {
  const stats = [
    { label: 'Projects Completed', value: '50+', icon: '🚀' },
    { label: 'Happy Clients', value: '30+', icon: '😊' },
    { label: 'Years Experience', value: '5+', icon: '⚡' },
    { label: 'Technologies', value: '20+', icon: '💻' },
  ]

  return (
    <section className="py-20 reveal-section">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <PremiumCard key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-4xl mb-3 float-animation">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2 text-gradient-premium">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-light">
                  {stat.label}
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// Example 5: Feature Section with Shimmer Effect
export function PremiumFeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass-card p-8 shimmer group"
    >
      {/* Icon */}
      <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-glow-lg group-hover:shadow-glow-purple transition-shadow duration-500">
        <span className="text-3xl">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient-premium transition-all duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Hover indicator */}
      <div className="mt-6 flex items-center text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-semibold">Learn more</span>
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  )
}

// Example 6: Premium Contact Section
export function PremiumContactSection() {
  return (
    <section className="py-20 reveal-section">
      <div className="container mx-auto px-6">
        <PremiumCard className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center shadow-glow-lg glow-pulse">
              <span className="text-4xl">💬</span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-premium">
            Let's Work Together
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-premium">
              Start a Conversation
            </button>
            <button className="btn-outline-premium">
              View Resume
            </button>
          </div>
        </PremiumCard>
      </div>
    </section>
  )
}

// Example 7: Testimonial Card
export function PremiumTestimonialCard({ quote, author, role, avatar }) {
  return (
    <PremiumCard className="relative">
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-6xl text-primary-500/20">
        "
      </div>

      {/* Quote */}
      <p className="text-lg text-gray-300 mb-6 leading-relaxed italic">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-purple-500 p-0.5">
          <img
            src={avatar}
            alt={author}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className="text-sm text-gray-400">{role}</div>
        </div>
      </div>
    </PremiumCard>
  )
}

/* 
USAGE EXAMPLES:

1. In your page components, add the "reveal-section" class to sections:
   <section className="py-20 reveal-section">

2. Use premium buttons:
   <button className="btn-premium">Primary Action</button>
   <button className="btn-outline-premium">Secondary Action</button>

3. Use glass cards:
   <div className="glass-card p-8">Content</div>
   <div className="glass-card-hover p-8">Hoverable Card</div>

4. Use gradient text:
   <h1 className="text-gradient-premium">Premium Heading</h1>

5. Add floating animation:
   <div className="float-animation">Floating Element</div>

6. Add shimmer effect:
   <div className="shimmer">Element with shimmer</div>

7. Use premium shadows:
   <div className="shadow-premium">Element with premium shadow</div>
   <div className="shadow-glow-lg">Element with glow</div>
*/
