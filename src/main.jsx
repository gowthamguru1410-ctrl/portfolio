import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LenisProvider } from './lib/lenis.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.jsx'
import './index.css'

// Enhanced Lenis configuration for smooth GSAP integration
const lenisOptions = {
  duration: 1.5,        // Scroll duration for smooth feel
  easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic ease-out for natural deceleration
  smoothWheel: true,    // Enable smooth wheel scrolling
  wheelMultiplier: 1.2, // Wheel scroll sensitivity (lower = smoother)
  touchMultiplier: 2,   // Touch scroll sensitivity
  normalizeWheel: true, // Normalize wheel delta across browsers
  infinite: false,      // Disable infinite scroll
  gestureOrientation: 'vertical', // Restrict to vertical scrolling
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider options={lenisOptions}>
          <App />
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)

/* 
🎯 USAGE EXAMPLES:

1. Basic Lenis hook usage in components:
```jsx
import { useLenis, useScrollCallback } from './lib/lenis.jsx'

function MyComponent() {
  const { scrollTo, getScroll } = useLenis()
  
  // Scroll to element on button click
  const handleScrollToSection = () => {
    scrollTo('#section-id', { offset: -100, duration: 2 })
  }
  
  // Listen to scroll events
  useScrollCallback(({ scroll, velocity, direction }) => {
    console.log('Current scroll:', scroll)
    if (velocity > 5) {
      console.log('Fast scrolling detected!')
    }
  })
  
  return <button onClick={handleScrollToSection}>Scroll to Section</button>
}
```

2. ScrollTrigger refresh for dynamic content:
```jsx
import { useScrollTriggerRefresh } from './lib/lenis.jsx'

function DynamicContent() {
  const { refreshScrollTrigger } = useScrollTriggerRefresh()
  
  const [content, setContent] = useState([])
  
  const loadMoreContent = async () => {
    const newContent = await fetchMoreContent()
    setContent(prev => [...prev, ...newContent])
    
    // Refresh ScrollTrigger after DOM changes
    setTimeout(() => {
      refreshScrollTrigger()
    }, 100)
  }
  
  return (
    <div>
      {content.map(item => <div key={item.id}>{item.content}</div>)}
      <button onClick={loadMoreContent}>Load More</button>
    </div>
  )
}
```

3. Creating scroll animations with Lenis integration:
```jsx
import { createScrollAnimation } from './lib/lenis.jsx'
import { gsap } from 'gsap'

function AnimatedSection() {
  useEffect(() => {
    const tl = gsap.timeline()
    tl.from('.animate-element', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })
    
    // Create scroll animation with Lenis integration
    const scrollTrigger = createScrollAnimation(
      '.section',
      tl,
      {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: false // Set to true for debugging
      }
    )
    
    return () => scrollTrigger.kill()
  }, [])
  
  return (
    <section className="section">
      <div className="animate-element">Content 1</div>
      <div className="animate-element">Content 2</div>
      <div className="animate-element">Content 3</div>
    </section>
  )
}
```

4. Modal with scroll lock:
```jsx
import { useScrollLock } from './lib/lenis.jsx'

function Modal({ isOpen, onClose }) {
  // Disable scrolling when modal is open
  useScrollLock(isOpen)
  
  return isOpen ? (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <h2>Modal Content</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null
}
```

🔧 Key Integration Points:
- ScrollTrigger automatically refreshes on Lenis scroll events
- requestAnimationFrame prevents excessive refresh calls
- ScrollTrigger.scrollerProxy configures proper scroll value tracking
- Batch refresh utility prevents performance issues with multiple DOM changes
- Debug logging in development mode for troubleshooting

⚡ Performance Tips:
- Use batchRefreshScrollTrigger for multiple simultaneous DOM changes
- Set refreshPriority: -1 on ScrollTriggers to run after Lenis updates
- Use the provided createScrollAnimation utility for consistent setup
- Monitor console logs in development to verify smooth integration
*/
