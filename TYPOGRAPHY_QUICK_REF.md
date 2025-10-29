# 📋 Typography Quick Reference Card

**Space Grotesk + Inter - Tech-Inspired Design System**

---

## 🎨 Font Families

```jsx
// Headings (Space Grotesk)
<h1 className="font-heading">Title</h1>

// Body (Inter)  
<p className="font-body">Content</p>

// Code (JetBrains Mono)
<code className="font-mono">Code</code>
```

---

## 📏 Size Classes

```jsx
// Display - Extra large hero
<h1 className="text-display">Digital Innovator</h1>

// Headline - Section titles
<h2 className="text-headline">Featured Work</h2>

// Title - Subsections
<h3 className="text-title">Project Name</h3>

// Body Large - Emphasis
<p className="text-body-lg">Introduction text</p>

// Body - Standard
<p className="text-body">Paragraph text</p>

// Caption - Small text
<p className="text-caption">Metadata</p>

// Label - Tags/Badges
<span className="text-label">Featured</span>

// Tech Numbers
<div className="text-tech-number">50+</div>
```

---

## 🌈 Gradient Text

```jsx
// Basic gradient
<span className="text-gradient">Colorful</span>

// Premium animated
<span className="text-gradient-premium">Premium</span>

// Cosmic animated
<span className="text-gradient-cosmic">Cosmic</span>
```

---

## 🎯 Tailwind Typography

```jsx
// Heading sizes
text-6xl md:text-9xl    // Hero (h1)
text-5xl md:text-7xl    // Section (h2)
text-4xl md:text-5xl    // Subsection (h3)

// Body sizes
text-lg                 // Lead
text-base               // Normal
text-sm                 // Small
text-xs                 // Tiny

// Font families
font-heading            // Space Grotesk
font-body               // Inter
font-mono               // Monospace

// Font weights
font-extrabold          // 800
font-bold               // 700
font-semibold           // 600
font-medium             // 500
font-normal             // 400

// Letter spacing
tracking-tighter        // -0.05em
tracking-tight          // -0.025em
tracking-normal         // 0em
tracking-wide           // 0.025em
tracking-wider          // 0.05em
tracking-widest         // 0.1em
```

---

## 📐 Letter Spacing Guide

```css
h1:  -0.045em   (Extra tight)
h2:  -0.04em    (Tight)
h3:  -0.03em    (Moderate)
p:   -0.011em   (Subtle)
small: 0.005em  (Slightly open)
label: 0.05em   (Wide - uppercase)
```

---

## 📊 Line Height Guide

```css
h1:  1.1    (Tight impact)
h2:  1.15   
h3:  1.2    
p:   1.8    (Generous reading)
lead: 1.7
small: 1.6
```

---

## 🎬 Signature Logo

```jsx
import SignatureLogo from './components/SignatureLogo'

<SignatureLogo className="h-12 w-auto" />
```

**Features:**
- Animated drawing effect (GSAP)
- Gradient strokes
- Breathing glow pulse
- Auto-plays on mount

---

## ♿ Accessibility

```jsx
// Semantic hierarchy
<h1> → <h2> → <h3> (Don't skip!)

// Max reading width
<p className="max-w-prose">...</p>

// Proper contrast
Light on dark: 4.5:1+
Large text: 3:1+

// Reduced motion
@media (prefers-reduced-motion: reduce)
```

---

## 💡 Common Patterns

### Hero Section
```jsx
<h1 className="font-heading text-6xl md:text-9xl font-extrabold tracking-tighter">
  <span className="text-gradient-cosmic">Hi 👋 I'm [Name]</span>
</h1>
<p className="font-body text-lg leading-relaxed text-gray-300 mt-6">
  Tagline here
</p>
```

### Section Header
```jsx
<h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-4">
  Section Title
</h2>
<p className="text-body-lg text-gray-400">
  Section description
</p>
```

### Card
```jsx
<article className="glass-card p-8">
  <span className="text-label text-primary-400">Category</span>
  <h3 className="font-heading text-3xl font-semibold mt-3">Title</h3>
  <p className="font-body text-gray-300 mt-4">Description</p>
</article>
```

### Stats
```jsx
<div className="text-center">
  <div className="text-display text-tech-number text-gradient-cosmic">
    50+
  </div>
  <div className="text-caption mt-2">Projects</div>
</div>
```

---

## 🚀 Performance Tips

1. **Preload fonts**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```

2. **Use clamp() for fluid sizing**
```css
font-size: clamp(min, preferred, max);
```

3. **Limit font weights**
```
Inter: 400, 600, 700
Space Grotesk: 600, 700, 800
```

4. **GPU animations only**
```css
transform, opacity (✅)
width, height (❌)
```

---

## 🎨 Color Palette

```css
Primary:   #667eea
Secondary: #764ba2
Accent:    #f093fb
```

---

## 📱 Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 🔗 Resources

- **Full Guide**: `TYPOGRAPHY_GUIDE.md`
- **Implementation**: `TYPOGRAPHY_IMPLEMENTATION.md`
- **Dev Server**: `http://localhost:5177/`

---

**Quick Copy-Paste Ready!** 📋✨

