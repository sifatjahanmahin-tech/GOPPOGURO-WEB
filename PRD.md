# PRD: Goppo Guro Site Navigation & Structure Redesign

**Version:** 1.0  
**Status:** Ready for Implementation  
**Constraint baseline:** CLAUDE.md — vanilla HTML/CSS/JS, no build tools, BEM, CSS variables, 8px grid, monochrome-luxury, semantic HTML5, `prefers-reduced-motion`.

---

## 1. Current State Audit

### 1.1 Existing Pages and Nav Slots

| File | Current Nav Label | Nav Group |
|---|---|---|
| `index.html` | Home | Main nav |
| `about.html` | About | Main nav |
| `programme.html` | Programme | Main nav |
| `projects.html` | Projects | Main nav |
| `products.html` | Products | Main nav |
| `platform.html` | Platform | Main nav |
| `blog.html` | Blog | Main nav |
| `gallery.html` | Gallery | Main nav |
| `partners.html` | Partners | Main nav |
| `get-involved.html` | Get Involved | Main nav |
| `contact.html` | Contact | Main nav |
| `team.html` | Our Team | Isolated nav (no main nav) |
| `creative-studio-network.html` | Creative Studio | Isolated nav (no main nav) |

**Critical observation:** `team.html` and `creative-studio-network.html` use a completely different, stripped-down nav (Home, Experiences, Creative Studio, Our Team, Facebook icon). They exist outside the main navigation system entirely and are orphaned from the site's primary information architecture.

### 1.2 Pages Being Renamed / Repurposed

| Current File | Fate | Reason |
|---|---|---|
| `programme.html` | **Repurposed** — becomes "Goppoguro Creative Learning Programme" | Existing content fits; just scoped down from a general "Programme" parent to a specific sub-page |
| `projects.html` | **Deprecated** — content redistributed | Generic container page; each project now gets its own page under the Project dropdown |
| `platform.html` | **Deprecated** — content merges into `creative-studio-network.html` | Platform's Studio Network, School Collaboration, and Franchise sections all belong in the Goppoguro Studio project page |
| `blog.html` | **Repurposed** — becomes `publications.html` | Blog is renamed Publications; existing cards are the seed content |
| `about.html` | **Repurposed** — absorbs `team.html` content | About Us merges Vision/Mission/Founder/Team into one page |
| `team.html` | **Deprecated** — content moves to `about.html` | Duplicate founder/team content; no reason for standalone page |
| `partners.html` | **Deprecated** — content moves to `about.html` and `contact.html` | Partners are secondary navigation content, not a top-level destination |
| `get-involved.html` | **Deprecated** — content moves to `contact.html` | Volunteer/Work With Us/Start a Studio pathways belong on the Contact page as CTA modes |
| `creative-studio-network.html` | **Repurposed** — becomes the "Goppoguro Studio" project page | Already the most complete, richest page on the site; keeps all existing content |

### 1.3 What's New (Does Not Exist Yet)

| New File | New Nav Location | Why It's New |
|---|---|---|
| `women-empowerment.html` | Programme → Women Empowerment through Little Joys | The makers/artisan content exists in `index.html` but has no dedicated page |
| `podcast.html` | Programme → Podcast | No podcast page exists anywhere in the current site |
| `golpoka-club.html` | Project → Golpoka Club | Golpoka Adventure-Activity Books are teased in `creative-studio-network.html` ("Coming Soon") but have no dedicated page |
| `little-joys.html` | Project → Little Joys | Little Joys is Goppo Guro's flagship *initiative* (not just a product); it has no dedicated project/story page |
| `publications.html` | Publications (top-level) | Renamed/expanded from `blog.html` |

### 1.4 Content That Needs to Move Between Pages

| Content Block | Current Location | Moves To |
|---|---|---|
| Women Makers section (hand-folded by artisans, flexible income, dignity) | `index.html` `.makers` section | `women-empowerment.html` (full page) and referenced from `little-joys.html` |
| Franchise Opportunities section | `platform.html` | `creative-studio-network.html` (already partially covered) |
| School Collaboration Network | `platform.html` | `creative-studio-network.html` |
| Creative Community (Parents Hub, Educators Forum, Youth Network) | `platform.html` | `about.html` or `creative-studio-network.html` |
| Volunteer / Work With Us / Start a Studio CTAs | `get-involved.html` | `contact.html` (new "How to Get Involved" section) |
| School Partner logos + Become a Partner CTA | `partners.html` | `about.html` (Partners section at page bottom) |
| Founder message (longer version) | `team.html` | `about.html` (replaces the shorter founder quote there) |
| Team description ("A Small but Loud Bunch") | `team.html` and `about.html` | `about.html` (use the richer `team.html` version) |
| Impact Calculator | `index.html` | Keep on homepage; optionally embed on `little-joys.html` |
| SDG Goals section | `index.html` | Keep on homepage; reference from `about.html` |

---

## 2. New Site Map

```
Goppo Guro
│
├── Home                                index.html
│
├── Programme  (dropdown)
│   ├── Goppoguro Creative Learning     programme.html
│   │   Programme
│   ├── Women Empowerment               women-empowerment.html  [NEW]
│   │   through Little Joys
│   └── Podcast                         podcast.html  [NEW]
│
├── Project  (dropdown)
│   ├── Goppoguro Studio                creative-studio-network.html
│   ├── Golpoka Club                    golpoka-club.html  [NEW]
│   └── Little Joys                     little-joys.html  [NEW]
│
├── Product                             products.html
│
├── Publications                        publications.html  [NEW — was blog.html]
│
├── About Us                            about.html  [REPURPOSED — absorbs team.html + partners.html]
│
├── Gallery                             gallery.html
│
└── Contact                             contact.html  [REPURPOSED — absorbs get-involved.html]
```

**Deprecated files (keep in repo but remove from nav):**
```
projects.html           → redirect to project dropdown pages
platform.html           → redirect to creative-studio-network.html
blog.html               → redirect to publications.html
team.html               → redirect to about.html
partners.html           → redirect to about.html
get-involved.html       → redirect to contact.html
```

