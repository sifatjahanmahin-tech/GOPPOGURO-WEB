/* ========================================
   GOPPO GURO - JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    initMobileNav();

    // Dropdown Navigation
    initDropdownNav();

    // Active Navigation Highlight
    highlightActiveNavLink();

    // Smooth scroll for navigation links
    initSmoothScroll();

    // Header scroll effect
    initHeaderScroll();

    // Impact Calculator (Only if exists)
    initImpactCalculator();

    // Newsletter form
    initNewsletterForm();

    // Contact form subject pre-fill
    initContactForm();

    // Intersection Observer for animations
    initScrollAnimations();

    // Hero Canvas Animation (Only if exists)
    initHeroAnimation();

    // Count-up stat numbers
    initCountUp();

    // Gallery lightbox
    initLightbox();

    // Stagger reveal containers
    initStaggerObserver();

    // Women Makers canvas animation
    initWomenMakersAnimation();

    // Project accordion
    initProjectAccordion();

    // Project filter bar
    initProjectFilter();

    // Story scroll entry animations
    initStoryScroll();

    // Scroll-to-top button
    initScrollTop();

    // 3D hover tilt on cards
    initCardTilt();

    // JSON-driven sections
    initStatsFromData();
    initPublicationsFromData();
    initTeamFromData();
    initProductsFromData();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Toggle aria-expanded
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);

        // Close all dropdowns when mobile menu closes
        if (!isExpanded) {
            closeAllDropdowns();
        }
    });

    // Close menu when clicking on a non-dropdown nav link
    const navLinks = navMenu.querySelectorAll('.nav__link:not(.nav__dropdown-trigger)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            closeAllDropdowns();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            closeAllDropdowns();
        }
    });
}

function closeAllDropdowns() {
    document.querySelectorAll('.nav__item--dropdown.is-open').forEach(item => {
        item.classList.remove('is-open');
        const toggle = item.querySelector('.nav__dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Dropdown Navigation
 */
