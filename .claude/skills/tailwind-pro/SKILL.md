---
name: tailwind-pro
description: "Tailwind CSS advanced skill. Actions: style, build, design, implement, configure. Topics: responsive design, dark mode, custom config, arbitrary values, JIT, @apply, component variants, group hover, peer, container queries, grid, flexbox, typography plugin, forms plugin, aspect ratio, animation utilities, gradient, glassmorphism, shadcn/ui integration, v3 vs v4, CLI, PostCSS. Stack: HTML, React, Next.js, Vue, Svelte."
---
# Tailwind CSS Pro – Advanced Utility Intelligence

Complete guide for professional Tailwind CSS development. Covers advanced patterns, config, and production tips.

## Core Utility Patterns

### Responsive Breakpoints
```html
<!-- Mobile-first: sm(640px) md(768px) lg(1024px) xl(1280px) 2xl(1536px) -->
<div class="w-full md:w-1/2 lg:w-1/3">...</div>
<p class="text-sm md:text-base lg:text-lg">...</p>
<div class="flex-col md:flex-row flex gap-4">...</div>
```

### Dark Mode
```html
<!-- class strategy (toggle 'dark' class on <html>) -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
<button class="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400">
```

### Group Hover (parent-triggered children)
```html
<div class="group cursor-pointer">
  <img class="group-hover:scale-105 transition-transform duration-300">
  <p class="text-gray-500 group-hover:text-blue-600 transition-colors">Hover parent to affect children</p>
</div>
```

### Peer (sibling state)
```html
<input class="peer" type="checkbox">
<label class="peer-checked:text-blue-600 peer-checked:font-bold">Styled when input checked</label>

<!-- Show error message when input is invalid -->
<input class="peer border-gray-300 invalid:border-red-500" required>
<p class="hidden peer-invalid:block text-red-500 text-sm">This field is required</p>
```

---

## Layout Patterns

### Sticky Navbar
```html
<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
```

### Floating Navbar (with spacing from edges)
```html
<nav class="fixed top-4 left-4 right-4 z-50 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg px-6 py-3">
```

### Hero Section
```html
<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">...</h1>
    <p class="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">...</p>
  </div>
</section>
```

### Bento Grid
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
  <div class="col-span-2 row-span-2 bg-purple-600 rounded-3xl p-8">Featured</div>
  <div class="bg-gray-100 rounded-3xl p-6">Item</div>
  <div class="bg-blue-100 rounded-3xl p-6">Item</div>
  <div class="col-span-2 bg-green-100 rounded-3xl p-6">Wide Item</div>
</div>
```

### Sidebar Layout
```html
<div class="flex min-h-screen">
  <aside class="w-64 shrink-0 border-r border-gray-200 bg-white sticky top-0 h-screen overflow-y-auto">
    <!-- Sidebar content -->
  </aside>
  <main class="flex-1 overflow-y-auto p-6">...</main>
</div>
```

---

## Component Patterns

### Card
```html
<div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer">
```

### Glassmorphism Card
```html
<div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl">
```

### Badge / Tag
```html
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  New
</span>
```

### Button Variants
```html
<!-- Primary -->
<button class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-150 cursor-pointer">
<!-- Secondary -->
<button class="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-200 transition-colors duration-150">
<!-- Ghost -->
<button class="px-6 py-2.5 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-150">
<!-- Destructive -->
<button class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-150">
```

### Avatar
```html
<div class="relative inline-flex">
  <img class="w-10 h-10 rounded-full object-cover ring-2 ring-white" src="avatar.jpg" alt="Name">
  <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
</div>
```

### Form Input
```html
<div class="space-y-1">
  <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
  <input
    id="email" type="email"
    class="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
    placeholder="you@example.com"
  >
</div>
```

### Tooltip
```html
<div class="relative group inline-flex">
  <button>Hover me</button>
  <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
    Tooltip text
  </span>
</div>
```

---

## Typography

```html
<!-- Heading scale -->
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
<h2 class="text-2xl md:text-3xl font-semibold tracking-tight">
<h3 class="text-xl font-semibold">
<p class="text-base leading-7 text-gray-600">  <!-- body: 16px, line-height 1.75 -->
<p class="text-sm leading-6 text-gray-500">  <!-- secondary text -->

<!-- Gradient text -->
<span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
```

---

## tailwind.config.js Essentials

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Cal Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

---

## Anti-Patterns

| ❌ Avoid | ✅ Better |
|---------|----------|
| `text-[14px]` for common sizes | Use `text-sm` (14px built-in) |
| `p-[16px]` | Use `p-4` (16px = 1rem) |
| Long class strings without component extraction | Use `@apply` in CSS for repeated patterns |
| `flex flex-col items-center justify-center` on everything | Use `grid place-items-center` for centering |
| Mixing px values with rem utilities | Stick to Tailwind scale |
| `!important` overrides | Fix specificity instead |
| No dark mode classes on colored backgrounds | Always pair `bg-white dark:bg-gray-900` |
