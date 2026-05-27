---
name: responsive-web
description: "Responsive web design skill. Actions: make responsive, fix mobile, adapt layout, test breakpoints. Topics: CSS Grid, Flexbox, clamp(), container queries, viewport units, mobile-first, fluid typography, responsive images, sticky positioning, overflow handling, safe areas (iPhone notch), touch targets, scroll snap, masonry layout, media queries, aspect-ratio. Works with HTML, CSS, Tailwind, React."
---
# Responsive Web Design – Layout Intelligence

Complete guide for building fluid, device-agnostic layouts using modern CSS.

## Breakpoint Strategy (Mobile-First)

```css
/* Base: mobile (0–639px) — write base styles here */
/* sm: 640px+ (large phones, small tablets) */
/* md: 768px+ (tablets) */
/* lg: 1024px+ (laptops) */
/* xl: 1280px+ (desktops) */
/* 2xl: 1536px+ (large screens) */

@media (min-width: 640px) { }
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
@media (min-width: 1280px) { }
```

---

## Modern CSS Layout Tools

### Fluid Typography with clamp()
```css
/* clamp(min, preferred, max) — no media queries needed */
h1 { font-size: clamp(2rem, 5vw + 1rem, 5rem); }
h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 3rem); }
p  { font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem); }

/* Fluid spacing */
section { padding: clamp(3rem, 8vw, 8rem) clamp(1rem, 5vw, 4rem); }
```

### Fluid Container
```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}
/* Or multi-step: */
.container {
  width: 100%;
  padding-inline: clamp(1rem, 5vw, 4rem);
  max-width: 1280px;
  margin-inline: auto;
}
```

### Auto-fit Grid (responsive columns without media queries)
```css
/* Columns auto-wrap at min 280px */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: 1.5rem;
}

/* Fixed number of columns that stack on mobile */
.col-3-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: 1.5rem;
}
```

### RAM Pattern (Responsive Auto Minmax)
```css
.ram {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(200px, 25%, 350px), 1fr));
}
```

### Sidebar Layout (Holy Grail)
```css
.sidebar-layout {
  display: grid;
  grid-template-columns: min(260px, 30%) 1fr;
  gap: 2rem;
}
/* Stacks on mobile */
@media (max-width: 768px) {
  .sidebar-layout { grid-template-columns: 1fr; }
}

/* Or with container queries */
.sidebar-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@container (min-width: 768px) {
  .sidebar-layout { grid-template-columns: 260px 1fr; }
}
```

---

## Flexbox Patterns

### Navigation
```css
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
```

### Card Grid with Equal Heights
```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.card-grid > * {
  flex: 1 1 280px; /* grow, shrink, basis */
  max-width: 400px;
}
```

### Sticky Footer
```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; }
footer { margin-top: auto; }
```

---

## Responsive Images

```html
<!-- Always set dimensions to prevent CLS -->
<img src="image.webp" alt="..." width="800" height="400" loading="lazy">

<!-- Art direction: different image per breakpoint -->
<picture>
  <source media="(max-width: 767px)" srcset="mobile.webp">
  <source media="(min-width: 768px)" srcset="desktop.webp">
  <img src="desktop.webp" alt="..." width="1200" height="600">
</picture>

<!-- Responsive with srcset -->
<img
  srcset="img-400.webp 400w, img-800.webp 800w, img-1200.webp 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="img-800.webp" alt="..." width="800" height="400">

/* CSS: always constrain images */
img { max-width: 100%; height: auto; display: block; }
```

---

## Mobile-Specific Patterns

### Safe Area (iPhone notch / Dynamic Island)
```css
body {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
.fixed-bottom-bar {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

### Full Viewport Height (iOS fix)
```css
/* ❌ 100vh breaks on iOS (includes browser chrome) */
/* ✅ Use dvh (dynamic viewport height) */
.full-height {
  height: 100dvh; /* dynamic viewport height */
  /* Fallback: */
  height: 100vh;
  height: 100dvh;
}
```

### Touch Targets (CRITICAL)
```css
/* Minimum 44×44px for all interactive elements */
.btn, .nav-link, .icon-btn {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* For small icons, use padding to expand hit area */
.icon-btn { padding: 0.75rem; }
```

### Prevent Horizontal Scroll
```css
html, body { overflow-x: hidden; }
* { box-sizing: border-box; }
/* Find the culprit: */
/* * { outline: 1px solid red; } */
```

---

## Scroll Snap

```css
/* Horizontal carousel */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Hide scrollbar */
}
.carousel::-webkit-scrollbar { display: none; }
.carousel-item {
  scroll-snap-align: start;
  flex: 0 0 min(280px, 80vw);
}

/* Vertical full-page scroll snap */
.fullpage {
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
.fullpage-section {
  height: 100dvh;
  scroll-snap-align: start;
}
```

---

## Container Queries (Modern)

```css
/* Define container */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Style based on container size, not viewport */
@container card (min-width: 400px) {
  .card { flex-direction: row; }
  .card-image { width: 40%; }
}
```

---

## Anti-Patterns

| ❌ Avoid | ✅ Fix |
|---------|--------|
| Fixed `width: 500px` on content | Use `max-width: 500px; width: 100%` |
| `height: 100vh` on mobile | Use `height: 100dvh` |
| `font-size: 12px` on mobile | Minimum 16px body text |
| Desktop-first media queries | Mobile-first with `min-width` |
| `position: absolute` without parent `position: relative` | Always set parent positioning |
| `overflow: hidden` on `<body>` permanently | Only apply when needed (modal open) |
| Empty `alt=""` on content images | Descriptive alt text always |
| Pixel-based spacing only | Mix `rem`/`em` with clamp for fluid spacing |
