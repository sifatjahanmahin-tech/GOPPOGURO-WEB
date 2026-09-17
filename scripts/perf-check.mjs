/**
 * Measures Core Web Vitals-ish metrics and page weight for a built page.
 * Usage: npm run preview (in another shell) then: node scripts/perf-check.mjs
 * Env: BASE_URL (default http://localhost:4321), PATHNAME (default /)
 */
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://localhost:4321';
const pathname = process.env.PATHNAME || '/';
const url = new URL(pathname, base).href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(String(error)));

await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(3000);

const metrics = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const result = { lcp: 0, cls: 0 };
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          result.lcp = entries[entries.length - 1].startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) result.cls += entry.value;
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {
        /* unsupported */
      }
      setTimeout(() => {
        const resources = performance.getEntriesByType('resource');
        let total = 0;
        const byType = {};
        for (const resource of resources) {
          const size = resource.transferSize || 0;
          total += size;
          byType[resource.initiatorType] = (byType[resource.initiatorType] || 0) + size;
        }
        resolve({
          lcp: Math.round(result.lcp),
          cls: Number(result.cls.toFixed(4)),
          resourceCount: resources.length,
          transferBytes: total,
          transferMB: Number((total / 1048576).toFixed(2)),
          byTypeKB: Object.fromEntries(
            Object.entries(byType).map(([key, value]) => [key, Math.round(value / 1024)])
          ),
        });
      }, 300);
    })
);

console.log(JSON.stringify({ url, metrics, consoleErrors: errors }, null, 2));
await browser.close();

process.exit(errors.length ? 1 : 0);
