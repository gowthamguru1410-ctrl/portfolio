import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SignatureLogo({ className = '' }) {
  const logoRef = useRef(null)
  const pathRefs = useRef([])

  useEffect(() => {
    if (!logoRef.current) return

    const paths = pathRefs.current.filter(Boolean)
    
    // Animate using strokeDasharray/strokeDashoffset (works without premium plugin)
    paths.forEach((path) => {
      const length = path.getTotalLength()
      
      // Set up the starting positions
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
    })

    // Create the drawing animation timeline
    const tl = gsap.timeline({ 
      delay: 0.5,
      defaults: { ease: 'power2.inOut' }
    })

    // Animate each path drawing in sequence with stagger
    paths.forEach((path, index) => {
      const length = path.getTotalLength()
      
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power1.inOut',
      }, index * 0.25) // Stagger each path by 0.25s
    })

    // Add a subtle glow pulse effect after drawing completes
    tl.to(logoRef.current, {
      filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.6))',
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')

    // Subtle breathing glow animation
    tl.to(logoRef.current, {
      filter: 'drop-shadow(0 0 4px rgba(102, 126, 234, 0.4))',
      duration: 0.8,
      ease: 'power2.inOut'
    })

    // Infinite subtle pulse
    gsap.to(logoRef.current, {
      filter: 'drop-shadow(0 0 6px rgba(102, 126, 234, 0.5))',
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 3
    })

    return () => {
      tl.kill()
      gsap.killTweensOf(logoRef.current)
    }
  }, [])

  return (
    <svg
      ref={logoRef}
      viewBox="0 0 200 60"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Portfolio signature logo"
    >
      {/* Elegant cursive "P" with flourish */}
      <path
        ref={el => pathRefs.current[0] = el}
        d="M 20 15 L 20 45 M 20 15 Q 35 12 38 22 Q 38 32 25 35 L 20 35"
        stroke="url(#gradient1)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized "G" with modern tech feel */}
      <path
        ref={el => pathRefs.current[1] = el}
        d="M 58 22 Q 48 12 38 22 Q 35 30 38 38 Q 48 48 58 38 L 58 30 L 50 30"
        stroke="url(#gradient2)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Decorative tech accent - circuit-like dot */}
      <circle
        ref={el => pathRefs.current[2] = el}
        cx="70"
        cy="30"
        r="2.5"
        stroke="url(#gradient3)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Connecting line element */}
      <path
        ref={el => pathRefs.current[3] = el}
        d="M 68 30 L 75 30"
        stroke="url(#gradient3)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Decorative underline sweep with tech aesthetic */}
      <path
        ref={el => pathRefs.current[4] = el}
        d="M 18 50 Q 45 54 72 50"
        stroke="url(#gradient4)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Additional tech accent - small parallel line */}
      <path
        ref={el => pathRefs.current[5] = el}
        d="M 20 52 Q 45 55 70 52"
        stroke="url(#gradient4)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Gradient definitions with premium color scheme */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="50%" stopColor="#764ba2" />
          <stop offset="100%" stopColor="#667eea" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#764ba2" />
          <stop offset="50%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f093fb" />
          <stop offset="100%" stopColor="#667eea" />
        </linearGradient>
        
        <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="25%" stopColor="#764ba2" />
          <stop offset="50%" stopColor="#f093fb" />
          <stop offset="75%" stopColor="#764ba2" />
          <stop offset="100%" stopColor="#667eea" />
        </linearGradient>
      </defs>
    </svg>
  )
}
