// Example usage of Lenis hooks in components

import { useLenis, useScrollCallback, useScrollLock } from '../lib/lenis.jsx'
import { useState, useEffect } from 'react'

export function LenisUsageExample() {
  const { scrollTo, getScroll, start, stop } = useLenis()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)

  // Example 1: Listen to scroll events
  useScrollCallback(({ scroll, limit, progress, velocity }) => {
    setScrollProgress(progress * 100)
    
    // Custom logic based on scroll position
    if (velocity > 5) {
      console.log('Fast scrolling detected!')
    }
  })

  // Example 2: Lock/unlock scrolling
  useScrollLock(isScrollLocked)

  // Example 3: Programmatic scrolling
  const handleScrollTo = (target) => {
    scrollTo(target, {
      offset: -100,     // Offset from top
      duration: 2,      // Custom duration
      easing: (t) => t * (2 - t) // Custom easing
    })
  }

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Lenis Usage Examples</h3>
      
      {/* Scroll Progress */}
      <div className="mb-4">
        <p>Scroll Progress: {scrollProgress.toFixed(1)}%</p>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => handleScrollTo('#home')}
          className="px-4 py-2 bg-primary-600 rounded hover:bg-primary-500"
        >
          Scroll to Home
        </button>
        <button 
          onClick={() => handleScrollTo('#about')}
          className="px-4 py-2 bg-primary-600 rounded hover:bg-primary-500"
        >
          Scroll to About
        </button>
        <button 
          onClick={() => handleScrollTo('#contact')}
          className="px-4 py-2 bg-primary-600 rounded hover:bg-primary-500"
        >
          Scroll to Contact
        </button>
      </div>

      {/* Scroll Controls */}
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setIsScrollLocked(!isScrollLocked)}
          className={`px-4 py-2 rounded ${
            isScrollLocked ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
          }`}
        >
          {isScrollLocked ? 'Unlock Scroll' : 'Lock Scroll'}
        </button>
        <button 
          onClick={stop}
          className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
        >
          Stop Lenis
        </button>
        <button 
          onClick={start}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Start Lenis
        </button>
      </div>

      {/* Current Scroll Position */}
      <p className="text-sm text-gray-400">
        Current scroll position: {getScroll().toFixed(0)}px
      </p>
    </div>
  )
}

// Example of using Lenis in a modal component
export function ModalWithScrollLock({ isOpen, children }) {
  useScrollLock(isOpen) // Automatically lock scroll when modal is open

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
        {children}
      </div>
    </div>
  )
}

// Example of scroll-triggered animation component
export function ScrollTriggeredComponent() {
  const [isVisible, setIsVisible] = useState(false)

  useScrollCallback(({ scroll }) => {
    // Show component when scrolled past 500px
    setIsVisible(scroll > 500)
  })

  return (
    <div className={`transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <p>This component appears when you scroll down!</p>
    </div>
  )
}