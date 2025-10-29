import { useEffect, useState } from 'react'

/**
 * Custom hook to detect user's reduced motion preference
 * Respects the CSS media query: prefers-reduced-motion
 * 
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 */
export function usePrefersReducedMotion() {
  // Initialize with a safe default (assume reduced motion for SSR)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return

    // Create media query for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Create event handler for media query changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches)
      
      // Log changes in development for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('🎭 Motion preference changed:', event.matches ? 'REDUCED' : 'FULL')
      }
    }

    // Add event listener for changes
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup event listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Utility function to get reduced motion preference synchronously
 * Useful for one-time checks without React hooks
 * 
 * @returns {boolean} true if user prefers reduced motion
 */
export function getPrefersReducedMotion() {
  if (typeof window === 'undefined') return true
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  return mediaQuery.matches
}

/**
 * Higher-order function to conditionally apply animations based on motion preference
 * 
 * @param {function} animationFn - Function that returns GSAP animation
 * @param {function} fallbackFn - Optional fallback function for reduced motion
 * @returns {function} Conditional animation function
 */
export function withMotionCheck(animationFn, fallbackFn = null) {
  return (...args) => {
    const prefersReduced = getPrefersReducedMotion()
    
    if (prefersReduced) {
      // If reduced motion is preferred, either run fallback or skip animation
      if (fallbackFn) {
        return fallbackFn(...args)
      } else {
        // Return a dummy animation that completes immediately
        return { kill: () => {}, isActive: () => false }
      }
    }
    
    // Normal animation
    return animationFn(...args)
  }
}

/* 
🎭 USAGE EXAMPLES:

1. Basic hook usage in React components:
```jsx
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { gsap } from 'gsap'

function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations, set final state immediately
      gsap.set('.animate-element', { opacity: 1, y: 0 })
    } else {
      // Full animation
      gsap.fromTo('.animate-element', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
    }
  }, [prefersReducedMotion])
  
  return <div className="animate-element">Content</div>
}
```

2. Conditional GSAP timeline:
```jsx
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { gsap } from 'gsap'

function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  useEffect(() => {
    const tl = gsap.timeline()
    
    if (prefersReducedMotion) {
      // Instant reveal for reduced motion
      tl.set(['.hero-title', '.hero-subtitle', '.hero-cta'], {
        opacity: 1,
        y: 0,
        scale: 1
      })
    } else {
      // Staggered animation for full motion
      tl.fromTo('.hero-title', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
    }
    
    return () => tl.kill()
  }, [prefersReducedMotion])
  
  return (
    <section className="hero">
      <h1 className="hero-title">Welcome</h1>
      <p className="hero-subtitle">Portfolio subtitle</p>
      <button className="hero-cta">Get Started</button>
    </section>
  )
}
```

3. ScrollTrigger with motion preferences:
```jsx
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function ScrollAnimatedSection() {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  useEffect(() => {
    const elements = gsap.utils.toArray('.scroll-animate')
    
    elements.forEach((element, index) => {
      if (prefersReducedMotion) {
        // For reduced motion, just fade in when in view
        ScrollTrigger.create({
          trigger: element,
          start: 'top 90%',
          onEnter: () => gsap.set(element, { opacity: 1 }),
          onLeave: () => gsap.set(element, { opacity: 0.6 }),
          onEnterBack: () => gsap.set(element, { opacity: 1 }),
          onLeaveBack: () => gsap.set(element, { opacity: 0.6 })
        })
      } else {
        // Full scroll animation
        gsap.fromTo(element,
          { opacity: 0, y: 100, rotation: 5 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
              scrub: false
            }
          }
        )
      }
    })
    
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }, [prefersReducedMotion])
  
  return (
    <section>
      <div className="scroll-animate">Item 1</div>
      <div className="scroll-animate">Item 2</div>
      <div className="scroll-animate">Item 3</div>
    </section>
  )
}
```

4. Using the higher-order function utility:
```jsx
import { withMotionCheck } from '../utils/usePrefersReducedMotion'
import { gsap } from 'gsap'

// Create a motion-aware animation function
const animateCard = withMotionCheck(
  // Full animation
  (element) => gsap.fromTo(element,
    { opacity: 0, scale: 0.8, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
  ),
  // Reduced motion fallback
  (element) => gsap.set(element, { opacity: 1, scale: 1, y: 0 })
)

function ProjectCard({ project }) {
  const cardRef = useRef()
  
  useEffect(() => {
    // This will automatically respect motion preferences
    animateCard(cardRef.current)
  }, [])
  
  return <div ref={cardRef} className="project-card">{project.title}</div>
}
```

5. Framer Motion integration:
```jsx
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { motion } from 'framer-motion'

function MotionAwareComponent() {
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'easeOut'
      }
    }
  }
  
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      Content respects motion preferences
    </motion.div>
  )
}
```

6. Integration with GSAP revealFrom utility:
```jsx
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { revealFrom } from '../lib/gsap'

function AccessibleReveal() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const elementRef = useRef()
  
  useEffect(() => {
    if (prefersReducedMotion) {
      // Just set the final state for reduced motion
      gsap.set(elementRef.current, { opacity: 1, y: 0 })
    } else {
      // Use the revealFrom utility with ScrollTrigger
      revealFrom('bottom', elementRef.current, {
        distance: 50,
        duration: 1,
        trigger: elementRef.current,
        start: 'top 80%'
      })
    }
  }, [prefersReducedMotion])
  
  return <div ref={elementRef}>Accessible animated content</div>
}
```

🎯 Key Benefits:
- Automatic detection of user motion preferences
- Graceful fallbacks for accessibility
- Works with GSAP, Framer Motion, and CSS animations
- Prevents motion sickness and vestibular disorders
- Improves battery life on mobile devices
- Better performance for users who prefer reduced motion

⚠️ Accessibility Notes:
- Always provide meaningful fallbacks, not just disabled animations
- Consider using opacity/fade transitions as reduced motion alternatives
- Test with reduced motion enabled in your OS settings
- Use immediate state changes for critical UI updates

🔧 Testing:
- macOS: System Preferences > Accessibility > Display > Reduce motion
- Windows: Settings > Ease of Access > Display > Show animations
- CSS: Add @media (prefers-reduced-motion: reduce) to test styles
- Browser DevTools: Can simulate the media query for testing
*/