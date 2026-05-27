---
name: css-animations
description: "CSS and vanilla JS animation skill. Actions: animate, transition, reveal, scroll, hover, parallax, loading. Topics: @keyframes, CSS transition, animation-timeline, scroll-driven animations, Intersection Observer, GSAP, AOS, clip-path animation, gradient animation, text gradient, shimmer, skeleton, glassmorphism, neon glow, morphing, typewriter, counter, floating, bounce, pulse, spin, shake, flip. Works with plain HTML/CSS/JS without any framework."
---
# CSS Animations – Vanilla Animation Intelligence

Complete guide for smooth, performant animations using pure CSS and vanilla JS. No framework required.

## Core Rules

- **Only animate `transform` and `opacity`** — GPU-composited, zero layout cost
- **Use `will-change: transform`** only for elements that will definitely animate (remove after)
- **Always add `prefers-reduced-motion` check**
- **CSS transitions for state changes** (hover, focus, toggle)
- **CSS @keyframes for continuous/complex animations**
- **Intersection Observer for scroll-triggered animations** (not scroll events)

---

## Prefers-Reduced-Motion (ALWAYS include)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 30 Essential CSS Animation Recipes

### Entrance Animations

**1. Fade In**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.fade-in { animation: fadeIn 0.5s ease forwards; }
```

**2. Slide Up**
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.slide-up { animation: slideUp 0.5s ease forwards; }
```

**3. Slide In from Left**
```css
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
```

**4. Scale In**
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
```

**5. Stagger children with CSS delay**
```css
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 100ms; }
.list-item:nth-child(3) { animation-delay: 200ms; }
/* Or generate with JS: el.style.animationDelay = i * 100 + 'ms' */
```

---

### Hover Effects

**6. Lift on hover (card)**
```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}
```

**7. Scale button on hover**
```css
.btn {
  transition: transform 0.15s ease, background-color 0.15s ease;
}
.btn:hover { transform: scale(1.05); }
.btn:active { transform: scale(0.97); }
```

**8. Underline slide-in (nav links)**
```css
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.25s ease;
}
.nav-link:hover::after { width: 100%; }
```

**9. Image zoom on hover**
```css
.img-wrapper { overflow: hidden; }
.img-wrapper img {
  transition: transform 0.4s ease;
}
.img-wrapper:hover img { transform: scale(1.08); }
```

**10. Glow effect**
```css
.glow-btn {
  transition: box-shadow 0.2s ease;
}
.glow-btn:hover {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
}
```

---

### Loading & Skeleton States

**11. Skeleton shimmer**
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.skeleton {
  background: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

**12. Spinner**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 24px; height: 24px;
  border: 2px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
```

**13. Pulse dot (live indicator)**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}
.live-dot {
  width: 8px; height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}
```

---

### Background & Visual Effects

**14. Animated gradient background**
```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.gradient-bg {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}
```

**15. Animated text gradient**
```css
@keyframes textGradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.gradient-text {
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #6366f1);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textGradient 3s linear infinite;
}
```

**16. Typewriter effect (CSS only)**
```css
@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink { 50% { border-color: transparent } }
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  width: 0;
  animation: typing 2s steps(30) forwards, blink 0.7s step-end infinite;
}
```

**17. Floating animation**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
.floating { animation: float 3s ease-in-out infinite; }
```

**18. Neon glow text**
```css
@keyframes neonPulse {
  0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #6366f1; }
  50% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 40px #6366f1, 0 0 80px #6366f1; }
}
.neon { animation: neonPulse 2s ease-in-out infinite; }
```

**19. Glassmorphism card**
```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
}
```

**20. Clip-path reveal (hero section)**
```css
@keyframes clipReveal {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0% 0 0); }
}
.clip-reveal { animation: clipReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards; }
```

---

### Scroll-Triggered (Intersection Observer)

**21. Reveal on scroll (JS)**
```js
// CSS
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

// JS
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
)
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
```

**22. Scroll-driven progress bar (CSS, modern browsers)**
```css
@keyframes scaleProgress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.progress {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: #6366f1;
  transform-origin: left;
  animation: scaleProgress linear;
  animation-timeline: scroll();
}
```

**23. Parallax with CSS transform (JS)**
```js
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY
  document.querySelector('.parallax-slow').style.transform = `translateY(${scrolled * 0.3}px)`
  document.querySelector('.parallax-fast').style.transform = `translateY(${scrolled * 0.6}px)`
})
```

---

### Counter & Number Animations

**24. Animated counter (JS)**
```js
function animateCounter(el, target, duration = 2000) {
  const start = performance.now()
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
    el.textContent = Math.round(eased * target).toLocaleString()
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
// Usage: animateCounter(document.querySelector('.counter'), 10000)
```

---

### Advanced Visual

**25. 3D card tilt on mouse move**
```js
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0)'
  })
})
```

**26. Ripple effect on button click**
```js
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px; top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.4); border-radius:50%;
      transform:scale(0); animation:rippleAnim 0.5s ease-out forwards; pointer-events:none;
    `
    btn.style.position = 'relative'
    btn.style.overflow = 'hidden'
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 500)
  })
})
```
```css
@keyframes rippleAnim {
  to { transform: scale(4); opacity: 0; }
}
```

**27. Magnetic hover (cursor attraction)**
```js
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35
    el.style.transform = `translate(${x}px, ${y}px)`
  })
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.4s ease'
  })
})
```

**28. Flip card**
```css
.flip-container { perspective: 800px; }
.flip-card {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}
.flip-container:hover .flip-card { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
}
.flip-back { transform: rotateY(180deg); }
```

**29. Smooth scroll reveal with stagger (JS)**
```js
const elements = document.querySelectorAll('.stagger-reveal')
elements.forEach((el, i) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(30px)'
  el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`
})
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1'
      e.target.style.transform = 'translateY(0)'
    }
  })
})
elements.forEach(el => observer.observe(el))
```

**30. Smooth page anchor scroll**
```js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})
```

---

## Duration Reference

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button hover | 150ms | ease |
| Card hover | 200ms | ease |
| Modal open | 250ms | ease-out |
| Modal close | 200ms | ease-in |
| Page scroll reveal | 500–700ms | ease-out |
| Background gradients | 6–10s | linear infinite |
| Loading spinner | 600–800ms | linear infinite |
