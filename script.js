/* ========================================
   GOPPO GURO - JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    initMobileNav();

    // Smooth scroll for navigation links
    initSmoothScroll();

    // Header scroll effect
    initHeaderScroll();

    // Impact Calculator
    initImpactCalculator();

    // Newsletter form
    initNewsletterForm();

    // Intersection Observer for animations
    initScrollAnimations();

    // Hero Canvas Animation
    initHeroAnimation();
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
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/**
 * Smooth Scroll for Navigation
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(href);
            }
        });
    });
}

/**
 * Update Active Navigation Link
 */
function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (!header) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavOnScroll();

        lastScrollY = currentScrollY;
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

    const animatedElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .sdg__goal, .impact__result-card, .story__content, .story__visual, .product-card-preview, .product-card, .csn-journey__step, .csn-difference__feature, .csn-matters__card, .csn-growth__standard, .csn-difference__visual, .csn-growth__visual, .csn-themes__card, .csn-schedule__day, .csn-books__book, .csn-themes__poster, .csn-schedule__poster, .csn-books__poster'
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
