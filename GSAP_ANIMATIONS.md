# GSAP Animation Library Documentation

## Overview

Enhanced GSAP utility library with ScrollTrigger integration for modern React applications. Provides easy-to-use functions for scroll-based animations, reveals, and interactive effects.

## Features

- ✅ **ScrollTrigger Integration** - Automatic scroll-based animations
- ✅ **Directional Reveals** - 8 different reveal directions
- ✅ **Batch Animations** - Animate multiple elements with stagger
- ✅ **Parallax Effects** - Smooth parallax scrolling
- ✅ **Text Animations** - Character-by-character reveals
- ✅ **Timeline Utilities** - Easy scroll-triggered timelines

## Installation

```bash
npm install gsap
```

## Basic Usage

```javascript
import { revealFrom, batchReveal, createScrollTimeline } from './lib/gsap'
```

## API Reference

### revealFrom(direction, element, options)

The core function for reveal animations with ScrollTrigger.

**Parameters:**
- `direction` (string): Animation direction
- `element` (HTMLElement|string): Target element or selector
- `options` (object): Animation and ScrollTrigger options

**Available Directions:**
- `'up'` - Slides up from below
- `'down'` - Slides down from above
- `'left'` - Slides in from left
- `'right'` - Slides in from right
- `'scale'` - Scales in from small
- `'fade'` - Fades in
- `'rotateIn'` - Rotates and scales in
- `'slideUp'` - Larger slide up movement
- `'slideDown'` - Larger slide down movement

**Default Options:**
```javascript
{
  duration: 1,
  ease: "power2.out",
  delay: 0,
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none none",
  once: true
}
```

**Examples:**

```javascript
// Basic reveal from bottom
revealFrom('up', '.my-element')

// Custom options
revealFrom('scale', '.hero-title', {
  duration: 1.5,
  ease: "back.out(1.7)",
  delay: 0.5
})

// Custom ScrollTrigger settings
revealFrom('left', '.sidebar', {
  start: "top center",
  toggleActions: "play reverse play reverse"
})
```

### batchReveal(direction, elements, options)

Animate multiple elements with stagger effect.

**Parameters:**
- `direction` (string): Animation direction
- `elements` (string|NodeList): Elements selector or NodeList
- `options` (object): Animation options with stagger

**Example:**
```javascript
// Animate all cards with stagger
batchReveal('up', '.card', {
  stagger: 0.2,
  duration: 0.8,
  start: "top 85%"
})
```

### createScrollTimeline(trigger, options)

Create a ScrollTrigger-based timeline for complex animations.

**Example:**
```javascript
const tl = createScrollTimeline('.section', {
  start: "top center",
  end: "bottom center",
  scrub: 1
})

tl.to('.element1', { rotation: 360, duration: 2 })
  .to('.element2', { scale: 1.2, duration: 1 }, "-=1")
```

### parallax(element, speed, options)

Create parallax scrolling effects.

**Parameters:**
- `element` (HTMLElement|string): Target element
- `speed` (number): Parallax speed (0.1 to 2)
- `options` (object): Additional ScrollTrigger options

**Example:**
```javascript
parallax('.bg-image', 0.5)
```

### revealText(element, options)

Animate text character by character.

**Example:**
```javascript
revealText('.animated-title', {
  stagger: 0.03,
  duration: 0.8
})
```

## React Integration Examples

### Component with useEffect

```jsx
import { useEffect, useRef } from 'react'
import { revealFrom, batchReveal } from '../lib/gsap'

function AnimatedComponent() {
  const titleRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    // Animate title
    revealFrom('scale', titleRef.current, {
      duration: 1.2,
      ease: "back.out(1.7)"
    })

    // Animate content elements
    revealFrom('up', '.content-item', {
      stagger: 0.2
    })

    // Animate cards with batch reveal
    batchReveal('up', '.card', {
      stagger: 0.15,
      start: "top 85%"
    })
  }, [])

  return (
    <div>
      <h2 ref={titleRef}>Animated Title</h2>
      <div ref={contentRef}>
        <p className="content-item">First paragraph</p>
        <p className="content-item">Second paragraph</p>
      </div>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
    </div>
  )
}
```

### Custom Hook for Animations

```jsx
import { useEffect, useRef } from 'react'
import { revealFrom } from '../lib/gsap'

function useRevealAnimation(direction = 'up', options = {}) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      revealFrom(direction, ref.current, options)
    }
  }, [direction])

  return ref
}

// Usage
function MyComponent() {
  const titleRef = useRevealAnimation('scale', { duration: 1.5 })
  const contentRef = useRevealAnimation('up', { delay: 0.3 })

  return (
    <div>
      <h2 ref={titleRef}>Animated Title</h2>
      <p ref={contentRef}>Animated content</p>
    </div>
  )
}
```

### Reusable Animated Component

```jsx
function AnimatedSection({ children, direction = 'up', className = '', ...options }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      revealFrom(direction, ref.current, options)
    }
  }, [direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Usage
<AnimatedSection direction="scale" duration={1.5}>
  <h2>This will scale in</h2>
</AnimatedSection>
```

## Animation Combinations

### Staggered Reveals
```javascript
// Title first, then content with stagger
revealFrom('scale', '.title')
revealFrom('up', '.content p', {
  stagger: 0.1,
  delay: 0.5
})
```

### Sequential Timeline
```javascript
const tl = createScrollTimeline('.section')
tl.add(() => revealFrom('left', '.left-content'))
  .add(() => revealFrom('right', '.right-content'), "-=0.5")
  .add(() => batchReveal('up', '.bottom-items', { stagger: 0.1 }))
```

### Complex Scroll Effects
```javascript
// Different triggers for different elements
revealFrom('up', '.intro', { start: "top 90%" })
revealFrom('scale', '.featured', { start: "top 70%" })
revealFrom('fade', '.details', { start: "top 60%" })
```

## Performance Tips

1. **Use `once: true`** for one-time animations to avoid re-triggering
2. **Batch similar animations** using `batchReveal` for better performance
3. **Cleanup ScrollTriggers** when components unmount
4. **Use `will-change` CSS** property for animated elements

## ScrollTrigger Options

Common ScrollTrigger options you can use:

```javascript
{
  trigger: '.element',        // Element that triggers the animation
  start: "top 80%",          // When animation starts
  end: "bottom 20%",         // When animation ends
  toggleActions: "play none none none", // onEnter, onLeave, onEnterBack, onLeaveBack
  once: true,                // Play only once
  scrub: true,               // Tie animation to scroll position
  pin: true,                 // Pin element during animation
  anticipatePin: 1           // Prevent layout shift
}
```

## Browser Support

- Chrome 41+
- Firefox 36+
- Safari 9+
- Edge 12+

## License

This utility library is built on top of GSAP. Please ensure you have appropriate GSAP licensing for your project.

## Examples in the Wild

Check `src/examples/GSAPUsage.jsx` for comprehensive examples and `src/components/About.jsx` for real-world usage.