> Redirection strategy for a static site with no server: Add a `<meta http-equiv="refresh" content="0;url=TARGET.html">` inside the deprecated file's `<head>` so existing links don't 404.

---

## 3. Page-by-Page Specifications

### 3.1 `index.html` — Home

**Purpose:** First impression; introduce Goppo Guro's brand, mission, flagship product (Little Joys), and community impact. Drive traffic to Programme, Project, Product, and Contact.

**Target audience:** First-time visitors — parents, educators, gift shoppers, and potential partners in Bangladesh.

**Hero treatment:** Existing canvas animation (74 JPEG frames, back-and-forth at ~25fps) is strong and distinctive. Keep as-is. Hero tagline: "Small Stories, Gentle Beginnings." H1: "A Space for Play, Paper, and Pause." Stats (500+ children, 10K+ joys, 50+ schools) anchor below.

**Key sections (existing — keep with nav/footer update only):**
1. Hero (canvas animation, stats, dual CTA)
2. What is Goppoguro (2-col text + image)
3. Creative Learning Cycle (4 steps: Spark → Explore → Create → Connect)
4. 4P Framework (grid-2, methodology)
5. Features / Design for Pause (4 feature cards + showcase images)
6. Our Story (2-col, founder quote)
7. Women Makers section
8. Featured Products preview (3 product cards)
9. Impact Calculator (interactive slider)
10. SDG Alignment (4 goals)
11. Testimonials (3 cards)
12. CTA section
13. Sparks section

**CTAs:** "Explore Products" → `products.html`, "Our Story" → `about.html`, "Partner With Us" → `contact.html`.

**JS behavior:** All existing `init*()` functions apply. No new JS needed.

**Nav/footer change:** Replace entire nav `<ul>` with new dropdown nav structure (see Section 4).

---

### 3.2 `programme.html` — Goppoguro Creative Learning Programme

**Purpose:** Explain the 4P methodology, research foundation, and pilot programmes in depth. Establish Goppo Guro as a credible learning framework, not just a product company.

**Target audience:** Educators, school administrators, NGOs evaluating the programme for adoption. Secondary: parents curious about the methodology.

**Hero treatment:** Page header style (no canvas). `padding-top: var(--space-16)`. H1: "Creative Learning Programme." Tagline: "How We Learn." Intro: existing description.

**Key sections (repurposed from current content):**
1. The Goppoguro Approach (2-col: text + image)
2. The 4P Framework (4-card grid: Projects, Passion, Peers, Play)
3. Driven by Research (2-col: image + text, with link to Publications)
4. Pilot Programmes (2-col, CTA to `contact.html` for partnership inquiry)

**Remove from this page:** Any reference to `partners.html` — redirect that CTA to `contact.html`.

**CTAs:** "Read Our Insights" → `publications.html`, "Partner with a School" → `contact.html`.

**JS behavior:** `initScrollAnimations()` applies. No new JS needed.

**SDG connection:** SDG 4 (Quality Education). Add an SDG badge row at the bottom.

---

### 3.3 `women-empowerment.html` — Women Empowerment through Little Joys *(NEW)*

**Purpose:** Tell the full story of the women artisans behind Little Joys — their work, how the programme operates, the social impact, and how to get involved as a buyer or supporter. Supports SDGs 1, 5, and 8.

**Target audience:** Socially conscious gift buyers, CSR-focused organizations, women's rights advocates, journalists.

**Hero treatment:** Full-width hero with a strong artisan photograph. H1: "Made by Hands, Shared by Hearts." Tagline: "Women Empowerment." Description: "Every Little Joy is hand-folded by women who turn simple paper into moments of care."

**Key sections:**
1. **Hero** — full-bleed hero image (use `goppoguro images/WhatsApp Image 2026-02-09 at 1.12.12 AM.jpeg`), "100% Handmade" badge, H1, description, dual CTA.
2. **The Story** (2-col) — How the programme started, what it offers (flexible income, creative focus, dignity). Source text from `index.html` makers section.
3. **How It Works** — 3-step process card grid: "Paper & Training → Hand-Folding → Jars Delivered." Use `.csn-journey__step` pattern from `creative-studio-network.html`.
4. **Impact Numbers** — 4 stat cards: artisans employed, jars folded, income generated (placeholder), communities reached.
5. **SDG Alignment** — SDG 1 (No Poverty), SDG 5 (Gender Equality), SDG 8 (Decent Work).
6. **CTA** — "Support the Makers" → `products.html`; "Partner with Us" → `contact.html`.

**CTAs:** "Buy a Little Joy" → `products.html`, "Become a Corporate Partner" → `contact.html`.

**JS behavior:** `initScrollAnimations()`. No new JS needed.

---

### 3.4 `podcast.html` — Podcast *(NEW)*

**Purpose:** Host or index Goppo Guro's podcast. Even if no episodes exist yet, this page establishes the podcast as a channel and invites subscriptions. The podcast presumably covers stories, creativity, parenting, education, and play.

**Target audience:** Educators, parents, and creative practitioners interested in long-form audio content on creativity and learning.

**Hero treatment:** Minimal hero. H1: "The Goppo Guro Podcast." Tagline: "Conversations on Play, Paper, and Pause." Description: "A slow conversation about creativity, learning, and what it means to make space for the things that matter."

**Key sections:**
1. **Page hero** — centered, minimal, with a placeholder podcast artwork image.
2. **"Coming Soon" / Episode Grid** — If no episodes, use a `.feature-card`-based "coming soon" layout with teaser topics. If episodes exist, use the `product-card-preview` card structure: episode thumbnail, episode number, title, description, duration badge, "Listen" CTA.
3. **Subscribe Row** — Podcast platform links (Spotify, Apple Podcasts, Google Podcasts) as `.btn--outline` buttons in a flex row.
4. **Newsletter signup** — Re-use the footer `#newsletter-form` pattern to collect email subscribers.

