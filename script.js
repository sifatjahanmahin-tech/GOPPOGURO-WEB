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

    // Publications category filter
    initPublicationsFilter();

    // Gallery lightbox
    initLightbox();

    // Stagger reveal containers
    initStaggerObserver();

    // Women Makers canvas animation
    initWomenMakersAnimation();
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
        const trigger = item.querySelector('.nav__dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Dropdown Navigation
 */
function initDropdownNav() {
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    if (!dropdownItems.length) return;

    dropdownItems.forEach(item => {
        const trigger = item.querySelector('.nav__dropdown-trigger');
        const dropdown = item.querySelector('.nav__dropdown');
        if (!trigger || !dropdown) return;

        const dropdownLinks = dropdown.querySelectorAll('.nav__dropdown-link');

        // Toggle on trigger click
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = item.classList.contains('is-open');

            // Close all other dropdowns
            closeAllDropdowns();

            if (!isOpen) {
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard: ArrowDown from trigger → focus first link
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!item.classList.contains('is-open')) {
                    closeAllDropdowns();
                    item.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
                if (dropdownLinks.length) dropdownLinks[0].focus();
            }
            if (e.key === 'Escape') {
                closeAllDropdowns();
                trigger.focus();
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
                        trigger.focus();
                    } else {
                        dropdownLinks[index - 1].focus();
                    }
                }
                if (e.key === 'Escape') {
                    closeAllDropdowns();
                    trigger.focus();
                }
            });
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    // Desktop hover behavior
    if (window.matchMedia('(min-width: 769px)').matches) {
        dropdownItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                closeAllDropdowns();
                item.classList.add('is-open');
                const trigger = item.querySelector('.nav__dropdown-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'true');
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('is-open');
                const trigger = item.querySelector('.nav__dropdown-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Highlight Active Navigation Link based on current URL
 */
function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    // Match regular nav links
    document.querySelectorAll('.nav__link:not(.nav__dropdown-trigger)').forEach(link => {
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

    // Mark parent dropdown trigger active if a child page is current
    document.querySelectorAll('.nav__item--dropdown').forEach(item => {
        const activeChild = item.querySelector('.nav__dropdown-link--active');
        if (activeChild) {
            const trigger = item.querySelector('.nav__dropdown-trigger');
            if (trigger) trigger.classList.add('nav__dropdown-trigger--active');
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
 * Scroll Animations with Intersection Observer
 */
function initScrollAnimations() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Common selectors for cards and sections across all pages
    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .sdg__goal, .impact__result-card, .story__content, .story__visual, .product-card-preview, .product-card, .csn-journey__step, .csn-difference__feature, .csn-matters__card, .csn-growth__standard, .csn-difference__visual, .csn-growth__visual, .csn-themes__card, .csn-schedule__day, .csn-books__book, .csn-themes__poster, .csn-schedule__poster, .csn-books__poster, .section-title, .section-tagline, .section-description, .card, .cycle-step, .box-item, .activity-node, .craft-pillar, .involvement-card, .pub-card, .pub-featured, .gallery-item, .sdg-badge, .journey-step, .stat-highlight, .prog-showcase'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
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

    function startAnimation() {
        requestAnimationFrame(updateFrame);
    }

    function updateFrame() {
        render();

        frameIndex += direction;

        // Loop back and forth for a "smooth" transition feel
        if (frameIndex >= frameCount - 1) {
            direction = -1;
        } else if (frameIndex <= 0) {
            direction = 1;
        }

        setTimeout(() => {
            requestAnimationFrame(updateFrame);
        }, 40); // ~25 FPS
    }

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

// Initialize parallax after page load
window.addEventListener('load', initParallax);

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

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = () => {
            loaded++;
            if (loaded === frameCount) {
                resize();
                let lastTime = 0;
                function tick(ts) {
                    if (ts - lastTime > 40) {
                        lastTime = ts;
                        render(frameIndex);
                        frameIndex += direction;
                        if (frameIndex >= frameCount - 1) direction = -1;
                        if (frameIndex <= 0) direction = 1;
                    }
                    requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }
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
