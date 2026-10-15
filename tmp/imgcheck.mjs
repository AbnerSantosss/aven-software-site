import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
});
await page.waitForTimeout(2500);
const report = await page.evaluate(() => [...document.querySelectorAll('.pf-project-image img')].map(img => ({ src: img.currentSrc.split('/').pop(), complete: img.complete, w: img.naturalWidth, opacity: getComputedStyle(img).opacity, visible: getComputedStyle(img).visibility, cardOpacity: getComputedStyle(img.closest('.pf-project-card')).opacity, cardTransform: img.closest('.pf-project-card').style.transform })));
console.log(JSON.stringify(report, null, 1));
await page.evaluate(() => window.scrollTo(0, 1900));
await page.waitForTimeout(800);
await page.screenshot({ path: process.argv[2] + '/grid-1440.png' });
await browser.close();
