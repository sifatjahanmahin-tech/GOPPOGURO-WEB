---
name: seo-meta
description: "SEO and meta tags skill. Actions: optimize, add, fix, improve SEO. Topics: title tag, meta description, Open Graph, Twitter Card, canonical, robots, sitemap, schema.org structured data, JSON-LD, hreflang, breadcrumbs, FAQ schema, article schema, local business, semantic HTML, heading hierarchy, internal links, URL structure, Core Web Vitals, page speed, mobile friendly, sitemap.xml, robots.txt. Works with HTML, Next.js, React."
---
# SEO & Meta – Search Intelligence

Complete guide for technical SEO, meta tags, structured data, and Open Graph. Covers everything from `<title>` to JSON-LD schema.

## Priority Rules

### 1. Title & Meta Description (CRITICAL)
```html
<!-- Title: 50–60 chars. Primary keyword first. Unique per page. -->
<title>Primary Keyword – Secondary | Brand Name</title>

<!-- Meta description: 150–160 chars. Include CTA. Unique per page. -->
<meta name="description" content="Clear description with primary keyword. Encourages click-through. Ends with action.">

<!-- Canonical: prevents duplicate content -->
<link rel="canonical" href="https://example.com/page/">

<!-- Robots: only add if you need to restrict -->
<meta name="robots" content="index, follow">
<!-- Or to block: -->
<meta name="robots" content="noindex, nofollow">
```

### 2. Open Graph (HIGH — controls social previews)
```html
<!-- Required OG tags -->
<meta property="og:title" content="Page Title – Brand">
<meta property="og:description" content="Description for social sharing (can differ from meta description)">
<meta property="og:image" content="https://example.com/og-image.jpg">
<!-- OG image: 1200×630px, < 1MB, JPG or PNG -->
<meta property="og:url" content="https://example.com/page/">
<meta property="og:type" content="website"> <!-- or article, product -->
<meta property="og:site_name" content="Brand Name">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/og-image.jpg">
<meta name="twitter:site" content="@handle">
```

### 3. Structured Data / JSON-LD (HIGH)

**Organization (homepage)**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/handle",
    "https://linkedin.com/company/name"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-000-0000",
    "contactType": "customer service"
  }
}
</script>
```

**Article / Blog Post**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2026-01-01T00:00:00Z",
  "dateModified": "2026-01-15T00:00:00Z",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": {
    "@type": "Organization",
    "name": "Brand",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  },
  "image": "https://example.com/article-image.jpg",
  "description": "Article description."
}
</script>
```

**FAQ Schema**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your question?",
      "acceptedAnswer": { "@type": "Answer", "text": "The answer text." }
    }
  ]
}
</script>
```

**Breadcrumbs**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog/" },
    { "@type": "ListItem", "position": 3, "name": "Article Title" }
  ]
}
</script>
```

**Local Business**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+1-555-000-0000",
  "openingHours": "Mo-Fr 09:00-17:00",
  "url": "https://example.com",
  "priceRange": "$$"
}
</script>
```

### 4. Semantic HTML (HIGH — foundation of SEO)
```html
<!-- Heading hierarchy: ONE h1 per page, logical h2/h3 nesting -->
<h1>Primary keyword in main headline</h1>
<h2>Section heading with secondary keyword</h2>
<h3>Subsection</h3>

<!-- Semantic landmarks -->
<header>...</header>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<article>...</article>
<aside>...</aside>
<footer>...</footer>

<!-- Images: descriptive alt text with keyword where natural -->
<img src="product.webp" alt="Blue leather wallet with card slots">

<!-- Links: descriptive anchor text -->
<!-- ❌ Click here -->
<!-- ✅ View our product catalog -->
<a href="/products">View our product catalog</a>
```

### 5. Technical SEO Files

**robots.txt**
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Sitemap: https://example.com/sitemap.xml
```

**sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about/</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Full Page `<head>` Template

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Primary SEO -->
  <title>Primary Keyword – Secondary | Brand</title>
  <meta name="description" content="150–160 char description with keyword and CTA.">
  <link rel="canonical" href="https://example.com/page/">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title – Brand">
  <meta property="og:description" content="Social sharing description.">
  <meta property="og:image" content="https://example.com/og-1200x630.jpg">
  <meta property="og:url" content="https://example.com/page/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Brand">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description.">
  <meta name="twitter:image" content="https://example.com/og-1200x630.jpg">

  <!-- Favicons -->
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#ffffff">

  <!-- Preconnect / performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
```

---

## Anti-Patterns

| ❌ Avoid | ✅ Fix |
|---------|--------|
| Duplicate `<title>` across pages | Unique title per page |
| Keyword stuffing in meta | Natural language, one primary keyword |
| Missing `width`/`height` on images | Always include dimensions |
| Generic anchor text ("click here") | Descriptive link text |
| Multiple `<h1>` tags | Exactly one `<h1>` per page |
| Non-HTTPS URLs in OG tags | Always use absolute HTTPS URLs |
| Missing `alt` on content images | All content images need descriptive alt |
| OG image smaller than 1200×630 | Use 1200×630 for best social previews |
