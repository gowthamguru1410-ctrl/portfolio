import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin)

// Smooth scroll to section
export const scrollToSection = (sectionId, offset = 0) => {
  const element = document.getElementById(sectionId)
  if (!element) return

  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: element,
      offsetY: offset,
      autoKill: true,
    },
    ease: 'power3.inOut',
  })
}

// Smooth scroll to top
export const scrollToTop = (duration = 1.2) => {
  gsap.to(window, {
    duration,
    scrollTo: { y: 0, autoKill: true },
    ease: 'power2.inOut',
  })
}

// Scroll to element with custom easing
export const scrollToElement = (element, duration = 1.5, ease = 'power3.inOut', offset = 0) => {
  if (!element) return

  gsap.to(window, {
    duration,
    scrollTo: {
      y: element,
      offsetY: offset,
      autoKill: true,
    },
    ease,
  })
}

// Smooth scroll progress tracker
export const getScrollProgress = () => {
  const winScroll = window.pageYOffset || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  return (winScroll / height) * 100
}

// Parallax scroll effect
export const applyParallax = (element, speed = 0.5) => {
  if (!element) return

  gsap.to(element, {
    y: () => window.pageYOffset * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

// Section reveal on scroll
export const revealOnScroll = (elements, options = {}) => {
  const {
    delay = 0,
    stagger = 0.15,
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 1,
    ease = 'power3.out',
  } = options

  gsap.fromTo(
    elements,
    from,
    {
      ...to,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements,
        start: 'top 80%',
        once: true,
      },
    }
  )
}

// Smooth scroll navigation handler
export const setupSmoothNavigation = () => {
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const href = link.getAttribute('href')
      
      if (href === '#') {
        scrollToTop()
      } else {
        const targetId = href.replace('#', '')
        scrollToSection(targetId, 80)
      }
    })
  })
}

// Initialize scroll animations
export const initScrollAnimations = () => {
  // Set up smooth navigation
  setupSmoothNavigation()

  // Update scroll progress CSS variable
  const updateScrollProgress = () => {
    const progress = getScrollProgress()
    document.documentElement.style.setProperty('--scroll-progress', `${progress}%`)
    
    // Also set as decimal for other uses
    document.documentElement.style.setProperty('--scroll', progress / 100)
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  updateScrollProgress()
}
