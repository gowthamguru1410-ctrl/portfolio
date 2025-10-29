import { createContext, useContext, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext()

/**
 * Lenis Provider Component
 * Initializes smooth scrolling with GSAP integration
 */
export function LenisProvider({ children, options = {} }) {
  const lenisRef = useRef()
  const rafRef = useRef()

  // Default Lenis configuration
  const defaultOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    normalizeWheel: true,
    ...options
  }

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis(defaultOptions)
    lenisRef.current = lenis

    // Flag to prevent multiple refresh calls in the same frame
    let refreshScheduled = false

    // Enhanced GSAP ScrollTrigger integration
    const updateLenis = (time) => {
      lenis.raf(time * 1000) // Convert to milliseconds
    }

    // ScrollTrigger refresh with requestAnimationFrame for performance
    const scheduleScrollTriggerRefresh = () => {
      if (!refreshScheduled) {
        refreshScheduled = true
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          refreshScheduled = false
        })
      }
    }

    // Add to GSAP ticker for smooth integration
    gsap.ticker.add(updateLenis)

    // Configure ScrollTrigger to use Lenis scroll values
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    })

    // Update ScrollTrigger on Lenis scroll with optimized refresh
    lenis.on('scroll', (data) => {
      // Update ScrollTrigger immediately for position tracking
      ScrollTrigger.update()
      
      // Schedule a refresh for the next frame to recalculate positions
      scheduleScrollTriggerRefresh()
    })

    // Refresh ScrollTrigger when Lenis completes scroll animations
    lenis.on('scroll', ({ velocity }) => {
      // When velocity is very low, trigger a final refresh to ensure accuracy
      if (Math.abs(velocity) < 0.1) {
        scheduleScrollTriggerRefresh()
      }
    })

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      scheduleScrollTriggerRefresh()
    }
    window.addEventListener('resize', handleResize)

    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Lenis initialized with GSAP ScrollTrigger integration')
      console.log('📋 Options:', defaultOptions)
      
      lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        if (velocity > 1) { // Only log when actively scrolling
          console.log('📜 Scroll:', { 
            scroll: Math.round(scroll), 
            velocity: Math.round(velocity * 100) / 100, 
            direction, 
            progress: Math.round(progress * 100) + '%' 
          })
        }
      })
    }

    return () => {
      // Cleanup
      gsap.ticker.remove(updateLenis)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.clearScrollMemory()
      lenis.destroy()
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🧹 Lenis and ScrollTrigger cleaned up')
      }
    }
  }, [])

  // Scroll to element method
  const scrollTo = useCallback((target, options = {}) => {
    if (!lenisRef.current) return

    const defaultScrollOptions = {
      offset: 0,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    }

    lenisRef.current.scrollTo(target, defaultScrollOptions)
  }, [])

  // Start/stop scrolling
  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  // Get current scroll position
  const getScroll = useCallback(() => {
    return lenisRef.current?.scroll || 0
  }, [])

  // Force ScrollTrigger refresh (useful after DOM changes)
  const refreshScrollTrigger = useCallback(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 ScrollTrigger manually refreshed')
      }
    })
  }, [])

  // Batch ScrollTrigger refresh for multiple DOM changes
  const batchRefreshScrollTrigger = useCallback(() => {
    if (!window.lenisRefreshTimeout) {
      window.lenisRefreshTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          delete window.lenisRefreshTimeout
          if (process.env.NODE_ENV === 'development') {
            console.log('🔄 ScrollTrigger batch refreshed')
          }
        })
      }, 100) // Batch multiple calls within 100ms
    }
  }, [])

  const contextValue = {
    lenis: lenisRef.current,
    scrollTo,
    start,
    stop,
    getScroll,
    refreshScrollTrigger,
    batchRefreshScrollTrigger
  }

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}

/**
 * Custom hook to access Lenis instance and utilities
 * @returns {object} Lenis context with methods
 */
export function useLenis() {
  const context = useContext(LenisContext)
  
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  
  return context
}

/**
 * Hook for scroll-based animations
 * @param {function} callback - Function to call on scroll
 * @param {array} deps - Dependencies array
 */
export function useScrollCallback(callback, deps = []) {
  const { lenis } = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleScroll = (data) => {
      callback(data)
    }

    lenis.on('scroll', handleScroll)

    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [lenis, callback, ...deps])
}

/**
 * Hook to disable/enable scrolling
 * @param {boolean} disabled - Whether scrolling should be disabled
 */
export function useScrollLock(disabled) {
  const { start, stop } = useLenis()

  useEffect(() => {
    if (disabled) {
      stop()
    } else {
      start()
    }
  }, [disabled, start, stop])
}

/**
 * Hook for components that need ScrollTrigger refresh on mount/unmount
 * Useful for dynamically loaded content or modal components
 * @param {boolean} shouldRefresh - Whether to refresh on mount (default: true)
 */
export function useScrollTriggerRefresh(shouldRefresh = true) {
  const { refreshScrollTrigger, batchRefreshScrollTrigger } = useLenis()

  useEffect(() => {
    if (shouldRefresh) {
      // Refresh when component mounts
      batchRefreshScrollTrigger()
      
      // Cleanup function for when component unmounts
      return () => {
        batchRefreshScrollTrigger()
      }
    }
  }, [shouldRefresh, batchRefreshScrollTrigger])

  // Return manual refresh function for component use
  return {
    refreshScrollTrigger,
    batchRefreshScrollTrigger
  }
}

/**
 * Utility function to create scroll-based animations with proper Lenis integration
 * @param {string|HTMLElement} trigger - ScrollTrigger trigger element
 * @param {object} animation - GSAP animation object
 * @param {object} scrollTriggerOptions - ScrollTrigger configuration
 * @returns {ScrollTrigger} ScrollTrigger instance
 */
export function createScrollAnimation(trigger, animation, scrollTriggerOptions = {}) {
  return ScrollTrigger.create({
    trigger,
    scroller: document.body, // Use body as scroller for Lenis
    refreshPriority: -1, // Lower priority to run after Lenis updates
    ...scrollTriggerOptions,
    animation
  })
}