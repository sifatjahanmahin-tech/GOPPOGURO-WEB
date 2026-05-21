# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Goppo Guro** (গপ্পো গুঁড়ো) is a Bangladeshi creative learning initiative centered on origami, storytelling, and handcrafted paper experiences. The tagline is "Play, Paper, and Pause." The site promotes the "Little Joys" product line (handmade origami jars), empowers women artisans, and funds children's education. It aligns with UN SDGs 1, 4, 8, and 12.

Deployed on GitHub Pages: `https://sifatjahanmahin-tech.github.io/GOPPOGURO-WEB/`

## Tech Stack

- **Pure vanilla HTML/CSS/JavaScript** — no framework, no build tool, no npm
- **No compilation step** — open any `.html` file directly in a browser, or use any static file server
- **Google Fonts** (loaded via CDN): Cormorant Garamond (display/headings), Inter (body), Outfit (numbers/stats)
- All pages share a single `styles.css` and `script.js`

To run locally:
```powershell
# Any of these work:
npx serve .
python -m http.server 8080
# Or just open index.html directly in a browser
```

## Architecture

### Page Structure
All pages are standalone `.html` files. Each one copy-pastes the same `<header>` navigation and `<footer>` blocks — there is no templating system. When updating nav or footer, **every HTML file must be edited individually**.

Current pages: `index.html`, `about.html`, `programme.html`, `projects.html`, `products.html`, `platform.html`, `blog.html`, `gallery.html`, `partners.html`, `get-involved.html`, `contact.html`, `team.html`, `creative-studio-network.html`

### CSS Design System (`styles.css`)
All values come from CSS custom properties defined in `:root`. **Never hardcode colors, spacing, or shadows** — use variables.

| Variable group | Pattern | Example |
|---|---|---|
| Colors | `--color-*` | `--color-text-primary`, `--color-bg-card` |
| Spacing | `--space-{n}` (8px grid) | `--space-4` = 32px, `--space-8` = 64px |
| Typography | `--font-display`, `--font-body`, `--font-numbers` | |
| Shadows | `--shadow-*` | `--shadow-soft` |
| Transitions | `--transition-fast/base/slow` | 0.3s / 0.5s / 0.8s — intentionally slow for the "Pause" brand feel |
| Radius | `--radius-sm/md/lg/xl/full` | |

**Color note:** Legacy color variables (`--color-pink`, `--color-blue`, `--color-green`, `--color-gold`) are all mapped to monochrome blacks/grays. The design is intentionally monochrome-luxury. Do not reintroduce bright colors.

**CSS class naming:** BEM convention — `.block__element` and `.block--modifier` (e.g. `.feature-card__title`, `.testimonial-card--featured`, `.btn--primary`).

### JavaScript (`script.js`)
Single file. All logic runs on `DOMContentLoaded` via `init*()` functions:

| Function | What it does |
|---|---|
| `initMobileNav()` | Hamburger toggle, close-on-link-click, close-on-outside-click |
| `highlightActiveNavLink()` | Matches current filename to nav `href`; on homepage, also tracks scroll position |
| `initSmoothScroll()` | Handles both `#hash` and `page.html#hash` anchors; offsets 80px for fixed header |
| `initHeaderScroll()` | Adds `.scrolled` class to `#header` after 50px scroll |
| `initImpactCalculator()` | Drives the jar-count range slider → animated impact numbers (3 edu days / 2 meals / 5 smiles / 10 jars per tree) |
| `initNewsletterForm()` | Client-side validation + simulated submission (no backend) |
| `initScrollAnimations()` | Intersection Observer fade-in for cards and sections; respects `prefers-reduced-motion` |
| `initHeroAnimation()` | Canvas animation: preloads 74 JPEG frames from `hero animation/`, plays back-and-forth at ~25fps |

All `init*()` functions guard with early returns if their DOM elements don't exist — safe to include `script.js` on every page.

### Assets
- `goppoguro images/` — product and lifestyle photography (WhatsApp-sourced JPEGs)
- `hero animation/` — 74 JPEG frames (`Video Project_000.jpg` → `Video Project_073.jpg`) for the homepage canvas animation

## Coding Conventions

From `.agent/rules/guide.md` (always-on rules):
1. Use semantic HTML5 elements (`<article>`, `<section>`, `<figure>`, `<header>`, `<nav>`, etc.)
2. Spacing must follow the **8px grid** — use `--space-*` variables, not arbitrary pixel values
3. All animations must include a `prefers-reduced-motion` media query or the JS `matchMedia` check already in `initScrollAnimations()`
4. Use CSS variables for **all** colors — never raw hex or rgb values in component styles

### Active nav link
Each page sets `class="nav__link active"` on its own link in the static HTML. The JS `highlightActiveNavLink()` re-applies this dynamically based on filename, so the static `active` class is a fallback/initial state.

### Adding a new page
1. Copy an existing page's HTML skeleton
2. Update `<title>`, `<meta name="description">`, and `<meta property="og:*">` tags
3. Set the correct nav link to `class="nav__link active"`
4. Add the page to the nav list in **every other HTML file** and in the footer Quick Links / Ecosystem nav
