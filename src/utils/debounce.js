/**
 * Debounce utility for performance optimization
 * Delays function execution until after wait time has elapsed since last call
 */
export function debounce(func, wait = 150) {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle utility for performance optimization
 * Ensures function is only called once per specified time period
 */
export function throttle(func, limit = 150) {
  let inThrottle
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * RequestAnimationFrame throttle for smooth animations
 * Ensures function is called at most once per frame
 */
export function rafThrottle(func) {
  let rafId = null
  
  return function executedFunction(...args) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args)
        rafId = null
      })
    }
  }
}

/**
 * React hook for debounced values
 */
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 150) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * React hook for debounced callbacks
 */
import { useCallback, useRef } from 'react'

export function useDebouncedCallback(callback, delay = 150) {
  const timeoutRef = useRef(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay])
}

/**
 * React hook for throttled callbacks
 */
export function useThrottledCallback(callback, limit = 150) {
  const inThrottle = useRef(false)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args) => {
    if (!inThrottle.current) {
      callbackRef.current(...args)
      inThrottle.current = true
      setTimeout(() => {
        inThrottle.current = false
      }, limit)
    }
  }, [limit])
}

/**
 * React hook for window resize with debounce
 */
export function useDebouncedResize(callback, delay = 150) {
  const debouncedCallback = useDebouncedCallback(callback, delay)

  useEffect(() => {
    window.addEventListener('resize', debouncedCallback)
    
    return () => {
      window.removeEventListener('resize', debouncedCallback)
    }
  }, [debouncedCallback])
}

/**
 * React hook for window scroll with throttle
 */
export function useThrottledScroll(callback, limit = 16) {
  const throttledCallback = useThrottledCallback(callback, limit)

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledCallback)
    }
  }, [throttledCallback])
}
