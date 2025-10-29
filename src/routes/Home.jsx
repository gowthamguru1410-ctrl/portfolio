import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, fadeInUp, stagger } from '../lib/gsap'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import Hero from '../components/Hero' // Using the new cinematic Hero
import Manifesto from '../components/Manifesto' // Personal philosophy section
import About from '../components/About'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

export default function Home() {
  const aboutRef = useRef()
  const projectsRef = useRef()
  const contactRef = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // About section animation
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 80%",
        onEnter: () => {
          const elements = aboutRef.current.querySelectorAll('.fade-in')
          stagger(Array.from(elements))
        }
      })

      // Projects section animation  
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 80%",
        onEnter: () => {
          const cards = projectsRef.current.querySelectorAll('.project-card')
          stagger(Array.from(cards), fadeInUp, 0.2)
        }
      })

      // Contact section animation
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 80%", 
        onEnter: () => {
          const elements = contactRef.current.querySelectorAll('.fade-in')
          stagger(Array.from(elements))
        }
      })
    })

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <main>
      <Hero />
      <Manifesto />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={projectsRef}>
        <Projects preview />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
    </main>
  )
}