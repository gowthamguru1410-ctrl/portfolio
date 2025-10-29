# About Section - Immersive Features Documentation

## Overview
The About section has been completely refactored into an immersive, interactive experience featuring split layout, 3D orbiting skill icons, animated text, parallax effects, and premium glassmorphism styling.

## 🎨 Key Features

### 1. **Split Layout Design**

#### Left Side - Photo Section
- **Circular Photo Container**
  - Dimensions: 256px × 256px (mobile), 320px × 320px (desktop)
  - Rounded-full design with glassmorphism border
  - Placeholder gradient avatar with emoji (👨‍💻)
  - Easy to replace with actual photo (commented code included)

- **Glowing Border Effect**
  - Animated gradient: primary → purple → pink
  - Blur effect: 2xl (blur-2xl)
  - Opacity transitions on hover (50% → 75%)
  - Continuous pulse animation

- **Hover Tilt Animation**
  - Rotate: 5 degrees on hover
  - Scale: 1.05x on hover
  - Smooth Framer Motion transitions
  - Duration: 0.5s with power2.out easing

- **Floating Accent Dots**
  - Top-right: 8px primary dot with pulse
  - Bottom-left: 6px purple dot with delayed pulse
  - Blur effect for soft neon glow

- **Stats Cards** (Desktop only)
  - Glassmorphism cards with stats
  - "5+ Years Exp" (left side)
  - "50+ Projects" (right side)
  - Entrance animations with delays

#### Right Side - Content Section
- **Animated Text Paragraphs**
  - 3 main paragraphs with staggered entrance
  - Slide in from right (x: 50px → 0)
  - 0.15s delay between each paragraph
  - GSAP ScrollTrigger on scroll into view
  - Gradient text highlights for key terms

- **"What I Do" Glass Card**
  - 5 animated list items with icons
  - Individual Framer Motion entrance animations
  - Hover translate effect (slide right)
  - Glassmorphism backdrop blur

- **Download Resume CTA**
  - Premium button styling (btn-premium)
  - Animated entrance from bottom
  - Ready for PDF download integration

## 🌟 Interactive 3D Features

### 2. **Orbiting Skill Icons** (Desktop Only)

#### SkillOrb Component
- **3D Sphere Props**:
  - Radius: 0.4 units
  - Segments: 32×32 (smooth surface)
  - Metallic material (metalness: 0.8)
  - Emissive glow (emissiveIntensity: 0.3 → 0.8 on hover)

- **Orbit Animation**:
  - Circular orbit radius: 2.5 units
  - Orbital path: XZ plane (horizontal)
  - Vertical oscillation: Y-axis sine wave (±0.5 units)
  - Individual orbit speeds: 0.4 - 0.9
  - Gentle rotation on all axes

- **Hover Interactions**:
  - Scale up to 1.3x when hovered
  - Increased emissive intensity
  - Display skill name label above orb
  - Label always faces camera (billboard effect)

