/**
 * Headless smoke test for the built site.
 * Usage: npm run preview (in another shell) then: node scripts/smoke-test.mjs
 * Env: BASE_URL (default http://localhost:4321)
 */
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://localhost:4321';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

const response = await page.goto(base, { waitUntil: 'networkidle' });

const checks = {
  status: response?.status(),
  title: await page.title(),
  h1: (await page.locator('h1').first().textContent())?.replace(/\s+/g, ' ').trim(),
  canonical: await page.getAttribute('link[rel=canonical]', 'href'),
  navLinks: await page.locator('.nav__link').count(),
  dropdowns: await page.locator('.nav__item--dropdown').count(),
  footerLinkColumns: await page.locator('.footer__nav-list').count(),
  footerForm: await page.locator('form[name="newsletter"]').count(),
  skipLink: await page.locator('.skip-link').count(),
  scrollTop: await page.locator('#scroll-top').count(),
  googleFontsRequests: 0,
};

// Confirm no third-party font CDN requests are made.
page.on('request', (request) => {
  if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) checks.googleFontsRequests += 1;
});

// Mobile nav interaction
await page.setViewportSize({ width: 390, height: 844 });
await page.locator('#nav-toggle').click();
const mobileMenuOpen = await page.locator('#nav-menu.active').count();
await page.locator('#nav-toggle').click();

await browser.close();

const result = { checks, mobileMenuOpen, consoleErrors: errors };
console.log(JSON.stringify(result, null, 2));

const failed =
  checks.status !== 200 ||
  checks.footerForm !== 1 ||
  mobileMenuOpen !== 1 ||
  checks.googleFontsRequests !== 0 ||
  errors.length > 0;

process.exit(failed ? 1 : 0);