function initDropdownNav() {
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    if (!dropdownItems.length) return;

    dropdownItems.forEach(item => {
        const toggle = item.querySelector('.nav__dropdown-toggle');
        const dropdown = item.querySelector('.nav__dropdown');
        if (!toggle || !dropdown) return;

        const dropdownLinks = dropdown.querySelectorAll('.nav__dropdown-link');

        // Chevron-only toggle — the label <a> navigates normally
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = item.classList.contains('is-open');
            closeAllDropdowns();
            if (!isOpen) {
                item.classList.add('is-open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard: ArrowDown from toggle → open and focus first link
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!item.classList.contains('is-open')) {
                    closeAllDropdowns();
                    item.classList.add('is-open');
                    toggle.setAttribute('aria-expanded', 'true');
                }
                if (dropdownLinks.length) dropdownLinks[0].focus();
            }
            if (e.key === 'Escape') {
                closeAllDropdowns();
                toggle.focus();
            }
        });

        // Keyboard navigation within dropdown
        dropdownLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = dropdownLinks[index + 1];
                    if (next) next.focus();
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index === 0) {
                        toggle.focus();
                    } else {
                        dropdownLinks[index - 1].focus();
                    }
                }
                if (e.key === 'Escape') {
                    closeAllDropdowns();
                    toggle.focus();
                }
            });
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // Desktop hover behavior with hover-intent delay
    const mq = window.matchMedia('(min-width: 769px)');
    const applyHoverBehavior = () => {
        if (!mq.matches) return;
        dropdownItems.forEach(item => {
            let closeTimer;
            item.addEventListener('mouseenter', () => {
                clearTimeout(closeTimer);
                closeAllDropdowns();
                item.classList.add('is-open');
                const toggle = item.querySelector('.nav__dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'true');
            });
            item.addEventListener('mouseleave', () => {
                closeTimer = setTimeout(() => {
                    item.classList.remove('is-open');
                    const toggle = item.querySelector('.nav__dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                }, 120);
            });
        });
    };
    applyHoverBehavior();
    mq.addEventListener('change', applyHoverBehavior);
}

/**
 * Highlight Active Navigation Link based on current URL
 */
function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Match regular nav links (including dropdown parent <a> links)
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentFile) {
            link.classList.add('active');
        }
        if ((currentFile === '' || currentFile === 'index.html') && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    // Match dropdown sub-page links
    document.querySelectorAll('.nav__dropdown-link').forEach(link => {
        link.classList.remove('nav__dropdown-link--active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentFile) {
            link.classList.add('nav__dropdown-link--active');
        }
    });

    // Mark parent dropdown <a> link active if a child page is current.
    // Only the first matching dropdown parent is activated — prevents dual
    // active state on pages (e.g. golpoka-club.html) that appear in multiple dropdowns.
    let parentActivated = false;
    document.querySelectorAll('.nav__item--dropdown').forEach(item => {
        const activeChild = item.querySelector('.nav__dropdown-link--active');
        if (activeChild && !parentActivated) {
            const parentLink = item.querySelector('.nav__link');
            if (parentLink) {
                parentLink.classList.add('active');
                parentActivated = true;
            }
        }
    });

    // Special case for internal section links on home page
    if (currentFile === 'index.html' || currentFile === '') {
        window.addEventListener('scroll', updateActiveNavOnScroll);
    }
}

/**
 * Smooth Scroll for Navigation
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"], a[href*="#"]');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal link on the current page
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    smoothScrollTo(target);
                }
            } else if (href.includes('#')) {
                // Link to another page with hash
                const [targetPage, targetHash] = href.split('#');
                const currentPath = window.location.pathname;
                const currentFile = currentPath.split('/').pop() || 'index.html';
                
                if (targetPage === currentFile || (targetPage === 'index.html' && currentFile === '')) {
                    const target = document.querySelector('#' + targetHash);
                    if (target) {
                        event.preventDefault();
                        smoothScrollTo(target);
                    }
                }
            }
        });
    });
}

function smoothScrollTo(target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Update Active Nav Link on Scroll
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink) {
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

/**
 * Impact Calculator
 */
function initImpactCalculator() {
    const jarSlider = document.getElementById('jar-count');
    const jarDisplay = document.getElementById('jar-display');
    const educationDays = document.getElementById('education-days');
    const mealsProvided = document.getElementById('meals-provided');
    const smilesSpread = document.getElementById('smiles-spread');
    const treesHelped = document.getElementById('trees-helped');

    if (!jarSlider) return;

    // Impact multipliers
    const EDUCATION_DAYS_PER_JAR = 3;
    const MEALS_PER_JAR = 2;
    const SMILES_PER_JAR = 5;
    const JARS_PER_TREE = 10;

    function updateImpact(jarCount) {
        // Update display with animation
        animateNumber(jarDisplay, jarCount);
        animateNumber(educationDays, jarCount * EDUCATION_DAYS_PER_JAR);
        animateNumber(mealsProvided, jarCount * MEALS_PER_JAR);
        animateNumber(smilesSpread, jarCount * SMILES_PER_JAR);
        animateNumber(treesHelped, Math.ceil(jarCount / JARS_PER_TREE));
    }

    function animateNumber(element, targetValue) {
        if (!element) return;

        const currentValue = parseInt(element.textContent) || 0;
        const duration = 300;
        const steps = 20;
        const stepDuration = duration / steps;
        const increment = (targetValue - currentValue) / steps;

        let step = 0;

        const animation = setInterval(() => {
            step++;
            const newValue = Math.round(currentValue + (increment * step));
            element.textContent = newValue;

            if (step >= steps) {
                clearInterval(animation);
                element.textContent = targetValue;
            }
        }, stepDuration);
    }

    jarSlider.addEventListener('input', (event) => {
        updateImpact(parseInt(event.target.value));
    });

    // Initialize
    updateImpact(parseInt(jarSlider.value));
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!emailInput || !submitBtn) return;

        const email = emailInput.value;

        // Simple validation
        if (!isValidEmail(email)) {
            showMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

        setTimeout(() => {
            emailInput.value = '';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
            showMessage(form, 'Thank you for subscribing! 🎉', 'success');
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(form, message, type) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('p');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: ${type === 'error' ? '#ef4444' : '#22c55e'};
    `;

    form.appendChild(messageEl);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

/**
 * Creative scroll animations — each element type gets its own motion treatment.
 * Elements inside .stagger-children are excluded (handled by initStaggerObserver).
 */
function initScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // [selector, animClass, staggerPerElement]
    // stagger=0 means no inline delay; CSS handles fixed delays for header cascade.
    const ANIM_GROUPS = [
        ['.section-tagline',         'anim-ink-reveal',    0    ],
        ['.section-title',           'anim-title-rise',    0    ],
        ['.section-description',     'anim-blur-fade',     0    ],
        ['.story__text',             'anim-blur-fade',     0.1  ],
        ['.story__quote',            'anim-title-rise',    0    ],
        ['.fourp__pillar',            'anim-stamp',         0.1  ],
        ['.feature-card',            'anim-paper-fold',    0.07 ],
        ['.involvement-card',        'anim-paper-fold',    0.07 ],
        ['.testimonial-card',        'anim-paper-fold',    0.08 ],
        ['.pub-card',                'anim-paper-fold',    0.07 ],
        ['.pub-featured',            'anim-paper-fold',    0    ],
        ['.gallery-item',            'anim-paper-fold',    0.04 ],
        ['.product-card-preview',    'anim-scale-reveal',  0.08 ],
        ['.product-card',            'anim-scale-reveal',  0.08 ],
        ['.product-card--cinematic', 'anim-scale-reveal',  0.1  ],
        ['.bento__cell',             'anim-stamp',         0.08 ],
        ['.sdg__goal',               'anim-stamp',         0.1  ],
        ['.makers__stat',            'anim-stamp',         0.15 ],
        ['.story__visual',           'anim-slide-left',    0    ],
        ['.sdg__image',              'anim-scale-reveal',  0.12 ],
        ['.section__visual img',     'anim-scale-reveal',  0    ],
        ['.makers__image',           'anim-scale-reveal',  0    ],
        ['.sdg-badge',               'anim-stamp',         0.07 ],
        ['.stat-highlight',          'anim-stamp',         0.07 ],
        ['.journey-step',            'anim-paper-fold',    0.08 ],
        ['.csn-journey__step',       'anim-paper-fold',    0.06 ],
        ['.csn-difference__feature', 'anim-paper-fold',    0.06 ],
        ['.csn-matters__card',       'anim-paper-fold',    0.06 ],
        ['.csn-growth__standard',    'anim-paper-fold',    0.06 ],
        ['.cta__title',              'anim-title-rise',    0    ],
        ['.cta__description',        'anim-blur-fade',     0    ],
    ];

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-enter');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    ANIM_GROUPS.forEach(([selector, animClass, stagger]) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            if (el.closest('.stagger-children')) return;
            el.classList.add(animClass);
            if (stagger > 0) {
                el.style.animationDelay = `${Math.min(i * stagger, 0.5)}s`;
            }
            obs.observe(el);
        });
    });

    // Section dividers — line-draw reveal
    const dividerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                dividerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.section-divider').forEach(el => dividerObs.observe(el));
}

/**
 * 3D magnetic tilt on hover for feature cards and testimonials.
 * Follows the cursor position to create a tactile paper-like effect.
 */
function initCardTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
            const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
            card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`;
            card.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
            card.style.boxShadow  = '0 16px 48px rgba(0,0,0,0.14)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform   = '';
            card.style.transition  = 'transform 0.4s ease, box-shadow 0.4s ease';
            card.style.boxShadow   = '';
        });
    });
}