- **Skills Included**:
  1. React (#61DAFB) - Speed: 0.5
  2. TypeScript (#3178C6) - Speed: 0.7
  3. Node.js (#68A063) - Speed: 0.6
  4. Three.js (#000000) - Speed: 0.8
  5. Next.js (#ffffff) - Speed: 0.9
  6. GSAP (#88CE02) - Speed: 0.4

#### 3D Scene Setup
- **Lighting**:
  - Ambient light: 0.5 intensity (base illumination)
  - White point light: Position [10, 10, 10]
  - Purple point light: Position [-10, -10, -10] (accent)

- **Camera Controls**:
  - OrbitControls enabled
  - Auto-rotate: 0.5 speed
  - Zoom disabled
  - Pan disabled
  - Polar angle locked to horizontal view

- **Canvas Container**:
  - Glassmorphism card wrapper
  - Aspect-square ratio
  - Instructions: "Hover over the orbs to see skills • Drag to rotate"

### 3. **Animated Skill Bars** (Mobile Fallback)

When 3D is disabled (mobile or reduced motion):
- **5 Core Skills**:
  1. Frontend Development - 95%
  2. Backend Development - 88%
  3. 3D Graphics & Animation - 85%
  4. UI/UX Design - 80%
  5. Cloud & DevOps - 75%

- **Animation**:
  - Width animates from 0% to target percentage
  - Duration: 1.5s
  - Staggered delays (0.1s increments)
  - GSAP ScrollTrigger activation
  - Gradient fill: primary-500 → purple-500
  - Glow shadow effect

## 🎭 Parallax Effects

### Scroll-Based Parallax
- **Photo Container**: Moves UP as user scrolls down (-30px total)
- **Parallax Reference**: Moves DOWN as user scrolls down (+50px total)
- **Implementation**: GSAP ScrollTrigger with scrub: 1
- **Range**: From section top to section bottom
- **Desktop Only**: Disabled on mobile for performance

### Mouse Parallax
- Depth-based movement for different layers
- Smooth GSAP animations
- Desktop only feature

## 📦 Additional Sections

### Tech Stack Display
- **15 Technologies** displayed as chips:
  - React, Next.js, TypeScript, Node.js, Python
  - PostgreSQL, MongoDB, AWS, Docker, Three.js
  - GSAP, Tailwind CSS, GraphQL, Redis, Kubernetes

- **Interactions**:
  - Hover scale: 1.1x
  - Hover rotate: 2 degrees
  - Shimmer effect on hover
  - Border color transition

### Currently Learning Card
- **Highlighted Topics**:
  - AI/ML integration (primary color)
  - WebGL shaders (purple color)
  - WebXR experiences (pink color)
- **Animated dot indicator** (pulsing)
- **Border accent** (primary-500/20)

## 🎨 Styling Features

### Glassmorphism
- `.glass-card` class for all containers
- Backdrop blur with gradient borders
- Semi-transparent backgrounds
- Layered depth effect

### Gradient Text
- `.text-gradient-premium` for headings
- Smooth 3-color gradient (primary → purple → pink)
- Applied to: section title, "What I Do", skills title

### Background Elements
- **Top-left blob**: 72px × 72px, primary-500/10, blur-3xl
- **Bottom-right blob**: 96px × 96px, purple-500/10, blur-3xl
- Creates ambient glow effect

### Premium Shadows
- `shadow-glow-lg` on photo border
- `shadow-glow` on skill bars
- Soft neon effect throughout

## 📱 Responsive Design

### Desktop (> 1024px)
- ✅ Full 3D orbiting skills scene
- ✅ Two-column split layout
- ✅ Stats cards visible
- ✅ Parallax effects enabled
- ✅ Mouse interactions

### Tablet (768px - 1024px)
- ✅ Two-column layout maintained
- ✅ Skill bars instead of 3D
- ✅ Stats cards hidden
- ✅ Simplified animations

### Mobile (< 768px)
- ✅ Single column stack
- ✅ Photo on top, content below
- ✅ Animated skill bars
- ✅ Touch-optimized interactions
- ✅ No parallax (performance)

## ♿ Accessibility

### Reduced Motion Support
- Detects `prefers-reduced-motion` media query
- Disables all GSAP animations
- Disables parallax effects
- Shows static content immediately
- 3D scene replaced with skill bars

### Semantic HTML
- Proper heading hierarchy (h2, h3, h4)
- Accessible list markup
- Alt text ready for photo (commented)

## 🚀 Performance Optimizations

1. **Conditional 3D Rendering**
   - 3D only on desktop + no reduced motion
   - Mobile gets lightweight skill bars
   - Saves battery and memory

2. **Lazy ScrollTrigger**
   - Animations only fire when scrolled into view
   - Prevents unnecessary calculations

3. **RequestAnimationFrame**
   - useFrame for 3D animations (60fps)
   - GSAP uses RAF internally

4. **Memoization**
   - Refs prevent unnecessary re-renders
   - Static skill data

## 🎬 Animation Timeline

### On Scroll Into View:
1. **0.0s**: Section enters viewport
2. **0.0s - 1.2s**: Photo scales up + rotates (back.out easing)
3. **0.0s - 1.0s**: First paragraph slides in
4. **0.15s - 1.15s**: Second paragraph slides in
5. **0.30s - 1.30s**: Third paragraph slides in
6. **0.45s - 1.45s**: "What I Do" card slides in
7. **0.5s - 1.3s**: Stats cards fade in (desktop)
8. **Continuous**: 3D orbs orbit and rotate
9. **Continuous**: Parallax follows scroll

### On Hover (Photo):
- **0.0s - 0.5s**: Rotate 5deg + scale 1.05x
- **Immediate**: Glow opacity 50% → 75%

### On Hover (Skill Orb):
- **0.0s - 0.1s**: Scale 1.0x → 1.3x (lerp)
- **Immediate**: Emissive 0.3 → 0.8
- **Immediate**: Label appears

## 📝 Customization Guide

### Replace Photo:
```jsx
// Uncomment this in the photo container:
<img 
  src="/path/to/your/photo.jpg" 
  alt="Gowtham" 
  className="w-full h-full object-cover"
/>
```

### Adjust Stats:
```jsx
// Update these values:
<div className="text-2xl font-bold text-gradient-premium">5+</div>
<div className="text-xs text-gray-400">Years Exp</div>
```

### Change Skills:
```jsx
// Update skills array in SkillsScene:
{ label: 'YourSkill', color: '#hexcode', position: [0, 0, 0], speed: 0.5 }
```

### Modify Skill Levels:
```jsx
// Update skills array:
{ name: 'Your Skill', level: 90 }
```

### Change Orbit Speed:
```jsx
// In SkillOrb component:
const time = state.clock.getElapsedTime() * orbitSpeed  // Increase for faster
```

## 🐛 Known Limitations

1. **3D Font**: Skill labels use default Three.js font
2. **Photo Placeholder**: Requires manual photo upload
3. **Mobile 3D**: Disabled for performance (intentional)
4. **Safari**: Some blur effects may vary

## 🔮 Future Enhancements

- [ ] Add particle effects around photo
- [ ] Implement resume download functionality
- [ ] Add achievement badges/certifications
- [ ] Create timeline of experience
- [ ] Add interactive hover states on text
- [ ] Implement theme color switcher
