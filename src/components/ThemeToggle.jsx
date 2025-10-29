import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'
import { useTheme } from '../contexts/ThemeContext'
import MagneticButton from './MagneticButton'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const containerRef = useRef(null)
  const sunRef = useRef(null)
  const moonRef = useRef(null)
  const bgRef = useRef(null)
  
  const isDark = theme === 'dark'

  // Animate icon morph when theme changes
  useEffect(() => {
    if (!sunRef.current || !moonRef.current || !bgRef.current) return

    const tl = gsap.timeline()

    if (isDark) {
      // Dark mode: Show moon, hide sun
      tl.to(sunRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(2)',
      }, 0)
      .to(moonRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, 0.2)
      .to(bgRef.current, {
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderColor: 'rgba(102, 126, 234, 0.3)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
    } else {
      // Light mode: Show sun, hide moon
      tl.to(moonRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.4,
        ease: 'back.in(2)',
      }, 0)
      .to(sunRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, 0.2)
      .to(bgRef.current, {
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderColor: 'rgba(255, 193, 7, 0.3)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
    }

    return () => tl.kill()
  }, [isDark])

  // Animate background gradients on body
  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (isDark) {
      gsap.to(body, {
        '--bg-primary': '#0a0a0f',
        '--bg-secondary': '#1a1a2e',
        '--text-primary': '#ffffff',
        '--text-secondary': '#9ca3af',
        duration: 0.6,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to(body, {
        '--bg-primary': '#f8f9fa',
        '--bg-secondary': '#e9ecef',
        '--text-primary': '#1a1a2e',
        '--text-secondary': '#6c757d',
        duration: 0.6,
        ease: 'power2.inOut',
      })
    }
  }, [isDark])

  const handleClick = () => {
    // Add click animation
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
    }
    
    toggleTheme()
  }

  return (
    <MagneticButton
      onClick={handleClick}
      className="relative p-3 rounded-full transition-all duration-300 group overflow-hidden"
      strength={0.5}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div ref={containerRef} className="relative w-6 h-6">
        {/* Background circle */}
        <div 
          ref={bgRef}
          className="absolute inset-0 rounded-full backdrop-blur-sm transition-all duration-300"
          style={{
            backgroundColor: isDark ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 193, 7, 0.1)',
            border: '2px solid',
            borderColor: isDark ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 193, 7, 0.3)',
          }}
        />

        {/* Sun Icon */}
        <div 
          ref={sunRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'scale(0) rotate(-180deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <svg 
            className="w-4 h-4 text-yellow-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>

        {/* Moon Icon */}
        <div 
          ref={moonRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(180deg)',
          }}
        >
          <svg 
            className="w-4 h-4 text-primary-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" 
            />
          </svg>
        </div>

        {/* Rotating rays effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1 bg-gradient-to-t from-transparent rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-12px)`,
                  background: isDark 
                    ? 'linear-gradient(to top, transparent, rgba(102, 126, 234, 0.6))' 
                    : 'linear-gradient(to top, transparent, rgba(255, 193, 7, 0.6))',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span className="px-3 py-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>
    </MagneticButton>
  )
}
