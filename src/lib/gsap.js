import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal animation from different directions using ScrollTrigger
 * @param {string} direction - Animation direction: 'up', 'down', 'left', 'right', 'scale', 'fade'
 * @param {HTMLElement|string} element - Target element or selector
 * @param {object} options - Additional GSAP and ScrollTrigger options
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export const revealFrom = (direction, element, options = {}) => {
  // Default options
  const defaults = {
    duration: 1,
    ease: "power2.out",
    delay: 0,
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none none",
    once: true,
    ...options
  }

  // Separate ScrollTrigger options from GSAP animation options
  const {
    trigger,
    start,
    end,
    toggleActions,
    once,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    ...animationOptions
  } = defaults

  // Define animation properties based on direction
  const animations = {
    up: {
      y: 50,
      opacity: 0
    },
    down: {
      y: -50,
      opacity: 0
    },
    left: {
      x: -50,
      opacity: 0
    },
    right: {
      x: 50,
      opacity: 0
    },
    scale: {
      scale: 0.8,
      opacity: 0
    },
    fade: {
      opacity: 0
    },
    rotateIn: {
      rotation: 45,
      scale: 0.8,
      opacity: 0
    },
    slideUp: {
      y: 100,
      opacity: 0
    },
    slideDown: {
      y: -100,
      opacity: 0
    }
  }

  // Get animation properties for the specified direction
  const fromProps = animations[direction] || animations.fade

  // Create the animation with ScrollTrigger
  return gsap.fromTo(element, 
    fromProps,
    {
      ...animationOptions,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
        once,
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack
      }
    }
  )
}

/**
 * Batch reveal multiple elements with stagger
 * @param {string} direction - Animation direction
 * @param {string|NodeList} elements - Elements selector or NodeList
 * @param {object} options - Animation options
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export const batchReveal = (direction, elements, options = {}) => {
  const defaults = {
    stagger: 0.1,
    start: "top 80%",
    ...options
  }

  return ScrollTrigger.batch(elements, {
    onEnter: (elements) => {
      elements.forEach((element, index) => {
        revealFrom(direction, element, {
          ...defaults,
          delay: index * defaults.stagger
        })
      })
    },
    start: defaults.start,
    once: true
  })
}

// Original utility functions
export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(element, 
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay, ease: "power2.out" }
  )
}

export const slideInLeft = (element, delay = 0) => {
  return gsap.fromTo(element,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, delay, ease: "power2.out" }
  )
}

export const scaleIn = (element, delay = 0) => {
  return gsap.fromTo(element,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, delay, ease: "back.out(1.7)" }
  )
}

export const stagger = (elements, animation = fadeInUp, interval = 0.1) => {
  return gsap.timeline().add(
    elements.map((el, i) => animation(el, i * interval))
  )
}

/**
 * Create a scroll-triggered animation timeline
 * @param {HTMLElement|string} trigger - Trigger element
 * @param {object} options - ScrollTrigger options
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export const createScrollTimeline = (trigger, options = {}) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      ...options
    }
  })
  return tl
}

/**
 * Parallax effect for elements
 * @param {HTMLElement|string} element - Target element
 * @param {number} speed - Parallax speed (0.1 to 2)
 * @param {object} options - Additional options
 */
export const parallax = (element, speed = 0.5, options = {}) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      ...options
    }
  })
}

/**
 * Text reveal animation (split text)
 * @param {HTMLElement|string} element - Text element
 * @param {object} options - Animation options
 */
export const revealText = (element, options = {}) => {
  const defaults = {
    duration: 0.6,
    stagger: 0.02,
    ease: "power2.out",
    start: "top 80%",
    ...options
  }

  // Split text into characters (you might want to use SplitText plugin)
  const chars = element.textContent.split('').map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    return span
  })

  element.innerHTML = ''
  chars.forEach(char => element.appendChild(char))

  return gsap.fromTo(chars, 
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: defaults.duration,
      stagger: defaults.stagger,
      ease: defaults.ease,
      scrollTrigger: {
        trigger: element,
        start: defaults.start,
        toggleActions: "play none none none"
      }
    }
  )
}

// Export GSAP and ScrollTrigger for direct access
export { gsap, ScrollTrigger }