import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion';
import { useLenis } from '../lib/lenis';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const heroRef = useRef();
  const nameRef = useRef();
  const titleRef = useRef();
  const avatarRef = useRef();
  const ctaRef = useRef();
  const particlesRef = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useLenis();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse parallax with smooth tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  // Master timeline - cinematic entrance
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Name reveal with custom easing
      tl.fromTo(
        nameRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.6,
          ease: 'power4.out',
        }
      );

      // Title stagger in
      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'circ.out',
        },
        '-=1'
      );

      // Avatar slide + fade
      tl.fromTo(
        avatarRef.current,
        {
          opacity: 0,
          x: 100,
          scale: 0.8,
          rotate: 5,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: 1.4,
          ease: 'expo.out',
        },
        '-=0.8'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.4)',
        },
        '-=0.6'
      );

      // Avatar floating loop
      gsap.to(avatarRef.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToSection = (sectionId) => {
    if (scrollTo) {
      scrollTo(sectionId, { offset: 0, duration: 1.8 });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight-900"
    >
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-cinematic" />
      
      {/* Animated gradient orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[140px]"
          style={{
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 bg-teal-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text content */}
        <div className="space-y-8 text-center lg:text-left">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
            </span>
            <span className="text-sm font-medium text-teal-300 tracking-wide">
              Available for hire
            </span>
          </motion.div>

          {/* Name - Personal logo */}
          <div className="space-y-4 perspective-1000">
            <h1
              ref={nameRef}
              className="font-brand font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tighter opacity-0"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00e6c8 40%, #8b5cf6 80%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-x 8s ease infinite',
                letterSpacing: '-0.05em',
                textShadow: '0 0 80px rgba(0, 230, 200, 0.3)',
              }}
            >
              Gowtham
            </h1>

            {/* Title/role */}
            <h2
              ref={titleRef}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 tracking-wide opacity-0"
              style={{
                letterSpacing: '0.1em',
              }}
            >
              SOFTWARE{' '}
              <span className="text-teal-400 font-bold">DEVELOPER</span>
            </h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
          >
            Crafting digital experiences with{' '}
            <span className="text-teal-400 font-semibold">4+ years</span> of expertise.
            <br />
            Full-stack engineer. Creative problem solver. Pixel perfectionist.
          </motion.p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 pt-6">
            <MagneticButton
              onClick={() => scrollToSection('#projects')}
              className="group relative px-8 py-4 bg-brand-gradient rounded-full font-semibold text-white shadow-brand-glow hover:shadow-teal-glow transition-all duration-500 ease-cinematic overflow-hidden"
              strength={0.5}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection('#contact')}
              className="group px-8 py-4 bg-transparent border-2 border-teal-500/50 rounded-full font-semibold text-teal-300 hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-500 ease-elegant"
              strength={0.5}
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </MagneticButton>
          </div>

          {/* Social links - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex items-center gap-6 justify-center lg:justify-start pt-4"
          >
            <a
              href="https://github.com/gowthamguru1410-ctrl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-violet-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/gowtham"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:your.email@gmail.com"
              className="text-gray-500 hover:text-teal-400 transition-colors duration-300"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right: Avatar with depth */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="relative">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-violet-500/30 rounded-full blur-[80px] scale-125" />
            
            {/* Rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #00e6c8, #8b5cf6, #00e6c8)',
                padding: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full bg-midnight-900" />
            </motion.div>

            {/* Avatar image container */}
            <motion.div
              ref={avatarRef}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-depth-lg border-4 border-white/5 opacity-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Avatar image - replace with actual path */}
              <img
                src="/assets/gowtham-avatar.jpg"
                alt="Gowtham - Software Developer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient + icon
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              
              {/* Fallback placeholder */}
              <div className="hidden w-full h-full flex-col items-center justify-center bg-gradient-to-br from-midnight-700 via-midnight-800 to-midnight-900">
                <div className="text-9xl mb-4 filter drop-shadow-2xl">👨‍💻</div>
                <div className="font-brand text-white text-2xl font-bold">Gowtham</div>
                <div className="font-light text-teal-400 text-sm tracking-wider mt-2">DEVELOPER</div>
              </div>

              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating achievement badges */}
            <motion.div
              className="absolute -top-6 -right-6 px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl shadow-teal-glow backdrop-blur-sm"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="font-brand text-white text-sm font-bold tracking-wider">4+ YEARS</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 px-5 py-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-violet-glow backdrop-blur-sm"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="font-brand text-white text-sm font-bold tracking-wider">FULL STACK</div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-10 w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full shadow-lg flex items-center justify-center"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-3xl">⚡</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
          onClick={() => scrollToSection('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-teal-500/30 rounded-full flex justify-center p-2"
            animate={{ borderColor: ['rgba(0, 230, 200, 0.3)', 'rgba(0, 230, 200, 0.6)', 'rgba(0, 230, 200, 0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-teal-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-900 to-transparent pointer-events-none" />
    </section>
  );
}
