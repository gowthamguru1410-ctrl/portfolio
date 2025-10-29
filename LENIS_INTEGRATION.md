# Lenis Smooth Scrolling Integration

## Overview

This enhanced Lenis implementation provides smooth scrolling with GSAP integration, React hooks, and performance optimizations for modern React applications.

## Features

- ✅ **GSAP Integration** - Synced with GSAP ticker for optimal performance
- ✅ **React Context** - Centralized state management
- ✅ **Custom Hooks** - Easy-to-use scroll utilities
- ✅ **ScrollTrigger Support** - Automatic updates for GSAP ScrollTrigger
- ✅ **Performance Optimized** - Dual RAF system with fallbacks
- ✅ **TypeScript Ready** - Full type support

## Installation

```bash
npm install lenis gsap
```

## Basic Setup

### 1. Wrap your app with LenisProvider

```jsx
// main.jsx
import { LenisProvider } from './lib/lenis.jsx'

const lenisOptions = {
  duration: 1.5,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
  wheelMultiplier: 1.2,
  touchMultiplier: 2,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <LenisProvider options={lenisOptions}>
    <App />
  </LenisProvider>
)
```

### 2. Use Lenis hooks in components

```jsx
import { useLenis, useScrollCallback, useScrollLock } from './lib/lenis.jsx'

function MyComponent() {
  const { scrollTo, getScroll, start, stop } = useLenis()

  // Programmatic scrolling
  const handleScrollTo = () => {
    scrollTo('#section', {
      offset: -100,
      duration: 2,
      easing: (t) => t * (2 - t)
    })
  }

  return (
    <button onClick={handleScrollTo}>
      Scroll to Section
    </button>
  )
}
```

## API Reference

### LenisProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `object` | `{}` | Lenis configuration options |
| `children` | `ReactNode` | - | Child components |

### useLenis()

Returns an object with:

| Method | Type | Description |
|--------|------|-------------|
| `lenis` | `Lenis` | Lenis instance |
| `scrollTo` | `function` | Scroll to target with options |
| `start` | `function` | Start Lenis |
| `stop` | `function` | Stop Lenis |
| `getScroll` | `function` | Get current scroll position |

### useScrollCallback(callback, deps)

Listen to scroll events with automatic cleanup.

```jsx
useScrollCallback(({ scroll, limit, progress, velocity, direction }) => {
  console.log('Scroll data:', { scroll, progress })
}, [])
```

### useScrollLock(disabled)

Lock or unlock scrolling based on boolean state.

```jsx
const [isModalOpen, setIsModalOpen] = useState(false)
useScrollLock(isModalOpen) // Locks scroll when modal is open
```

## Configuration Options

```jsx
const lenisOptions = {
  // Core options
  duration: 1.2,                    // Scroll duration in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  
  // Scroll behavior
  orientation: 'vertical',          // 'vertical' | 'horizontal'
  gestureOrientation: 'vertical',   // 'vertical' | 'horizontal' | 'both'
  smoothWheel: true,               // Enable smooth wheel scrolling
  wheelMultiplier: 1,              // Wheel scroll sensitivity
  touchMultiplier: 2,              // Touch scroll sensitivity
  normalizeWheel: true,            // Normalize wheel delta
  
  // Advanced options
  infinite: false,                 // Enable infinite scrolling
  wrapper: window,                 // Wrapper element
  content: document.documentElement, // Content element
}
```

## Advanced Usage Examples

### Scroll Progress Indicator

```jsx
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  
  useScrollCallback(({ progress }) => {
    setProgress(progress * 100)
  })

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

### Scroll-based Animations

```jsx
function ScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useScrollCallback(({ scroll }) => {
    setIsVisible(scroll > 500)
  })

  return (
    <div className={`transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <h2>Animated on Scroll</h2>
    </div>
  )
}
```

### Modal with Scroll Lock

```jsx
function Modal({ isOpen, onClose, children }) {
  useScrollLock(isOpen)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  )
}
```

## Performance Notes

1. **GSAP Integration**: Lenis is synced with GSAP's ticker for optimal performance
2. **Dual RAF System**: Falls back to requestAnimationFrame if GSAP ticker fails
3. **ScrollTrigger Updates**: Automatically updates GSAP ScrollTrigger on scroll
4. **Cleanup**: Proper cleanup prevents memory leaks

## Troubleshooting

### Common Issues

1. **ScrollTrigger not updating**: Ensure GSAP is properly installed and ScrollTrigger is registered
2. **Performance issues**: Check if multiple RAF loops are running
3. **Scroll not working**: Verify LenisProvider wraps your entire app

### Debug Mode

In development, Lenis will log scroll events to the console for debugging.

## Browser Support

- Chrome 61+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT License - See Lenis documentation for more details.