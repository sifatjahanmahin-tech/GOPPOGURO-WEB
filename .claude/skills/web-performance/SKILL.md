---
name: web-performance
description: "Core Web Vitals and web performance skill. Actions: optimize, audit, improve, fix, measure LCP, FID, CLS, INP, TTFB. Topics: lazy loading, image optimization, code splitting, caching, critical CSS, font loading, preload, prefetch, defer, async, minification, compression, CDN, service worker, bundle size, waterfall, render blocking, layout shift. Tools: Lighthouse, WebPageTest, Chrome DevTools. Works with: HTML, CSS, JS, React, Next.js, Vue."
---
# Web Performance – Core Web Vitals Intelligence

Complete guide for building fast websites that pass Core Web Vitals. Targets LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

## Core Web Vitals Targets

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5–4s | > 4s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| TTFB (Time to First Byte) | ≤ 800ms | 800ms–1.8s | > 1.8s |
| FCP (First Contentful Paint) | ≤ 1.8s | 1.8–3s | > 3s |

---

## Priority Rules

### 1. Images (CRITICAL — biggest LCP killer)
```html
<!-- Hero/above-fold images: preload + eager -->
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">
<img src="hero.webp" loading="eager" fetchpriority="high" alt="..." width="1200" height="600">

<!-- Below-fold images: lazy load -->
<img src="card.webp" loading="lazy" decoding="async" alt="..." width="400" height="300">

<!-- Always specify width/height to prevent CLS -->
<!-- Always use WebP with JPEG fallback -->
<picture>
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="..." width="800" height="400">
</picture>

<!-- Responsive images with srcset -->
<img srcset="img-400.webp 400w, img-800.webp 800w, img-1200.webp 1200w"
     sizes="(max-width: 768px) 100vw, 800px"
     src="img-800.webp" alt="...">
```

### 2. Fonts (HIGH — blocks rendering)
```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- font-display: swap prevents invisible text -->
<style>
  @font-face {
    font-family: 'MyFont';
    src: url('font.woff2') format('woff2');
    font-display: swap;
    font-weight: 400 700; /* variable font range */
  }
</style>

<!-- Preload critical font files -->
<link rel="preload" as="font" href="font.woff2" type="font/woff2" crossorigin>
```

### 3. JavaScript Loading (HIGH)
```html
<!-- defer: runs after HTML parsed, maintains order -->
<script src="app.js" defer></script>

<!-- async: runs as soon as downloaded (no order guarantee) -->
<script src="analytics.js" async></script>

<!-- module scripts are deferred by default -->
<script type="module" src="app.js"></script>

<!-- Inline critical JS only (< 1KB) -->
<!-- Never inline large libraries -->
```

### 4. CSS (HIGH — render blocking)
```html
<!-- Critical CSS inlined in <head> -->
<style>/* above-fold styles only */</style>

<!-- Non-critical CSS loaded async -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- Preload critical CSS -->
<link rel="preload" as="style" href="critical.css" onload="this.rel='stylesheet'">
```

### 5. Resource Hints
```html
<!-- Preconnect: establish connection early (use for critical origins) -->
<link rel="preconnect" href="https://api.example.com">

<!-- DNS-prefetch: resolve DNS (use for non-critical third parties) -->
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- Prefetch: download for next page (low priority) -->
<link rel="prefetch" href="/next-page.js">

<!-- Preload: download for current page (high priority) -->
<link rel="preload" as="script" href="critical.js">
```

### 6. CLS Prevention (CRITICAL)
```css
/* Always reserve space for images */
img { width: 100%; height: auto; aspect-ratio: 16/9; }

/* Reserve space for ads/embeds */
.ad-slot { min-height: 250px; }

/* Avoid inserting content above existing content */
/* Use transform animations, not top/margin changes */

/* Avoid font-display: block (causes FOIT — invisible text) */
/* Use font-display: swap or optional */
```

### 7. Caching Headers
```
# Static assets (images, fonts, JS, CSS with hash in filename)
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: no-cache

# API responses
Cache-Control: private, max-age=300
```

---

## HTML Performance Checklist

### `<head>` Order (Critical)
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 1. Critical CSS inline -->
  <style>/* above-fold only */</style>
  <!-- 2. Preconnect to critical origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- 3. Preload critical resources -->
  <link rel="preload" as="image" href="hero.webp" fetchpriority="high">
  <!-- 4. Title and meta -->
  <title>Page Title</title>
  <!-- 5. Non-critical stylesheets -->
  <link rel="stylesheet" href="styles.css">
</head>
```

---

## JavaScript Performance Patterns

### Debounce Scroll/Resize Events
```js
let timer
window.addEventListener('scroll', () => {
  clearTimeout(timer)
  timer = setTimeout(() => { /* handler */ }, 100)
})
```

### Intersection Observer (lazy load / reveal)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target) // stop observing after trigger
    }
  })
}, { rootMargin: '0px 0px -100px 0px' })

document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
```

### requestAnimationFrame for Animations
```js
// ❌ Don't use setInterval for animations
// ✅ Use rAF
function animate() {
  element.style.transform = `translateX(${x}px)`
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
```

### Avoid Layout Thrashing
```js
// ❌ Thrashing: read, write, read, write
el.style.width = el.offsetWidth + 10 + 'px'

// ✅ Batch reads then writes
const width = el.offsetWidth
requestAnimationFrame(() => {
  el.style.width = width + 10 + 'px'
})
```

---

## Anti-Patterns

| ❌ Avoid | ✅ Use Instead |
|---------|--------------|
| `<img src="img.jpg">` no dimensions | Always add `width` + `height` |
| Loading Google Fonts without preconnect | `<link rel="preconnect">` first |
| Render-blocking `<script>` in `<head>` | `defer` or move to end of `<body>` |
| Animating `margin`, `padding`, `width` | Animate `transform` + `opacity` only |
| Unoptimized PNG for photos | WebP with quality 75–85 |
| Loading all JS on page load | Code split + dynamic import |
| No `loading="lazy"` on below-fold images | Always add lazy loading |
| Inline base64 large images in CSS | External file + HTTP cache |