**CTAs:** Platform subscribe buttons, newsletter subscribe.

**JS behavior:** `initNewsletterForm()` if a second form is added (use a different `id`, e.g., `id="podcast-subscribe-form"`, and update `initNewsletterForm()` to accept a form ID parameter — see Section 8).

---

### 3.5 `creative-studio-network.html` — Goppoguro Studio *(REPURPOSED)*

**Purpose:** The flagship project page. Describe the Creative Studio Network as a physical chain of children's creative hubs — what happens inside, what makes them different, the schedule, monthly themes, and franchise/partner opportunities. This is the most complete page on the site.

**Target audience:** Parents considering enrolling children, entrepreneurs interested in franchising, community organizations seeking to open a studio.

**Hero treatment:** Existing `.csn-hero` with "Where Imagination Becomes Action" headline, ✕/✓ distinctions, dual CTA. Keep entirely as-is.

**Key sections (existing — keep all, add platform.html content):**
1. Hero (keep)
2. The Creative Journey (5 steps: Storytelling → Expression → Reflection → Workshop → Exhibition)
3. We Build Creators (4 feature cards)
4. Beyond Academics (Imagination, Confidence, Problem-Solving)
5. A National Culture of Creativity (image stack + 4 standards)
6. Monthly Themes (12-month grid)
7. Session Schedule (7-day grid + poster)
8. Golpoka Adventure-Activity Books (Coming Soon, 6 books)
9. **ADD: School Collaboration Network** — migrated from `platform.html` `#schools` section
10. **ADD: Franchise Opportunities** — migrated from `platform.html` `#franchise` section
11. Belief / CTA

**CTAs:** "Learn More" → `contact.html` (replace current Facebook link), "Golpoka Club" → `golpoka-club.html`, "Franchise inquiry" → `contact.html`.

**Nav change:** Replace the existing isolated nav with the full dropdown nav structure.

**JS behavior:** All existing CSN-specific animation classes in `initScrollAnimations()` already included.

---

### 3.6 `golpoka-club.html` — Golpoka Club *(NEW)*

**Purpose:** Introduce the Golpoka character and the associated Adventure-Activity Book series. This page is the storytelling/IP wing of Goppo Guro — books, the character, and the community of readers.

**Target audience:** Children (5–12), parents buying books, educators looking for supplementary reading, book retailers.

**Hero treatment:** Playful, story-like hero. H1: "Golpoka Club." Tagline: "Adventure, Activity, and Imagination." Description: "Follow Golpoka on 6 extraordinary adventures — each a world to explore, a puzzle to solve, and a story to finish your own way."

**Key sections:**
1. **Hero** — H1, description, "Coming Soon" badge, "Get Notified" CTA (opens to newsletter sign-up form).
2. **Meet Golpoka** — 2-col: character description (left), character artwork image (right). Use the poster at `goppoguro images/other images/WhatsApp Image 2026-03-05 at 3.11.26 AM.jpeg` as the visual.
3. **The 6 Books** — Cards for each book (reuse `.csn-books__book` styles from `creative-studio-network.html`): Toy Town Adventure, The Magic City Quest, Haunted Playhouse, Color Treasure Mine, Mystery Forest Mission, Toy Town Adventure II. Each card shows: book number, title, a one-line teaser description.
4. **How the Club Works** — 3 feature cards: Get the Book, Follow Golpoka, Share Your Adventure.
5. **CTA** — "Notify Me When Available" (newsletter form), "Explore the Studio" → `creative-studio-network.html`.

**CTAs:** Newsletter sign-up, "Explore Creative Studio" → `creative-studio-network.html`, "Buy Products" → `products.html`.

**JS behavior:** `initNewsletterForm()` (with unique form ID `id="golpoka-notify-form"`).

---

### 3.7 `little-joys.html` — Little Joys *(NEW)*

**Purpose:** Tell the full story of the Little Joys initiative — what they are, the philosophy behind them, how they're made, and their social impact. This is distinct from `products.html` (which is transactional/shop). This page is narrative and mission-driven.

**Target audience:** Gift shoppers who want context before buying, journalists and grant writers, corporate CSR teams evaluating cause-marketing partnerships.

**Hero treatment:** Warm, human hero. H1: "Little Joys." Tagline: "The Collection." Description: "A hand-folded origami jar containing messages of kindness — designed to be kept or passed on. Made by women artisans. Funding children's education."

**Key sections:**
1. **Hero** — product photography (`goppoguro images/WhatsApp Image 2026-02-07 at 12.49.09 AM.jpeg`), H1, description, dual CTA.
2. **What is a Little Joy?** — 2-col: explanation of the concept ("Keep it or pass it on"), image. Source from `index.html` features section.
3. **The Making** — 2-col: sourced from `index.html` makers section. Reference to `women-empowerment.html`.
4. **The Message** — Full-width pull quote block: *"There are no right answers here, no timers, no expectations — only moments of presence, imagination, and shared discovery."*
5. **Impact at a Glance** — Embed/clone the Impact Calculator from `index.html` (reuse `initImpactCalculator()` — the function already guards with `if (!jarSlider) return;`).
6. **The Collection** — 3 product preview cards (reuse `.product-card-preview` pattern): Classic Joy Jar, Signature Crane Set, Sustainable Gift Box. Each links to `products.html`.
7. **SDG Alignment** — SDG 1, 4, 8, 12 badges (reuse `.sdg__goal` pattern).
8. **CTA** — "Shop Little Joys" → `products.html`, "Meet the Makers" → `women-empowerment.html`.

**CTAs:** "Shop Now" → `products.html`, "Meet the Makers" → `women-empowerment.html`.

**JS behavior:** `initImpactCalculator()` applies since it guards via `if (!jarSlider) return;` — the DOM IDs `jar-count`, `jar-display`, `education-days`, `meals-provided`, `smiles-spread`, `trees-helped` must be present on this page. If the calculator is embedded, use the same IDs as `index.html` — the function will work.

---

### 3.8 `products.html` — Product

