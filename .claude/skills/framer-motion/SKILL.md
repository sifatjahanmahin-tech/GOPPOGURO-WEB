---
name: framer-motion
description: "Framer Motion animation skill. Actions: animate, transition, scroll, drag, gesture, layout, spring, keyframe, stagger, reveal, parallax, page transition, whileHover, whileTap, whileInView, AnimatePresence, motion div, variants, useAnimation, useScroll, useTransform, useSpring. Elements: navbar, hero, card, button, modal, list, text, image, loader. Patterns: fade in, slide up, scale on hover, exit animation, drag to dismiss, scroll progress, staggered list, 3D flip, morphing, typewriter."
---
# Framer Motion – Animation Intelligence

Complete guide for production-quality animations using Framer Motion. Covers all core APIs, performance patterns, and 20 ready-to-use recipes.

## When to Apply

- Adding entrance/exit animations to any element
- Scroll-triggered reveals and parallax effects
- Gesture-based interactions (drag, hover, tap)
- Page transitions in Next.js / React Router
- Staggered list animations
- Layout animations (reordering, shared layout)

---

## Core Rules

### Performance (CRITICAL)
- **Only animate `transform` and `opacity`** — never `width`, `height`, `top`, `left`
- Always add `will-change: transform` for heavy animations (but remove after animation completes)
- Use `layout` prop for layout changes instead of animating dimensions directly
- Respect `prefers-reduced-motion`:
  ```tsx
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const animation = prefersReduced ? {} : { y: [0, -10, 0] }
  ```

### Duration & Easing (HIGH)
| Use Case | Duration | Easing |
|----------|----------|--------|
| Micro-interactions (hover, tap) | 150–200ms | `easeOut` |
| Entrances / reveals | 300–500ms | `easeOut` |
| Exit animations | 200–300ms | `easeIn` |
| Spring animations | stiffness 300, damping 25 | spring |
| Page transitions | 400–600ms | `[0.25, 0.1, 0.25, 1]` |

### AnimatePresence Rules
- **Always** wrap conditionally rendered components with `<AnimatePresence>`
- Add `exit` prop to every `<motion.div>` that needs an exit animation
- Use `mode="wait"` for page transitions to prevent overlap

---

## 20 Essential Recipes

### 1. Fade In on Mount
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
/>
```

### 2. Slide Up Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
/>
```

### 3. Scale on Hover (button/card)
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
/>
```

### 4. Staggered List
```tsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item} />)}
</motion.ul>
```

### 5. Scroll-Triggered Reveal (whileInView)
```tsx
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

### 6. Scroll Progress Bar
```tsx
const { scrollYProgress } = useScroll()
<motion.div
  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
  className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
/>
```

### 7. Parallax on Scroll
```tsx
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, -150])
<motion.div style={{ y }} />
```

### 8. Page Transition (Next.js)
```tsx
// layout.tsx
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

### 9. Modal Entrance/Exit
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

### 10. Drag to Dismiss
```tsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={(_, info) => {
    if (info.offset.y > 100) onDismiss()
  }}
/>
```

### 11. Hero Text Word-by-Word Reveal
```tsx
const words = 'Build amazing websites'.split(' ')
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const word = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

<motion.h1 variants={container} initial="hidden" animate="show">
  {words.map((w, i) => (
    <motion.span key={i} variants={word} style={{ display: 'inline-block', marginRight: '0.3em' }}>
      {w}
    </motion.span>
  ))}
</motion.h1>
```

### 12. Navbar Hide on Scroll Down
```tsx
const { scrollY } = useScroll()
const [hidden, setHidden] = useState(false)
useMotionValueEvent(scrollY, 'change', (latest) => {
  setHidden(latest > scrollY.getPrevious()! && latest > 80)
})
<motion.nav animate={hidden ? { y: -100 } : { y: 0 }} transition={{ duration: 0.3 }} />
```

### 13. Card 3D Flip
```tsx
const [flipped, setFlipped] = useState(false)
<motion.div
  animate={{ rotateY: flipped ? 180 : 0 }}
  transition={{ duration: 0.5 }}
  style={{ transformStyle: 'preserve-3d' }}
  onClick={() => setFlipped(!flipped)}
/>
```

### 14. Skeleton Loading Pulse
```tsx
<motion.div
  animate={{ opacity: [0.4, 1, 0.4] }}
  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  className="bg-gray-200 rounded h-4 w-full"
/>
```

### 15. Floating Action Button Spring
```tsx
<motion.button
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
/>
```

### 16. Counter Number Animation
```tsx
const count = useMotionValue(0)
const rounded = useTransform(count, Math.round)
useEffect(() => {
  animate(count, 1000, { duration: 2 })
}, [])
<motion.span>{rounded}</motion.span>
```

### 17. Accordion Expand/Collapse
```tsx
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
  style={{ overflow: 'hidden' }}
/>
```

### 18. Notification Toast Slide In
```tsx
<motion.div
  initial={{ x: 100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
/>
```

### 19. Image Reveal on Scroll
```tsx
<motion.div
  initial={{ clipPath: 'inset(100% 0 0 0)' }}
  whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
/>
```

### 20. Magnetic Button Effect
```tsx
const x = useMotionValue(0)
const y = useMotionValue(0)
const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
  y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
}
<motion.button style={{ x, y }} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0) }} />
```

---

## Anti-Patterns to Avoid

| ❌ Don't | ✅ Do Instead |
|---------|--------------|
| `animate={{ width: '100%' }}` | `animate={{ scaleX: 1 }}` + `transformOrigin` |
| Nest `motion.div` inside `motion.div` with conflicting variants | Use `inherit: false` on inner or flatten hierarchy |
| `transition={{ duration: 2 }}` for hover | Keep hover ≤ 200ms |
| Forget `exit` prop with AnimatePresence | Always pair entrance with exit |
| `animate` without `initial` | Always set `initial` to define start state |
| Animate `border-radius` on large elements | Animating border-radius triggers layout on some browsers |

---

## Vanilla JS (CDN) Usage

For non-React projects, use Motion One:
```html
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<script>
  const { animate, scroll, inView } = Motion
  inView('.reveal', ({ target }) => {
    animate(target, { opacity: [0, 1], y: [40, 0] }, { duration: 0.5 })
  })
</script>
```
