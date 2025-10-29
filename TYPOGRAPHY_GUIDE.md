# 🎨 Typography System - Tech-Inspired Elegance

Complete guide to the premium typography system featuring **Space Grotesk** for headings and **Inter** for body text.

---

## 📖 Table of Contents

1. [Font Stack](#font-stack)
2. [Typography Scale](#typography-scale)
3. [Usage Examples](#usage-examples)
4. [Utility Classes](#utility-classes)
5. [Best Practices](#best-practices)
6. [Accessibility](#accessibility)

---

## 🔤 Font Stack

### Primary Fonts

**Space Grotesk** - Headings & Display Text
- Modern geometric sans-serif
- Tech-inspired with elegant proportions
- Tight letter-spacing for contemporary feel
- Variable weights: 300-700

**Inter** - Body Text & UI
- Optimized for screen readability
- Advanced OpenType features
- Excellent at small sizes
- Variable weights: 100-900

### Font Loading

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

---

## 📏 Typography Scale

### Headings (Space Grotesk)

| Element | Size (Mobile) | Size (Desktop) | Weight | Letter Spacing | Line Height |
|---------|---------------|----------------|---------|----------------|-------------|
| `h1` | 2.75rem (44px) | 7rem (112px) | 800 | -0.045em | 1.1 |
| `h2` | 2.25rem (36px) | 5rem (80px) | 700 | -0.04em | 1.15 |
| `h3` | 1.875rem (30px) | 3.5rem (56px) | 600 | -0.03em | 1.2 |
| `h4` | 1.5rem (24px) | 2.5rem (40px) | 600 | -0.025em | 1.3 |
| `h5` | 1.25rem (20px) | 1.75rem (28px) | 600 | -0.02em | 1.4 |
| `h6` | 1.125rem (18px) | 1.25rem (20px) | 600 | -0.015em | 1.5 |

### Body Text (Inter)

| Class | Size (Mobile) | Size (Desktop) | Weight | Letter Spacing | Line Height |
|-------|---------------|----------------|---------|----------------|-------------|
| `.lead` | 1.125rem | 1.5rem | 400 | -0.015em | 1.7 |
| `p` | 1rem | 1.125rem | 400 | -0.011em | 1.8 |
| `small` | 0.875rem | 0.9375rem | 400 | 0.005em | 1.6 |

### Key Typography Principles

**Negative Letter Spacing** - Tighter tracking creates modern, tech-inspired look
- Headings: -0.035em to -0.05em
- Body: -0.011em to -0.015em

**Generous Line Height** - Improves readability
- Headings: 1.1 to 1.5
- Body: 1.7 to 1.8

**Responsive Sizing** - Fluid typography using clamp()
```css
font-size: clamp(2.75rem, 6vw, 7rem);
```

---

## 💡 Usage Examples

### HTML Semantic Structure

```html
<article>
  <h1>Revolutionary Portfolio Design</h1>
  <p class="lead">
    Crafting digital experiences with cutting-edge technology
  </p>
  
  <section>
    <h2>Featured Projects</h2>
    <p>
      Each project represents a unique challenge solved through
      innovative thinking and modern web technologies.
    </p>
    
    <h3>E-Commerce Platform</h3>
    <p>
      Built with React, TypeScript, and headless CMS architecture
      for maximum flexibility and performance.
    </p>
  </section>
</article>
```

### React Component Example

```jsx
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        {/* Display headline */}
        <h1 className="text-display text-gradient-cosmic mb-6">
          Digital Innovator
        </h1>
        
        {/* Lead paragraph */}
        <p className="lead max-w-2xl">
          Transforming ideas into elegant, high-performance
          web experiences that captivate and convert.
        </p>
        
        {/* Body text */}
        <p className="text-body mt-4 max-w-xl">
          Specializing in React, Three.js, and modern
          JavaScript frameworks to build the future of web.
        </p>
      </div>
    </section>
  )
}
```

---

## 🎯 Utility Classes

### Display & Headline Classes

```css
/* Extra large hero text */
.text-display {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 8vw, 9rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

/* Large section headings */
.text-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 5vw, 6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

/* Medium headings */
.text-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.035em;
}
```

### Body Text Classes

```css
/* Emphasized body text */
.text-body-lg {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.75;
  letter-spacing: -0.015em;
}

/* Standard body text */
.text-body {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.8;
  letter-spacing: -0.011em;
}

/* Small descriptive text */
.text-caption {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.875rem, 1.25vw, 1rem);
  line-height: 1.6;
  letter-spacing: 0.005em;
  color: var(--text-secondary);
}
```

### Specialty Classes

```css
/* UI labels and tags */
.text-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Tech-styled numbers */
.text-tech-number {
  font-family: 'Space Grotesk', sans-serif;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "tnum", "lnum";
  letter-spacing: -0.02em;
}
```

### Gradient Text Effects

```css
/* Primary gradient */
.text-gradient {
  background: linear-gradient(to right, #60a5fa, #c084fc, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Premium animated gradient */
.text-gradient-premium {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%, #667eea 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 8s linear infinite;
}

/* Cosmic multi-color gradient */
.text-gradient-cosmic {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #667eea 100%
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 10s ease infinite;
}
```

---

## ✨ Best Practices

### 1. **Use Semantic HTML**

```html
<!-- ✅ Good - Semantic hierarchy -->
<article>
  <h1>Main Title</h1>
  <section>
    <h2>Section Title</h2>
    <p>Content</p>
  </section>
</article>

<!-- ❌ Bad - Skipping levels -->
<article>
  <h1>Main Title</h1>
  <h3>Subtitle</h3>
</article>
```

### 2. **Optimize Reading Width**

```jsx
{/* ✅ Good - Optimal line length */}
<p className="max-w-prose">
  Content that's easy to read with 60-75 characters per line
</p>

{/* ❌ Bad - Too wide */}
<p className="w-full">
  Very long lines reduce readability and strain eyes
</p>
```

### 3. **Use Text Balance**

```css
/* Prevents awkward single-word last lines */
h1 {
  text-wrap: balance;
}

/* Better paragraph line breaks */
p {
  text-wrap: pretty;
}
```

### 4. **Leverage OpenType Features**

```css
/* Inter features for better body text */
body {
  font-feature-settings: 
    "cv02",  /* Open digits */
    "cv03",  /* Open 'a' */
    "cv04",  /* Open 'g' */
    "cv11",  /* Single-story 'a' */
    "ss01",  /* Stylistic set 1 */
    "ss02";  /* Stylistic set 2 */
}
```

### 5. **Responsive Font Sizes**

```css
/* ✅ Good - Fluid typography */
h1 {
  font-size: clamp(2.75rem, 6vw, 7rem);
}

/* ❌ Bad - Fixed sizes */
h1 {
  font-size: 4rem;
}

@media (max-width: 768px) {
  h1 { font-size: 2rem; }
}
```

---

## ♿ Accessibility

### Contrast Ratios

Ensure text meets WCAG 2.1 AA standards:

- **Normal text** (< 18px): Minimum 4.5:1
- **Large text** (≥ 18px or 14px bold): Minimum 3:1
- **Headings**: Typically 7:1+ for best readability

```jsx
{/* ✅ Good - High contrast */}
<p className="text-white bg-gray-900">
  Clear, readable text
</p>

{/* ⚠️ Check - May need adjustment */}
<p className="text-gray-400 bg-gray-800">
  Verify contrast ratio
</p>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .text-gradient-premium,
  .text-gradient-cosmic {
    animation: none !important;
    background-position: 0% 50%;
  }
}
```

### Screen Reader Considerations

```jsx
{/* ✅ Good - Semantic heading hierarchy */}
<h1>Portfolio</h1>
<section>
  <h2>About</h2>
  <h3>Skills</h3>
</section>

{/* ✅ Good - Hidden but accessible */}
<h1 className="sr-only">
  Navigation Menu
</h1>
```

---

## 🎨 Component Examples

### Card with Typography

```jsx
export default function ProjectCard({ title, description, tech }) {
  return (
    <article className="glass-card p-8">
      {/* Label */}
      <span className="text-label text-primary-400 mb-4 block">
        Featured Project
      </span>
      
      {/* Title */}
      <h3 className="text-title mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-body mb-6 text-gray-300">
        {description}
      </p>
      
      {/* Tech stack */}
      <div className="flex gap-2 flex-wrap">
        {tech.map(item => (
          <span 
            key={item}
            className="text-caption px-3 py-1 bg-gray-800/50 rounded-full"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}
```

### Stats Display

```jsx
export default function Stats() {
  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Happy Clients' },
    { value: '3+', label: 'Years Experience' },
  ]
  
  return (
    <div className="grid grid-cols-3 gap-8">
      {stats.map(stat => (
        <div key={stat.label} className="text-center">
          {/* Number */}
          <div className="text-display text-tech-number text-gradient-cosmic mb-2">
            {stat.value}
          </div>
          
          {/* Label */}
          <div className="text-caption">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## 🚀 Quick Reference

### Heading Sizes (Tailwind)

```jsx
<h1 className="text-7xl md:text-9xl font-heading">Hero</h1>
<h2 className="text-5xl md:text-7xl font-heading">Section</h2>
<h3 className="text-4xl md:text-5xl font-heading">Subsection</h3>
```

### Body Text Variants

```jsx
<p className="text-lg">Lead paragraph</p>
<p className="text-base">Normal paragraph</p>
<p className="text-sm">Small text</p>
<p className="text-xs">Caption</p>
```

### Font Families (Tailwind)

```jsx
<h1 className="font-heading">Space Grotesk</h1>
<p className="font-body">Inter</p>
<code className="font-mono">Code</code>
```

---

## 📊 Typography Performance

### Font Loading Strategy

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">
```

### Optimization Tips

1. **Load only needed weights**: 400, 600, 700 (avoid 100-900 range)
2. **Use `font-display: swap`**: Prevents invisible text during load
3. **Subset fonts**: Only load Latin characters if applicable
4. **Self-host critical fonts**: For even better performance

---

**Typography system ready!** 🎨 Modern, elegant, and optimized for tech portfolios.