**Purpose:** Transactional product catalog. Browse and learn about the Goppo Guro product range with pricing. Primary conversion page.

**Target audience:** Buyers — individuals, corporate gift buyers, schools.

**Hero treatment:** Minimal page header. H1: "The Collection." Tagline: "Simple Paper Experiences."

**Key sections (existing — nav/footer update only):**
1. Page header
2. Product grid (`.product-card-preview` cards)
3. Pricing in BDT (৳)
4. Product detail modal or in-page sections (if developed)

**CTAs:** "View Details" on each card (currently links to `products.html` — add anchors for individual products), "Order via Facebook" as primary CTA (links to `https://www.facebook.com/goppoguro`).

**JS behavior:** Existing scroll animations apply.

---

### 3.9 `publications.html` — Publications *(NEW — was `blog.html`)*

**Purpose:** A curated library of written content produced by Goppo Guro — thought leadership essays, field notes from workshops, research observations, press coverage, and zines. Distinct from a blog: content is intentionally slow, curated, and publication-quality, consistent with the "Pause" brand.

**Target audience:** Educators, journalists, researchers, parents, and arts/culture audiences. Secondary: grant committees and institutional partners evaluating Goppo Guro's thought leadership.

**Hero treatment:** Page header style. H1: "Publications." Tagline: "Thought Leadership & Field Notes." Description: "Slow writing on creativity, learning, and the human need for play."

**Key sections:**
1. **Page hero** — H1, tagline, description, optional category filter bar.
2. **Featured Publication** — One prominent card (`.story__grid` pattern): large image, title, category tag, full description, "Read" CTA. This is the hero piece that changes.
3. **Publications Grid** — `.grid-3` using the existing `product-card-preview` card structure from `blog.html` with category tags. Seed content: Education, Learning, Observations, Parenting, Updates (5 existing articles).
4. **Category Filter** (optional, Phase 3) — Static HTML `<nav>` with filter buttons (no JS in Phase 1–2): Education, Field Notes, Research, Press, Updates. See Section 8 for JS implementation.
5. **Newsletter CTA** — "Never miss a new piece" with the newsletter form.

**Content types for Publications:**
- **Essay:** Long-form reflection (e.g., "Creativity in Childhood Education")
- **Field Notes:** Short observations from workshops (e.g., "Observations from Workshops")
- **Research Brief:** Summary of methodology findings
- **Press:** Media coverage and interviews
- **Zine:** Digital version of a physical Goppo Guro zine (PDF embed or image gallery)
- **Update:** Organisational news ("Goppoguro Journey")

**CTAs:** "Read" on each card, Newsletter sign-up.

**JS behavior:** Existing `initScrollAnimations()` applies. Category filtering in Phase 3 using `initPublicationsFilter()` (see Section 8).

---

### 3.10 `about.html` — About Us *(REPURPOSED)*

**Purpose:** The single authoritative page about who Goppo Guro is — vision, mission, founder story, team, partners/advisors. Replaces both `about.html` and `team.html`.

**Target audience:** Press, grant committees, prospective hires, partners, and anyone trying to understand the people behind the work.

**Hero treatment:** Existing page header kept. H1: "About Goppo Guro." Tagline: "Why We Exist."

**Key sections (repurposed — merge in `team.html` content):**
1. **Vision & Mission** (existing 2-col cards — keep)
2. **Founder's Story** — Replace the current shorter version with the richer version from `team.html` (full "quiet concern" narrative, "small stories, sparks of stories" paragraph, "not just for children" paragraph). Use the `.story__grid` layout with founder photo (`goppoguro images/other images/kochi oshan bhai.jpeg`).
3. **The Team** — Migrate the full team section from `team.html`: "A Small but Loud Bunch" with the team photo (`goppoguro images/other images/our team.jpeg`). Use `.makers__grid` layout.
4. **Advisory & Mentors** (existing placeholder section — keep, fill in when names are available)
5. **ADD: School & Partner Network** — 4-logo grid from `partners.html` (placeholder logos until real logos added), "Become a Partner" CTA → `contact.html`.

**Remove from this page:** The isolated `team.html`-style nav (Home, Experiences, Creative Studio, Our Team, Facebook).

**CTAs:** "Partner With Us" → `contact.html`, "Get Involved" → `contact.html`.

**JS behavior:** Existing `initScrollAnimations()` applies.

---

### 3.11 `gallery.html` — Gallery

**Purpose:** Visual archive of workshops, exhibitions, artisan work, and events. Social proof through imagery.

**Target audience:** Prospective participants, press, and social media referrals.

**Hero treatment:** Existing page header — keep.

**Key sections (existing — nav/footer update only):**
1. Page header
2. 6-image grid (`.grid-3`, `.product-card-preview` card style)

**CTAs:** "Join Our Next Workshop" → `contact.html`.

**JS behavior:** Existing `initScrollAnimations()`. Consider adding `initLightbox()` in Phase 3 (see Section 8).

---

### 3.12 `contact.html` — Contact *(REPURPOSED)*

**Purpose:** Single contact hub. Combines the existing contact form with the "Get Involved" pathways (Volunteer, Work With Us, Start a Studio) from `get-involved.html`. All inbound communication flows here.

**Target audience:** Everyone — parents, school partners, media, potential staff, franchise inquirers, donors.

**Hero treatment:** Existing page header — keep.

**Key sections (expanded):**
1. **Page hero** (existing — keep)
2. **"How Can We Help?" — Involvement Tabs/Cards** — ADD 3 cards from `get-involved.html`: Volunteer, Work With Us, Start a Studio. Each card has a tagline, title, 1-sentence description, and "Register Interest" CTA button (`.btn--outline`, scrolls to form or opens form with subject pre-filled via `?subject=volunteer` query param).
3. **Contact Info + Form** (existing 2-col — keep)

**CTAs:** Each involvement card CTA scrolls to the contact form and pre-fills the Subject field. The form's current `id="contact-form"` stays; `initContactForm()` (new) handles subject pre-fill from URL query parameter.

