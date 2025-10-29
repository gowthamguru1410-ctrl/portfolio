import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Header from './components/Header'
import Home from './routes/Home'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Manifesto from './components/Manifesto'
import SignatureFooter from './components/SignatureFooter'
import PageTransition from './components/PageTransition'
import { initScrollAnimations } from './utils/smoothScroll'

// Lazy load backgrounds for better performance
const Background = lazy(() => import('./components/Background'))
const ParticleBackground = lazy(() => import('./3d/ParticleBackground'))
import { ParticleBackgroundPlaceholder } from './3d/ParticleBackground'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  const spotlightRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // Initialize smooth scroll animations
    initScrollAnimations()

    // ============================================
    // 🎬 CINEMATIC SECTION REVEAL ANIMATIONS
    // ============================================
    const sections = document.querySelectorAll('.reveal-section')
    
    sections.forEach((section, index) => {
      // Create a timeline for each section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          // markers: false, // Enable for debugging
        },
      })

      // Main reveal animation
      timeline.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
          rotationX: 5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.4,
          ease: 'power4.out',
        }
      )

      // Animate child elements with stagger
      const children = section.querySelectorAll('.reveal-child')
      if (children.length > 0) {
        timeline.fromTo(
          children,
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=1.0' // Overlap with parent animation
        )
      }
    })

    // ============================================
    // 🎨 PARALLAX GRADIENT OVERLAYS
    // ============================================
    const gradientElements = document.querySelectorAll('.gradient-overlay')
    
    gradientElements.forEach((element) => {
      gsap.to(element, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    // ============================================
    // ✨ FLOATING BLOBS PARALLAX
    // ============================================
    const blobs = document.querySelectorAll('.floating-blob')
    blobs.forEach((blob, index) => {
      const speed = 0.5 + (index * 0.3)
      gsap.to(blob, {
        y: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    })

    // ============================================
    // 🔦 SPOTLIGHT MOUSE FOLLOW EFFECT
    // ============================================
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
      
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mouse-x', `${x}%`)
        spotlightRef.current.style.setProperty('--mouse-y', `${y}%`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // ============================================
    // 🎯 SMOOTH SCROLL PROGRESS INDICATOR
    // ============================================
    const progressBar = document.querySelector('.scroll-progress')
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-midnight-900">
      {/* ============================================ */}
      {/* 🌟 IMMERSIVE 3D STAR BACKGROUND */}
      {/* ============================================ */}
      <Suspense fallback={<div className="fixed inset-0 bg-midnight-950" />}>
        <Background showStars={true} showParticles={true} />
      </Suspense>

      {/* ============================================ */}
      {/* �🎬 SCROLL PROGRESS INDICATOR */}
      {/* ============================================ */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
        <div 
          className="scroll-progress h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 origin-left"
          style={{ transform: 'scaleX(0)' }}
        ></div>
      </div>

      {/* ============================================ */}
      {/* ✨ PREMIUM PARTICLE BACKGROUND */}
      {/* ============================================ */}
      <Suspense fallback={<ParticleBackgroundPlaceholder />}>
        <ParticleBackground />
      </Suspense>

      {/* ============================================ */}
      {/* 📄 MAIN CONTENT WITH PAGE TRANSITIONS */}
      {/* ============================================ */}
      <div className="relative z-20">
        <Header />
        
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </div>

      {/* ============================================ */}
      {/* 🎭 BRAND EDGE GLOW EFFECTS */}
      {/* ============================================ */}
      <div className="fixed inset-0 z-[6] pointer-events-none">
        {/* Top edge glow - teal/violet brand colors */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>
        
        {/* Subtle corner accents - brand colors */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-teal-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* ============================================ */}
      {/* 📜 HANDCRAFTED SIGNATURE FOOTER */}
      {/* ============================================ */}
      <SignatureFooter />
    </div>
  )
}

export default App
