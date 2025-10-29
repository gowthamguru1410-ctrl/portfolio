// Example usage of GSAP revealFrom function
import { revealFrom, batchReveal, createScrollTimeline, parallax, revealText } from '../lib/gsap'
import { useEffect, useRef } from 'react'

export function GSAPAnimationExamples() {
  const containerRef = useRef()
  const titleRef = useRef()
  const cardsRef = useRef()
  const parallaxRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    // Example 1: Basic reveal animations
    revealFrom('up', titleRef.current, {
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    // Example 2: Reveal from different directions
    revealFrom('left', '.slide-in-left')
    revealFrom('right', '.slide-in-right')
    revealFrom('scale', '.scale-in')
    revealFrom('fade', '.fade-in')

    // Example 3: Batch reveal with stagger
    batchReveal('up', '.card', {
      stagger: 0.2,
      duration: 0.8,
      start: "top 85%"
    })

    // Example 4: Custom ScrollTrigger timeline
    const tl = createScrollTimeline(containerRef.current, {
      start: "top center",
      end: "bottom center",
      scrub: 1
    })

    tl.to('.timeline-element', { rotation: 360, duration: 2 })
      .to('.timeline-element', { scale: 1.2, duration: 1 }, "-=1")

    // Example 5: Parallax effect
    parallax(parallaxRef.current, 0.5)

    // Example 6: Text reveal animation
    revealText(textRef.current, {
      stagger: 0.03,
      duration: 0.8
    })

    // Cleanup function
    return () => {
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="space-y-20 p-8">
      {/* Basic Reveal Examples */}
      <section>
        <h2 ref={titleRef} className="text-4xl font-bold mb-8">
          GSAP Reveal Animations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="slide-in-left p-6 bg-blue-500 rounded-lg">
            <h3 className="text-xl font-semibold">Slide from Left</h3>
            <p>This element slides in from the left when scrolled into view.</p>
          </div>
          
          <div className="slide-in-right p-6 bg-green-500 rounded-lg">
            <h3 className="text-xl font-semibold">Slide from Right</h3>
            <p>This element slides in from the right when scrolled into view.</p>
          </div>
          
          <div className="scale-in p-6 bg-purple-500 rounded-lg">
            <h3 className="text-xl font-semibold">Scale In</h3>
            <p>This element scales in when scrolled into view.</p>
          </div>
          
          <div className="fade-in p-6 bg-red-500 rounded-lg">
            <h3 className="text-xl font-semibold">Fade In</h3>
            <p>This element fades in when scrolled into view.</p>
          </div>
        </div>
      </section>

      {/* Batch Reveal Example */}
      <section ref={cardsRef}>
        <h2 className="text-3xl font-bold mb-8">Batch Reveal with Stagger</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="card p-6 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold">Card {num}</h3>
              <p>These cards animate in sequence with a stagger effect.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Example */}
      <section className="relative h-96 bg-gradient-to-b from-blue-600 to-purple-600 rounded-lg overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold"
        >
          Parallax Effect
        </div>
      </section>

      {/* Text Reveal Example */}
      <section>
        <h2 ref={textRef} className="text-4xl font-bold text-center">
          Character by Character Animation
        </h2>
      </section>

      {/* Timeline Example */}
      <section className="flex justify-center">
        <div className="timeline-element w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold">
          Rotate & Scale
        </div>
      </section>
    </div>
  )
}

// Component demonstrating revealFrom in a real component
export function AnimatedSection({ children, direction = 'up', className = '' }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      revealFrom(direction, ref.current, {
        duration: 1,
        ease: "power2.out"
      })
    }
  }, [direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Hook for easy animation setup
export function useRevealAnimation(direction = 'up', options = {}) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      revealFrom(direction, ref.current, options)
    }
  }, [direction, options])

  return ref
}

// Usage example with hook
export function HookExample() {
  const titleRef = useRevealAnimation('scale', { duration: 1.5 })
  const contentRef = useRevealAnimation('up', { delay: 0.3 })

  return (
    <div className="p-8">
      <h2 ref={titleRef} className="text-3xl font-bold mb-4">
        Using the Hook
      </h2>
      <p ref={contentRef} className="text-lg">
        This content animates with the useRevealAnimation hook.
      </p>
    </div>
  )
}