**JS behavior:** Add `initContactForm()` to `script.js` (see Section 8). Keep existing form validation pattern.

---

## 4. Dropdown Navigation Design

### 4.1 HTML Structure

Replace every page's `<ul class="nav__menu" id="nav-menu">` with the following. Copy-paste this exact block to all 13 files (new and existing).

```html
<ul class="nav__menu" id="nav-menu">

  <!-- 1. Home -->
  <li class="nav__item">
    <a href="index.html" class="nav__link">Home</a>
  </li>

  <!-- 2. Programme (dropdown) -->
  <li class="nav__item nav__item--dropdown" id="nav-dropdown-programme">
    <button class="nav__link nav__dropdown-trigger"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="dropdown-programme">
      Programme
      <svg class="nav__dropdown-arrow" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <ul class="nav__dropdown" id="dropdown-programme" role="list">
      <li class="nav__dropdown-item">
        <a href="programme.html" class="nav__dropdown-link">
          Goppoguro Creative Learning Programme
        </a>
      </li>
      <li class="nav__dropdown-item">
        <a href="women-empowerment.html" class="nav__dropdown-link">
          Women Empowerment through Little Joys
        </a>
      </li>
      <li class="nav__dropdown-item">
        <a href="podcast.html" class="nav__dropdown-link">
          Podcast
        </a>
      </li>
    </ul>
  </li>

  <!-- 3. Project (dropdown) -->
  <li class="nav__item nav__item--dropdown" id="nav-dropdown-project">
    <button class="nav__link nav__dropdown-trigger"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="dropdown-project">
      Project
      <svg class="nav__dropdown-arrow" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <ul class="nav__dropdown" id="dropdown-project" role="list">
      <li class="nav__dropdown-item">
        <a href="creative-studio-network.html" class="nav__dropdown-link">
          Goppoguro Studio
        </a>
      </li>
      <li class="nav__dropdown-item">
        <a href="golpoka-club.html" class="nav__dropdown-link">
          Golpoka Club
        </a>
      </li>
      <li class="nav__dropdown-item">
        <a href="little-joys.html" class="nav__dropdown-link">
          Little Joys
        </a>
      </li>
    </ul>
  </li>

  <!-- 4. Product -->
  <li class="nav__item">
    <a href="products.html" class="nav__link">Product</a>
  </li>

  <!-- 5. Publications -->
  <li class="nav__item">
    <a href="publications.html" class="nav__link">Publications</a>
  </li>

  <!-- 6. About Us -->
  <li class="nav__item">
    <a href="about.html" class="nav__link">About Us</a>
  </li>

  <!-- 7. Gallery -->
  <li class="nav__item">
    <a href="gallery.html" class="nav__link">Gallery</a>
  </li>

  <!-- 8. Contact -->
  <li class="nav__item">
    <a href="contact.html" class="nav__link">Contact</a>
  </li>

</ul>
```

**Dropdown trigger is a `<button>`, not an `<a>`.** Reason: the Programme and Project top-level items have no page of their own — they are purely navigation containers. Using a `<button>` prevents "clicking a link that goes nowhere" and is semantically correct (`aria-haspopup`, `aria-expanded`).

### 4.2 Integration with `initMobileNav()`

The existing `initMobileNav()` handles `.nav__toggle` ↔ `.nav__menu` open/close only. It does not conflict with dropdown logic. The new `initDropdownNav()` function handles dropdowns separately (see Section 8). No changes needed to `initMobileNav()` itself.

### 4.3 Mobile Behavior — Accordion

On mobile (`max-width: 768px`), dropdowns expand/collapse in-place (accordion), pushing other nav items down. This is consistent with the slow, deliberate "Pause" brand feel and avoids a layered overlay which would feel rushed.

- Tap the trigger button → dropdown expands (`max-height` transition from `0` to `auto` using `max-height: 500px`)
- Tap again → collapses
- Only one dropdown can be open at a time (opening a second closes the first)

On desktop (`min-width: 769px`), dropdowns appear as an absolutely-positioned panel below the trigger on hover **or** focus, with a `var(--transition-fast)` fade + `translateY(-4px → 0)` entrance.

### 4.4 Accessibility Requirements

| Requirement | Implementation |
|---|---|
| Keyboard: Enter/Space on trigger | Opens dropdown |
| Keyboard: Escape | Closes dropdown, returns focus to trigger |
| Keyboard: Arrow Down from trigger | Moves focus to first dropdown item |
| Keyboard: Arrow Up/Down within dropdown | Navigates between items |
| Keyboard: Arrow Up from first item | Returns focus to trigger |
| Screen reader: trigger state | `aria-expanded="false"/"true"` toggled in JS |
| Screen reader: dropdown relationship | `aria-controls="dropdown-id"` on trigger, `id="dropdown-id"` on list |
| Screen reader: dropdown role | `role="list"` on `<ul>`, implicit `role="listitem"` on `<li>` |
| Focus trap | On mobile, Escape closes the whole mobile menu |

### 4.5 CSS Variables and BEM Classes

New classes needed (all follow existing BEM naming):

```
.nav__item--dropdown          Modifier on <li> — marks parent as dropdown container
.nav__dropdown-trigger        Block element — the <button> that toggles the dropdown
.nav__dropdown-arrow          Block element — the chevron SVG inside trigger
.nav__dropdown-arrow--open    Modifier — rotates arrow 180° when open
.nav__dropdown                Block — the <ul> panel that shows/hides
.nav__dropdown-item           Block element — each <li> in the dropdown
.nav__dropdown-link           Block element — the <a> inside each dropdown item
.nav__dropdown-link--active   Modifier — highlights current sub-page
```

CSS values (all use existing variables):