/**
 * Hero Section Canvas Animation
 */
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const frameCount = 74;
    const currentFrame = index => (
        `hero%20animation/Video%20Project_${index.toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    let imagesLoaded = 0;

    // Preload images
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frameCount) {
                startAnimation();
            }
        };
        images.push(img);
    }

    let frameIndex = 0;
    let direction = 1;
    let rafId = null;
    let lastTime = 0;

    function startAnimation() {
        if (!rafId) rafId = requestAnimationFrame(updateFrame);
    }

    function stopAnimation() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    function updateFrame(ts) {
        if (ts - lastTime >= 40) { // ~25 FPS
            lastTime = ts;
            render();
            frameIndex += direction;
            if (frameIndex >= frameCount - 1) direction = -1;
            else if (frameIndex <= 0) direction = 1;
        }
        rafId = requestAnimationFrame(updateFrame);
    }

    const visibilityObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) startAnimation();
            else stopAnimation();
        });
    }, { threshold: 0 });
    visibilityObserver.observe(canvas);

    function render() {
        const img = images[frameIndex];
        if (!img) return;

        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        }

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Handle Resize
    window.addEventListener('resize', render);
}


/**
 * Count-up animation for [data-countup] stat numbers
 */
function initCountUp() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            const el = entry.target;
            const target = parseInt(el.getAttribute('data-countup'), 10);
            const duration = 1800;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    }, { threshold: 0.4 });

    els.forEach(el => observer.observe(el));
}

/**
 * Publications category filter
 */
function initPublicationsFilter() {
    const filterBar = document.querySelector('.pub-filter');
    if (!filterBar) return;

    const btns = filterBar.querySelectorAll('.pub-filter__btn');
    const cards = document.querySelectorAll('.pub-card[data-category]');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('pub-filter__btn--active'));
            btn.classList.add('pub-filter__btn--active');

            const cat = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const match = cat === 'all' || card.getAttribute('data-category') === cat;
                card.classList.toggle('pub-card--hidden', !match);
            });
        });
    });
}

/**
 * Stagger reveal for .stagger-children containers
 */
function initStaggerObserver() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.stagger-children').forEach(el => {
            el.querySelectorAll(':scope > *').forEach(c => c.style.opacity = '1');
        });
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.stagger-children').forEach(el => obs.observe(el));
}

/**
 * Women Makers page — Little Joys canvas animation
 */
function initWomenMakersAnimation() {
    const canvas = document.getElementById('makers-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const frameCount = 74;
    const framePath = i =>
        `Women%20Makers%20Empowerment/Little%20Joys%20animation/Video%20Project_${i.toString().padStart(3, '0')}.jpg`;

    const images = [];
    let loaded = 0;
    let frameIndex = 0;
    let direction = 1;

    function resize() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        render(frameIndex);
    }

    function render(idx) {
        const img = images[idx];
        if (!img || !img.complete) return;
        const cw = canvas.width, ch = canvas.height;
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = cw / ch;
        let dw, dh, dx, dy;
        if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
        else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    let makersRafId = null;
    let makersLastTime = 0;

    function tick(ts) {
        if (ts - makersLastTime > 40) {
            makersLastTime = ts;
            render(frameIndex);
            frameIndex += direction;
            if (frameIndex >= frameCount - 1) direction = -1;
            if (frameIndex <= 0) direction = 1;
        }
        makersRafId = requestAnimationFrame(tick);
    }

    function startMakers() { if (!makersRafId) makersRafId = requestAnimationFrame(tick); }
    function stopMakers() { if (makersRafId) { cancelAnimationFrame(makersRafId); makersRafId = null; } }

    const makersObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) startMakers(); else stopMakers(); });
    }, { threshold: 0 });
    makersObserver.observe(canvas);

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = () => {
            loaded++;
            if (loaded === frameCount) resize();
        };
        images.push(img);
    }

    window.addEventListener('resize', resize);
}

/**
 * Gallery lightbox
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const img = lightbox.querySelector('.lightbox__img');
    const close = lightbox.querySelector('.lightbox__close');

    function openLightboxFrom(item) {
        img.src = item.getAttribute('data-src');
        img.alt = item.getAttribute('data-alt') || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        close.focus();
    }

    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
        item.addEventListener('click', () => openLightboxFrom(item));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightboxFrom(item);
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
        img.src = '';
    }

    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/**
 * Contact Form — pre-fill subject from URL query param
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    if (subject) {
        const subjectField = form.querySelector('#subject');
        if (subjectField) subjectField.value = subject;
    }
}

/**
 * Project accordion — one-at-a-time, aria-expanded, max-height, keyboard accessible
 */
function initProjectAccordion() {
    const triggers = document.querySelectorAll('.project-card__accordion-trigger');
    if (!triggers.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function openPanel(trigger, panel) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('aria-hidden', 'false');
        if (prefersReduced) {
            panel.style.maxHeight = 'none';
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    function closePanel(trigger, panel) {
        trigger.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        panel.style.maxHeight = '0';
    }

    function closeAll() {
        triggers.forEach(t => {
            const p = t.closest('.project-card').querySelector('.project-card__panel');
            if (p) closePanel(t, p);
        });
    }

    triggers.forEach(trigger => {
        const card = trigger.closest('.project-card');
        const panel = card && card.querySelector('.project-card__panel');
        if (!panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            closeAll();
            if (!isOpen) openPanel(trigger, panel);
        });

        trigger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger.click();
            }
        });
    });
}

/**
 * Project filter bar — data-category matching, hides unmatched cards
 */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.proj-filter__btn');
    if (!filterBtns.length) return;

    const cards = document.querySelectorAll('.project-card[data-category]');
    const threads = document.querySelectorAll('.project-thread');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.removeAttribute('hidden');
                    card.style.display = '';
                } else {
                    card.setAttribute('hidden', '');
                    card.style.display = 'none';
                }
            });

            threads.forEach(t => {
                t.style.display = filter === 'all' ? '' : 'none';
            });
        });
    });
}

/**
 * Product Detail Gallery — built from LITTLE_JOYS_GALLERY data, with dots + arrows
 */
function initProductGallery() {
    const main = document.getElementById('pd-gallery-main');
    const dotsContainer = document.getElementById('pd-gallery-dots');
    const counter = document.getElementById('pd-gallery-counter');
    if (!main || !dotsContainer) return;

    const galleryData = window.LITTLE_JOYS_GALLERY || [];
    if (!galleryData.length) return;

    // Inject images into the main container (before the nav buttons)
    const prevBtn = document.getElementById('pd-prev');
    const nextBtn = document.getElementById('pd-next');

    galleryData.forEach((item, i) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt;
        if (i === 0) img.classList.add('is-active');
        main.insertBefore(img, prevBtn);
    });

    // Build dots
    galleryData.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'pd__gallery-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Image ${i + 1}`);
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });

    const images = Array.from(main.querySelectorAll('img'));
    const dots = Array.from(dotsContainer.querySelectorAll('.pd__gallery-dot'));
    let current = 0;

    if (counter) counter.textContent = `1 / ${images.length}`;

    function goTo(index) {
        images[current].classList.remove('is-active');
        dots[current].classList.remove('is-active');
        dots[current].setAttribute('aria-selected', 'false');
        current = (index + images.length) % images.length;
        images[current].classList.add('is-active');
        dots[current].classList.add('is-active');
        dots[current].setAttribute('aria-selected', 'true');
        if (counter) counter.textContent = `${current + 1} / ${images.length}`;
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-advance, pause on hover
    let autoTimer = setInterval(() => goTo(current + 1), 4000);
    main.addEventListener('pointerenter', () => clearInterval(autoTimer));
    main.addEventListener('pointerleave', () => {
        autoTimer = setInterval(() => goTo(current + 1), 4000);
    });

    // Swipe support on touch
    let touchStartX = 0;
    main.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });
}

