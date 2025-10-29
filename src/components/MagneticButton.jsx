import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'

/**
 * MagneticButton - A button that follows the cursor on hover
 * 
 * Usage:
 * <MagneticButton className="btn-premium">
 *   Click Me
 * </MagneticButton>
 * 
 * Props:
 * - children: Button content
 * - className: CSS classes to apply
 * - strength: Magnetic strength (0-1, default: 0.5)
 * - onClick: Click handler
 * - ...rest: Other button props (href for links)
 */
export default function MagneticButton({ 
  children, 
  className = '', 
  strength = 0.5,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  ...rest 
}) {
  const buttonRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current
    const text = textRef.current
    if (!button || disabled) return

    let requestId = null
    let isHovering = false

    const handleMouseMove = (e) => {
      if (!isHovering) return

      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Calculate distance from center
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      // Apply magnetic effect with strength multiplier
      const moveX = deltaX * strength
      const moveY = deltaY * strength
      
      // Cancel previous animation frame
      if (requestId) {
        cancelAnimationFrame(requestId)
      }

      // Use RAF for smooth animation
      requestId = requestAnimationFrame(() => {
        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.4,
          ease: 'power2.out',
        })

        // Text moves slightly more for depth effect
        if (text) {
          gsap.to(text, {
            x: moveX * 0.3,
            y: moveY * 0.3,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      })
    }

    const handleMouseEnter = () => {
      isHovering = true
      gsap.to(button, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      isHovering = false
      
      // Cancel any pending animation
      if (requestId) {
        cancelAnimationFrame(requestId)
        requestId = null
      }

      // Snap back with elastic ease
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })

      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        })
      }
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousemove', handleMouseMove)

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId)
      }
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousemove', handleMouseMove)
      
      // Reset on cleanup
      gsap.set(button, { x: 0, y: 0, scale: 1 })
      if (text) {
        gsap.set(text, { x: 0, y: 0 })
      }
    }
  }, [strength, disabled])

  // Render as link if href provided
  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={target}
        rel={rel}
        className={`inline-block ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        <span ref={textRef} className="inline-block">
          {children}
        </span>
      </a>
    )
  }

  // Render as button
  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...rest}
    >
      <span ref={textRef} className="inline-block">
        {children}
      </span>
    </button>
  )
}