```css
/* Dropdown panel */
.nav__dropdown {
  background: var(--color-bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}

/* Desktop: absolutely positioned */
@media (min-width: 769px) {
  .nav__item--dropdown { position: relative; }
  .nav__dropdown {
    position: absolute;
    top: calc(100% + var(--space-2));
    left: 0;
    min-width: 260px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-4px);
    transition: opacity var(--transition-fast), transform var(--transition-fast);
  }
  .nav__item--dropdown.is-open .nav__dropdown {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

/* Mobile: accordion */
@media (max-width: 768px) {
  .nav__dropdown {
    max-height: 0;
    transition: max-height var(--transition-base);
  }
  .nav__item--dropdown.is-open .nav__dropdown {
    max-height: 400px;
  }
}

/* Arrow rotation */
.nav__dropdown-arrow {
  width: 16px; height: 16px;
  transition: transform var(--transition-fast);
}
.nav__item--dropdown.is-open .nav__dropdown-arrow {
  transform: rotate(180deg);
}

/* Dropdown links */
.nav__dropdown-link {
  display: block;
  padding: var(--space-2) var(--space-4);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}
.nav__dropdown-link:hover,
.nav__dropdown-link:focus {
  color: var(--color-text-primary);
  background-color: var(--color-bg-card);
  outline: none;
}
.nav__dropdown-link--active {
  color: var(--color-text-primary);
  font-weight: 500;
}
```

**`prefers-reduced-motion` override:** The global `@media (prefers-reduced-motion: reduce)` block in `styles.css` (line 115) already sets `transition-duration: 0.01ms !important` for all elements, which covers dropdown transitions automatically. No additional handling needed.

### 4.6 `highlightActiveNavLink()` Update

The current function matches `link.getAttribute('href')` against the current page filename. It must be extended to also mark the parent dropdown's trigger as active when a child page is the current page.

Logic addition (describe for the implementor):

```
After existing per-link active logic runs:
  For each .nav__item--dropdown:
    Get all .nav__dropdown-link elements inside it
    If any of them has class nav__dropdown-link--active (set by the filename-match logic):
      Add class nav__dropdown-trigger--active to the trigger <button>
      (This visually signals "you are inside this section")
```

The `nav__dropdown-trigger--active` CSS:

```css
.nav__dropdown-trigger--active {
  color: var(--color-text-primary);
  font-weight: 500;
}
```

---

## 5. Publications Page Specification

### 5.1 What "Publications" Means for Goppo Guro

"Publications" positions Goppo Guro as a thought-leadership organisation, not just a product company. The word "blog" implies frequent, informal posts. "Publications" implies intentionality, curation, and depth — consistent with the slow, deliberate brand.

Content scope:
- **Essays** — reflective writing on creativity, education, childhood, play
- **Field Notes** — short observations from real workshops and classroom sessions
- **Research Briefs** — summaries of methodological insights from the 4P framework in practice
- **Zines** — digital editions of physical Goppo Guro zines (image galleries or PDF embeds)
- **Press** — media coverage, interviews, external features
- **Updates** — significant organisational milestones (not news, not marketing)

### 5.2 Card Component

Reuse `.product-card-preview` from `blog.html` with one addition: a category tag. The existing markup pattern in `blog.html` already has the category `<span class="section-tagline">` — no new component needed.

Card structure:
```html
<article class="pub-card product-card-preview">
  <div class="product-card-preview__image">
    <img src="..." alt="...">
  </div>
  <div class="product-card-preview__content">
    <span class="pub-card__category section-tagline">Field Notes</span>
    <h3 class="product-card-preview__title">Article Title</h3>
    <p class="pub-card__excerpt">One or two sentence summary.</p>
    <div class="pub-card__meta">
      <time class="pub-card__date">March 2026</time>
    </div>
    <a href="#" class="btn btn--text">Read</a>
  </div>
</article>
```

New CSS needed: `.pub-card__category`, `.pub-card__excerpt`, `.pub-card__meta`, `.pub-card__date` — all use existing variables, no new values.

### 5.3 Category Filter (Phase 3)

Static HTML tabs using `<button>` elements. In Phase 1–2, all publications show at once. In Phase 3, `initPublicationsFilter()` uses `data-category` attributes to show/hide cards.

```html
<nav class="pub-filter" aria-label="Filter publications">
  <button class="pub-filter__btn pub-filter__btn--active" data-filter="all">All</button>
  <button class="pub-filter__btn" data-filter="essay">Essays</button>
  <button class="pub-filter__btn" data-filter="field-notes">Field Notes</button>
  <button class="pub-filter__btn" data-filter="research">Research</button>
  <button class="pub-filter__btn" data-filter="press">Press</button>
  <button class="pub-filter__btn" data-filter="updates">Updates</button>
</nav>
```

---

## 6. Content Migration Plan

### 6.1 `programme.html` → Goppoguro Creative Learning Programme

- **Keep:** All existing sections (approach, 4P framework, research, pilot programmes)
- **Update:** Replace `href="partners.html"` CTA with `href="contact.html"`
- **Update:** Replace `href="blog.html"` CTA with `href="publications.html"`
- **Result:** No net content loss. Scope narrows from "Programme" (parent) to "Creative Learning Programme" (specific sub-page).

### 6.2 `projects.html` → Distributed to Project sub-pages