/**
 * Product Catalogue — renders grid from window.PRODUCTS
 */
function initProductCatalogue() {
    const grid = document.getElementById('catalogue-grid');
    if (!grid || !window.PRODUCTS) return;

    const arrowSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

    grid.innerHTML = window.PRODUCTS.map(p => {
        const wideClass = p.wide ? ' catalogue__card-wide' : '';
        const badgeText = p.badge ? `${p.badge} · ${p.type}` : p.type;
        const isExternal = p.cardLink.startsWith('http');
        const externalAttr = isExternal ? ' target="_blank" rel="noopener"' : '';
        const orderMeta = p.wide
            ? `<a href="${p.orderLink}" target="_blank" rel="noopener" class="catalogue-card__link">Order on Facebook ${arrowSvg}</a>`
            : '';

        return `
        <div class="${wideClass.trim()}">
            <a href="${p.cardLink}" class="product-card--cinematic" aria-label="${p.name}"${externalAttr}>
                <img src="${p.image}" alt="${p.name} — ${p.type}" class="product-card__img" loading="lazy">
                <div class="product-card__overlay">
                    <div class="product-card__tag">${badgeText}</div>
                    <h3 class="product-card__name">${p.name}</h3>
                    <span class="product-card__cta">${p.orderLabel} ${arrowSvg}</span>
                </div>
            </a>
            <div class="catalogue-card__meta">
                <div>
                    <div class="catalogue-card__name">${p.name}</div>
                    <div class="catalogue-card__sub">${p.tagline}</div>
                </div>
                ${orderMeta}
            </div>
        </div>`;
    }).join('');
}

