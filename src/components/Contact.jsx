import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-full text-sm font-semibold text-primary-300 shadow-glow">
              💬 Let's Connect
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span 
              className="text-gradient-premium inline-block"
              style={{
                textShadow: '0 0 80px rgba(102, 126, 234, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              Get In Touch
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's create something <span className="text-primary-400 font-semibold">amazing</span> together!
          </p>
        </div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {/* Email */}
          <motion.a
            href="mailto:your.email@gmail.com"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6 rounded-2xl border-2 border-red-500/30 hover:border-red-400/50 transition-all group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-all">
                <svg className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Email</div>
                <div className="text-gray-300 font-semibold group-hover:text-red-400 transition-colors">your.email@gmail.com</div>
              </div>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+1234567890"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6 rounded-2xl border-2 border-green-500/30 hover:border-green-400/50 transition-all group"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all">
                <svg className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Phone</div>
                <div className="text-gray-300 font-semibold group-hover:text-green-400 transition-colors">+1 (234) 567-890</div>
              </div>
            </div>
          </motion.a>

          {/* Location */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6 rounded-2xl border-2 border-blue-500/30 hover:border-blue-400/50 transition-all group cursor-default"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <svg className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Location</div>
                <div className="text-gray-300 font-semibold group-hover:text-blue-400 transition-colors">City, Country</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form - Simplified */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-primary-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-900/50 backdrop-blur-sm border-2 rounded-xl focus:outline-none transition-all ${
                    errors.name 
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-primary-500'
                  }`}
                  placeholder="John Doe"
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p 
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>⚠️</span> {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-4 bg-gray-900/50 backdrop-blur-sm border-2 rounded-xl focus:outline-none transition-all ${
                    errors.email 
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-primary-500'
                  }`}
                  placeholder="john@example.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>⚠️</span> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full p-4 bg-gray-900/50 backdrop-blur-sm border-2 rounded-xl focus:outline-none transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500' 
                      : 'border-white/10 focus:border-primary-500'
                  }`}
                  placeholder="Tell me about your project..."
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p 
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>⚠️</span> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium text-lg py-5 relative overflow-hidden disabled:opacity-50"
                strength={0.3}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Your Message...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </MagneticButton>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="p-4 bg-green-500/20 border-2 border-green-500/50 rounded-xl text-center"
                  >
                    <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                      <span className="text-2xl">✓</span>
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6 text-lg">Or connect with me on social media</p>
            <div className="flex justify-center gap-6 flex-wrap">
              <MagneticButton
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card border-2 border-blue-500/30 rounded-full px-6 py-3 flex items-center gap-3 hover:border-blue-400 hover:bg-blue-500/10 transition-all shadow-glow"
                aria-label="LinkedIn"
                strength={0.6}
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-gray-300 group-hover:text-blue-400 font-semibold transition-colors">LinkedIn</span>
              </MagneticButton>
              
              <MagneticButton
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card border-2 border-purple-500/30 rounded-full px-6 py-3 flex items-center gap-3 hover:border-purple-400 hover:bg-purple-500/10 transition-all shadow-glow"
                aria-label="GitHub"
                strength={0.6}
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-gray-300 group-hover:text-purple-400 font-semibold transition-colors">GitHub</span>
              </MagneticButton>
              
              <MagneticButton
                href="mailto:your.email@gmail.com"
                className="group glass-card border-2 border-red-500/30 rounded-full px-6 py-3 flex items-center gap-3 hover:border-red-400 hover:bg-red-500/10 transition-all shadow-glow"
                aria-label="Gmail"
                strength={0.6}
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
                <span className="text-gray-300 group-hover:text-red-400 font-semibold transition-colors">Gmail</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