| `projects.html` content | Moves to |
|---|---|
| Overview: "Impact Through Implementation" | Introductory copy only; not migrated |
| School Pilot Projects section | `programme.html` Pilot Programmes section (already there) |
| Community Workshops section | `creative-studio-network.html` (workshops are the studio's activity) |
| Creative Exhibitions & Festivals section | `creative-studio-network.html` and `gallery.html` |

`projects.html` is deprecated after this migration. Add meta-refresh redirect to `creative-studio-network.html`.

### 6.3 `blog.html` → `publications.html`

- **Copy all 5 existing cards** from `blog.html` to `publications.html`
- **Add category tags** to each card (Education, Learning, Observations, Parenting, Updates)
- **Rename** the page title from "Blog / Insights" to "Publications"
- `blog.html` is deprecated after migration. Add meta-refresh redirect to `publications.html`.

### 6.4 `about.html` + `team.html` → `about.html` (merged)

- **Keep from `about.html`:** Vision & Mission cards, Advisory & Mentors section.
- **Replace in `about.html`:** The shorter founder quote block with the full "quiet concern" narrative from `team.html` — use `.story__grid` layout with `kochi oshan bhai.jpeg`.
- **Replace in `about.html`:** The 2-sentence team section with the full "A Small but Loud Bunch" text from `team.html` — use `.makers__grid` layout with `our team.jpeg`.
- **Add to `about.html`:** Partners section (logo grid from `partners.html`), "Become a Partner" CTA.
- `team.html` is deprecated. Add meta-refresh redirect to `about.html`.

### 6.5 `platform.html` → Distributed

| `platform.html` content | Moves to |
|---|---|
| Platform Overview / "Interconnected Network" | Not migrated (intro framing only) |
| Creative Studio Network (studios section) | Already fully covered in `creative-studio-network.html` |
| School Collaboration Network | `creative-studio-network.html` (new section added) |
| Creative Community (Parents Hub, Educators Forum, Youth Network) | `about.html` or `creative-studio-network.html` — add to `creative-studio-network.html` as "Growing Our Community" section |
| Franchise Opportunities | `creative-studio-network.html` (new section added) |

`platform.html` deprecated. Meta-refresh redirect to `creative-studio-network.html`.

### 6.6 `partners.html` → `about.html`

- Logo grid (4 placeholder cards) → `about.html` Partners section
- "Become a Partner" CTA → `contact.html`

`partners.html` deprecated. Meta-refresh redirect to `about.html`.

### 6.7 `get-involved.html` → `contact.html`

- 3 involvement cards (Volunteer, Work With Us, Start a Studio) → `contact.html` new top section
- Donor Support + Sponsorships feature cards → `contact.html` "Other Ways to Support" section

`get-involved.html` deprecated. Meta-refresh redirect to `contact.html`.

---

## 7. File Change Manifest

### FILES TO CREATE (new from scratch)

| Filename | Purpose | Template base |
|---|---|---|
| `women-empowerment.html` | Women Empowerment through Little Joys | Copy `about.html` shell, new content |
| `podcast.html` | Podcast page | Copy `blog.html` shell, new content |
| `golpoka-club.html` | Golpoka Club & Books | Copy `products.html` shell, new content |
| `little-joys.html` | Little Joys initiative story page | Copy `index.html` shell (for impact calculator), new content |
| `publications.html` | Publications (renamed from blog) | Copy `blog.html` entire file, then update |

### FILES TO RENAME

None. Keeping all existing filenames avoids breaking any existing external links or bookmarks. New pages use new names.

### FILES TO REPURPOSE (filename stays, content changes significantly)

| File | What Changes |
|---|---|
| `programme.html` | Nav updated, CTAs updated (partners.html → contact.html, blog.html → publications.html) |
| `creative-studio-network.html` | Nav replaced with full dropdown nav; add School Collaboration + Franchise sections from `platform.html`; update CTAs |
| `about.html` | Nav updated; replace founder section with richer version; replace team section with richer version; add Partners section |
| `contact.html` | Nav updated; add "Get Involved" section (3 involvement cards + 2 support cards from `get-involved.html`) |

### FILES TO DEPRECATE (add meta-refresh, remove from nav)

| File | Redirect Target | Meta-refresh to add |
|---|---|---|
| `projects.html` | `creative-studio-network.html` | `<meta http-equiv="refresh" content="0;url=creative-studio-network.html">` |
| `platform.html` | `creative-studio-network.html` | same pattern |
| `blog.html` | `publications.html` | `<meta http-equiv="refresh" content="0;url=publications.html">` |
| `team.html` | `about.html` | `<meta http-equiv="refresh" content="0;url=about.html">` |
| `partners.html` | `about.html` | same pattern |
| `get-involved.html` | `contact.html` | `<meta http-equiv="refresh" content="0;url=contact.html">` |

### FILES NEEDING NAV/FOOTER UPDATE ONLY

| File | Changes |
|---|---|
| `index.html` | Replace nav `<ul>`, update footer quick links |
| `products.html` | Replace nav `<ul>`, update footer quick links |
| `gallery.html` | Replace nav `<ul>`, update footer quick links |

### FOOTER QUICK LINKS UPDATE

The footer's two `<nav class="footer__nav">` columns must be updated on every page to reflect the new structure:

**Column 1 — "Discover":**
- Home → `index.html`
- Programme → `programme.html`
- Project → `creative-studio-network.html`
- Product → `products.html`
- Publications → `publications.html`

**Column 2 — "Connect":**
- About Us → `about.html`
- Gallery → `gallery.html`
- Contact → `contact.html`
- Facebook → `https://www.facebook.com/goppoguro`

---

## 8. CSS & JS Impact

### 8.1 New CSS in `styles.css`

All new rules should be added in a new section at the end of `styles.css` before the final closing comment:

```css
/* ========================================
   DROPDOWN NAVIGATION
   ======================================== */
```

New rules needed (see Section 4.5 for full spec):
- `.nav__item--dropdown` + `.nav__item--dropdown.is-open`
- `.nav__dropdown-trigger` + `.nav__dropdown-trigger--active`
- `.nav__dropdown-arrow` + `.nav__dropdown-arrow--open` (handled by parent `.is-open`)
- `.nav__dropdown` (desktop + mobile variants)
- `.nav__dropdown-item`
- `.nav__dropdown-link` + `.nav__dropdown-link--active`

New rules for Publications:
- `.pub-card__category`
- `.pub-card__excerpt`
- `.pub-card__meta`
- `.pub-card__date`

New rules for Contact involvement cards:
- `.involvement-card` (can reuse existing `.card` with `p-5` and `border-radius: var(--radius-lg)`)

**No new CSS variables needed.** All new components use existing tokens.

### 8.2 Changes to `script.js`

#### Add: `initDropdownNav()`

Called from `DOMContentLoaded` alongside existing `init*()` calls. Handles:
- Click on `.nav__dropdown-trigger` → toggle `.is-open` on parent `.nav__item--dropdown`, toggle `aria-expanded`
- Click outside any dropdown → close all dropdowns
- Escape key → close all dropdowns, return focus to trigger
- Keyboard: `ArrowDown` on trigger → focus first `.nav__dropdown-link`
- Keyboard: `ArrowUp`/`ArrowDown` within dropdown → navigate items
- Keyboard: `ArrowUp` on first item → return focus to trigger
- Only one dropdown open at a time (closing others when opening one)
- On mobile: no hover behavior, only click/tap

```javascript
function initDropdownNav() {
  const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
  if (!dropdownItems.length) return;

  // ... implementation per above spec
}
```

#### Modify: `highlightActiveNavLink()`

After the existing link-matching loop, add a second pass that checks whether any `.nav__dropdown-link` inside a dropdown was matched (has `nav__dropdown-link--active`). If yes, add `.nav__dropdown-trigger--active` to the trigger button in that group.

#### Modify: `initMobileNav()`

Add logic: when the mobile menu is closed (`.nav__menu` loses `.active`), also close all open dropdowns by removing `.is-open` from all `.nav__item--dropdown` and resetting their `aria-expanded` to `"false"`.

#### Add: `initContactForm()`

Called from `DOMContentLoaded`. Guards with `if (!document.getElementById('contact-form')) return;`.

Reads URL query string for a `subject` parameter and pre-fills the contact form's subject field:

```javascript
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  if (subject) {
    const subjectField = form.querySelector('#subject');
    if (subjectField) subjectField.value = subject;
  }

  // Existing form submit / validation logic can be added here
}
```

Involvement card CTAs on `contact.html` should use:
- Volunteer → `<a href="contact.html?subject=Volunteer Inquiry">`
- Work With Us → `<a href="contact.html?subject=Work With Us">`
- Start a Studio → `<a href="contact.html?subject=Start a Studio">`

These links, when on `contact.html` itself, will be same-page with a query string. `initContactForm()` reads the param on load.

#### Add (Phase 3): `initPublicationsFilter()`

Filters `.pub-card` elements by `data-category` attribute. Toggles `display: none` / `display: block` (or `opacity: 0 → 1` with a short transition). Updates the `pub-filter__btn--active` class on the active filter button.

```javascript
function initPublicationsFilter() {
  const filterBar = document.querySelector('.pub-filter');
  if (!filterBar) return;
  // ... implementation
}
```

#### Add (Phase 3): `initLightbox()`

For `gallery.html`. On click of a gallery image, display a full-screen overlay with the image. Close on Escape or overlay click. Guards with `if (!document.querySelector('.gallery-grid')) return;`.

---

## 9. Implementation Order

### Phase 1 — Safe Structural Changes (No content loss, live site remains valid)

**Goal:** Update all nav and footer across all existing pages. Deprecate pages with redirects. No page is removed, broken links are eliminated.

1. **Add new CSS** for dropdown nav to `styles.css` (Section 4.5 full block).
2. **Add `initDropdownNav()`** to `script.js`, modify `initMobileNav()` to close dropdowns on menu close, modify `highlightActiveNavLink()` per Section 8.2. Add `initDropdownNav()` call in `DOMContentLoaded`. Add `initContactForm()`.
3. **Create `publications.html`** — copy `blog.html`, rename title, update nav, update footer.
4. **Update nav + footer** on all 8 existing non-deprecated pages: `index.html`, `programme.html`, `about.html`, `products.html`, `gallery.html`, `contact.html`, `creative-studio-network.html`, `publications.html`. Each gets the full dropdown nav HTML from Section 4.1 with its own `active` class on the correct link.
5. **Add meta-refresh redirects** to all 6 deprecated files (`projects.html`, `platform.html`, `blog.html`, `team.html`, `partners.html`, `get-involved.html`). This ensures zero 404s.
6. **Smoke test:** Open every page in a browser. Verify dropdown opens/closes, active state is correct, mobile menu still works, redirects fire correctly.

### Phase 2 — Content Migration (Existing pages enriched, no new pages yet)

**Goal:** Repurpose existing pages with migrated content. All content currently on the site stays accessible, just reorganized.

7. **Repurpose `contact.html`** — add the 3 involvement cards + 2 support cards above the existing contact form section. Add CSS for involvement cards if any new rules needed.
8. **Repurpose `about.html`** — replace founder section with richer version from `team.html`, replace team section with richer version from `team.html`, add Partners section from `partners.html`.
9. **Repurpose `creative-studio-network.html`** — add School Collaboration section (from `platform.html`), add Franchise Opportunities section (from `platform.html`).
10. **Repurpose `programme.html`** — update CTAs (partners.html → contact.html, blog.html → publications.html).
11. **Smoke test:** Click every CTA on every page. Confirm no links point to deprecated pages. Confirm `about.html` has all team and partner content.

### Phase 3 — New Pages (Net-new HTML files)

**Goal:** Build the 5 new pages. Each is a standalone HTML file with the full dropdown nav.

12. **Build `women-empowerment.html`** — hero, artisan story, how-it-works steps, impact stats, SDG section, CTAs.
13. **Build `little-joys.html`** — hero, what-is-a-little-joy, making section, quote block, impact calculator, products preview, SDG section, CTAs.
14. **Build `golpoka-club.html`** — hero, meet Golpoka, 6 books grid, how-the-club-works, notify-me form.
15. **Build `podcast.html`** — hero, episode grid (or coming-soon layout), platform subscribe buttons, newsletter.
16. **Add `pub-card` CSS** and update `publications.html` — add category tags to existing 5 cards, add featured publication slot at top, add `pub-filter` nav (static, no JS yet).
17. **Add `initPublicationsFilter()`** to `script.js`, wire to the filter bar on `publications.html`.
18. **Add `initLightbox()`** to `script.js`, wire to `gallery.html`.
19. **Full regression test** — open every page on mobile and desktop, verify all dropdown states, verify all CTAs, verify all forms, verify `prefers-reduced-motion` media query, verify accessibility with keyboard navigation through all dropdown items.