/**
 * Scroll-to-top button — appears after 400px scroll
 */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('scroll-top--visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Story scroll — entry animation for sticky beat sections
 */
function initStoryScroll() {
    const beats = document.querySelectorAll('.story-beat:not(:first-child)');
    if (!beats.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-entering');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    beats.forEach(beat => observer.observe(beat));
}

/* ========================================
   JSON-DRIVEN CONTENT
   NOTE: fetch() requires a web server.
   Local dev: run  npx serve .  or  python -m http.server 8080
   Opening index.html directly as file:// will NOT load JSON data.
   ======================================== */

/**
 * Shared fetch helper — returns parsed JSON or null on failure.
 */
function loadData(url) {
    return fetch(url)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .catch(err => {
            console.warn(
                `[Goppo Guro] Could not load ${url}: ${err.message}\n` +
                'Run the site through a server (npx serve .) — file:// does not support fetch.'
            );
            return null;
        });
}

/**
 * Hero stats — index.html
 * Renders <div class="hero__stat"> elements into #hero-stats from data/stats.json
 */
function initStatsFromData() {
    const container = document.getElementById('hero-stats');
    if (!container) return;

    loadData('data/stats.json').then(data => {
        if (!data) return;
        container.innerHTML = data.hero.map(s => `
            <div class="hero__stat">
                <span class="hero__stat-number">${s.number}</span>
                <span class="hero__stat-label">${s.label}</span>
            </div>`).join('');
    });
}

/**
 * Publications page — publications.html
 * Renders featured article into #pub-featured-container and
 * grid cards into #pub-grid from data/publications.json.
 * Re-wires the filter buttons after render.
 */
function initPublicationsFromData() {
    const featuredWrap = document.getElementById('pub-featured-container');
    const grid = document.getElementById('pub-grid');
    if (!featuredWrap && !grid) return;

    loadData('data/publications.json').then(data => {
        if (!data) return;

        // Featured article
        if (featuredWrap && data.featured) {
            const f = data.featured;
            featuredWrap.innerHTML = `
                <article class="pub-featured">
                    <div class="pub-featured__image">
                        <img src="${f.image}" alt="${f.imageAlt}" loading="lazy">
                    </div>
                    <div class="pub-featured__content">
                        <span class="pub-card__category">${f.category}</span>
                        <h2 class="pub-featured__title">${f.title}</h2>
                        <p class="pub-featured__excerpt">${f.excerpt}</p>
                        <div class="pub-card__meta">
                            <time class="pub-card__date">${f.date}</time>
                        </div>
                        <a href="${f.url}" class="btn btn--primary" style="margin-top: var(--space-4);">Read the Full Essay</a>
                    </div>
                </article>`;
        }

        // Grid cards
        if (grid && data.articles) {
            grid.innerHTML = data.articles.map(a => `
                <article class="pub-card product-card-preview" data-category="${a.category}">
                    <div class="product-card-preview__image">
                        <img src="${a.image}" alt="${a.imageAlt}" loading="lazy">
                    </div>
                    <div class="product-card-preview__content">
                        <span class="pub-card__category">${a.category.charAt(0).toUpperCase() + a.category.slice(1)}</span>
                        <h3 class="product-card-preview__title">${a.title}</h3>
                        <p class="pub-card__excerpt">${a.excerpt}</p>
                        <div class="pub-card__meta">
                            <time class="pub-card__date">${a.date}</time>
                        </div>
                        <a href="${a.url}" class="btn btn--text">Read</a>
                    </div>
                </article>`).join('');

            // Re-wire filter buttons now that cards exist
            initPublicationsFilter();
        }
    });
}

/**
 * Team / Founder sections — about.html
 * Renders founder bio into #founder-content and team description into #team-content.
 * Also updates #founder-photo and #team-photo src/alt.
 */
function initTeamFromData() {
    const founderContent = document.getElementById('founder-content');
    const teamContent = document.getElementById('team-content');
    if (!founderContent && !teamContent) return;

    loadData('data/team.json').then(data => {
        if (!data) return;

        if (founderContent && data.founder) {
            const f = data.founder;
            const founderPhoto = document.getElementById('founder-photo');
            if (founderPhoto) {
                founderPhoto.src = f.image;
                founderPhoto.alt = f.imageAlt;
            }
            founderContent.innerHTML = `
                <span class="section-tagline">${f.tagline}</span>
                <h2 class="section-title">${f.heading.replace('Quiet Concern', '<span class="gradient-text">Quiet Concern</span>')}</h2>
                ${f.bio.map((p, i) => `<p class="section-text"${i > 0 ? ' style="margin-top: var(--space-4);"' : ''}>${p}</p>`).join('')}
                <blockquote class="pull-quote" style="margin-top: var(--space-6);">
                    <p class="pull-quote__text">"${f.quote}"</p>
                    <cite class="pull-quote__attribution">— ${f.name}, ${f.role}</cite>
                </blockquote>`;
        }

        if (teamContent && data.team) {
            const t = data.team;
            const teamPhoto = document.getElementById('team-photo');
            if (teamPhoto) {
                teamPhoto.src = t.image;
                teamPhoto.alt = t.imageAlt;
            }
            teamContent.innerHTML = `
                <span class="section-tagline">${t.tagline}</span>
                <h2 class="section-title">${t.heading.replace('Loud Bunch', '<span class="gradient-text">Loud Bunch</span>')}</h2>
                ${t.description.map((p, i) => `<p class="section-text"${i > 0 ? ' style="margin-top: var(--space-4);"' : ''}>${p}</p>`).join('')}`;
        }
    });
}

/**
 * Products page — products.html
 * Fetches data/products.json, passes to gallery and catalogue renderers.
 * Replaces the old window.PRODUCTS / window.LITTLE_JOYS_GALLERY approach.
 */
function initProductsFromData() {
    const catalogueGrid = document.getElementById('catalogue-grid');
    const galleryMain = document.getElementById('pd-gallery-main');
    if (!catalogueGrid && !galleryMain) return;

    loadData('data/products.json').then(data => {
        if (!data) return;

        // Gallery — inject data into globals and init
        if (galleryMain && data.featured_gallery) {
            window.LITTLE_JOYS_GALLERY = data.featured_gallery;
        }
        initProductGallery();

        // Catalogue grid
        if (catalogueGrid && data.catalogue) {
            window.PRODUCTS = data.catalogue;
        }
        initProductCatalogue();
    });
}
