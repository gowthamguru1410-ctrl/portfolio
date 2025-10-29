# ♿ Accessibility Quick Reference

## 🎯 **Applied Fixes Summary**

### **Header Component** ✅
```jsx
// ARIA Labels for Navigation
<nav aria-label="Main navigation">
  <button aria-label="Navigate to home section">Home</button>
  <button aria-label="Switch to light mode" aria-pressed={isDark}>🌙</button>
  <button aria-expanded={isOpen} aria-controls="mobile-menu">Menu</button>
</nav>

// Screen Reader Only Text
<span className="sr-only">Dark mode active</span>
<span aria-hidden="true">🌙</span>

// Focus States
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

### **Project Cards** ✅
```jsx
// Semantic Article
<motion.article className="project-card">
  <button 
    onClick={() => onClick(project)}
    aria-label={`View details for ${project.title}`}
  >
    <img 
      src={project.image} 
      alt={`Screenshot of ${project.title} project`}
    />
    <h3>{project.title}</h3>
  </button>
</motion.article>

// Technology List
<div role="list" aria-label="Technologies used">
  <span role="listitem">{tech}</span>
</div>
```

### **Project Modal** ✅
```jsx
// Dialog Structure
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">{project.title}</h2>
  <p id="modal-description">{project.details}</p>
  
  <button 
    onClick={onClose}
    aria-label="Close project details"
  >
    <svg aria-hidden="true">...</svg>
  </button>
</div>

// Focus Management
useEffect(() => {
  modalRef.current?.focus()
}, [])

// Keyboard Support
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [onClose])
```

---

## 🔑 **Key Patterns**

### **1. Interactive Elements**
```jsx
// Button Pattern
<button
  onClick={handleClick}
  aria-label="Descriptive action"
  className="focus:ring-2 focus:ring-primary-500"
>
  Click me
</button>

// Link Pattern
<Link
  to="/page"
  aria-label="Navigate to page"
  className="focus:ring-2 focus:ring-primary-500"
>
  Go to page
</Link>
```

### **2. Images**
```jsx
// Informative Image
<img 
  src="chart.png" 
  alt="Bar chart showing 40% increase in sales for Q3 2024"
/>

// Decorative Image
<img 
  src="decoration.svg" 
  alt="" 
  aria-hidden="true"
/>
```

### **3. Form Fields**
```jsx
<div>
  <label htmlFor="email">
    Email <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert">
      Please enter a valid email
    </p>
  )}
</div>
```

### **4. Loading States**
```jsx
<div role="status" aria-live="polite">
  {isLoading ? "Loading..." : "Content loaded"}
</div>

// Or with screen reader only
<div className="sr-only" role="status" aria-live="polite">
  {isLoading ? "Loading projects" : `Loaded ${count} projects`}
</div>
```

### **5. Toggles & Switches**
```jsx
<button
  role="switch"
  aria-checked={isEnabled}
  onClick={() => setIsEnabled(!isEnabled)}
  aria-label="Enable notifications"
>
  {isEnabled ? 'On' : 'Off'}
</button>
```

---

## 🧪 **Quick Testing Commands**

### **Keyboard Navigation**
- `Tab` - Move to next interactive element
- `Shift + Tab` - Move to previous element
- `Enter` - Activate buttons/links
- `Space` - Activate buttons, toggle checkboxes
- `Esc` - Close modals/dialogs
- `Arrow keys` - Navigate within components (menus, tabs)

### **Screen Reader Testing**
```bash
# macOS - VoiceOver
Cmd + F5

# Windows - NVDA (free)
# Download from https://www.nvaccess.org/

# Test checklist:
# 1. Can you navigate with Tab?
# 2. Are headings announced correctly?
# 3. Are images described?
# 4. Are form labels associated?
# 5. Are buttons clearly labeled?
# 6. Can you operate all features?
```

### **Automated Testing**
```bash
# Install axe DevTools browser extension
# Or use Lighthouse in Chrome DevTools

# Run Lighthouse accessibility audit:
# 1. Open Chrome DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Check "Accessibility"
# 4. Click "Generate report"
```

---

## 📋 **Common ARIA Patterns**

### **Modal/Dialog**
```jsx
role="dialog"
aria-modal="true"
aria-labelledby="dialog-title"
aria-describedby="dialog-desc"
```

### **Navigation**
```jsx
<nav aria-label="Main navigation">
<nav aria-label="Footer navigation">
```

### **Buttons**
```jsx
aria-label="Descriptive text"
aria-pressed="true/false" // Toggle buttons
aria-expanded="true/false" // Disclosure buttons
aria-controls="element-id" // Controls another element
```

### **Live Regions**
```jsx
role="status" aria-live="polite" // Non-urgent updates
role="alert" aria-live="assertive" // Urgent updates
aria-atomic="true" // Announce entire region
```

### **Lists**
```jsx
role="list"
role="listitem"
role="menu" // For app menus, not navigation
role="menuitem"
```

---

## ⚠️ **Common Mistakes to Avoid**

### ❌ **Don't Do This**
```jsx
// Generic alt text
<img alt="image" />

// Div buttons (not keyboard accessible)
<div onClick={handleClick}>Click me</div>

// Missing labels
<input type="text" placeholder="Name" />

// Non-descriptive links
<a href="/more">Click here</a>

// Color-only indicators
<span className="text-red-500">Required</span>
```

### ✅ **Do This Instead**
```jsx
// Descriptive alt text
<img alt="Product dashboard showing sales analytics" />

// Proper button element
<button onClick={handleClick}>Click me</button>

// Proper label association
<label htmlFor="name">Name</label>
<input id="name" type="text" />

// Descriptive link text
<a href="/more">Read more about our services</a>

// Multiple indicators
<span className="text-red-500" aria-label="required">*</span>
```

---

## 🎨 **Focus Styles Reference**

```css
/* Tailwind Focus Utilities */
focus:outline-none /* Remove default outline */
focus:ring-2 /* Add 2px ring */
focus:ring-primary-500 /* Ring color */
focus:ring-offset-2 /* Space between element and ring */
focus:ring-offset-gray-900 /* Offset color (for dark backgrounds) */

/* Complete Focus Style */
className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-primary-500 
  focus:ring-offset-2 
  focus:ring-offset-gray-900
  rounded
"

/* Custom Focus in CSS */
.custom-focus:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

---

## 📱 **Mobile Accessibility**

```jsx
// Touch target size (minimum 44x44px)
<button className="min-w-[44px] min-h-[44px]">
  <span className="sr-only">Menu</span>
</button>

// Proper spacing for touch
<div className="flex gap-4"> {/* 16px = 4 * 4px */}
  <button>Button 1</button>
  <button>Button 2</button>
</div>

// Prevent pinch-zoom disable
<meta name="viewport" content="width=device-width, initial-scale=1">
{/* DON'T use: user-scalable=no */}
```

---

## 🔍 **Testing Tools & Resources**

### **Browser Extensions**
- **axe DevTools** - Free accessibility testing
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Built into Chrome DevTools
- **Accessibility Insights** - Microsoft tool

### **Screen Readers**
- **NVDA** (Windows) - Free
- **JAWS** (Windows) - Commercial
- **VoiceOver** (macOS/iOS) - Built-in
- **TalkBack** (Android) - Built-in

### **Documentation**
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 🎯 **Checklist for New Components**

Before deploying a new component:

- [ ] All interactive elements keyboard accessible (Tab, Enter, Space)
- [ ] Visible focus indicators on all interactive elements
- [ ] Proper semantic HTML (`<button>`, `<nav>`, `<article>`, etc.)
- [ ] ARIA labels on icon-only buttons
- [ ] Alt text on all images (or empty alt for decorative)
- [ ] Form labels associated with inputs
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Tested with keyboard only
- [ ] Tested with screen reader
- [ ] Tested at 200% zoom
- [ ] No horizontal scrolling at 200% zoom

---

## 💡 **Pro Tips**

1. **Start with semantic HTML** - Most accessibility comes for free
2. **Test early and often** - Don't wait until the end
3. **Use actual assistive technologies** - Not just automated tools
4. **Focus visible = UX for everyone** - Not just screen reader users
5. **Descriptive is better** - Better too much context than too little
6. **Keyboard navigation is fundamental** - If you can't keyboard it, fix it
7. **ARIA is a last resort** - Use native HTML when possible
8. **Ask users** - Best feedback comes from people with disabilities

---

This quick reference covers 95% of common accessibility scenarios in modern React applications!
