import { chromium } from 'playwright';
const out = process.argv[2];
const base = 'http://127.0.0.1:4175';
const browser = await chromium.launch();
const views = [[375,812],[768,1024],[1440,900]];
const pages = ['/','/projetos/','/especialidades/','/sobre/','/contato/'];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, window.innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(r => setTimeout(r, 900));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 400));
  });
}

async function hiddenReveals(page) {
  return page.evaluate(() => {
    const items = [...document.querySelectorAll('.pf-reveal')];
    const hidden = items.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.99);
    return { total: items.length, hidden: hidden.length, sample: hidden.slice(0, 3).map(el => el.className) };
  });
}

for (const reduced of [false, true]) {
  for (const [w, h] of views) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 200)); });
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1800);
      const hero = p === '/' ? await page.evaluate(() => {
        const s = document.querySelector('.pf-hero');
        const h1 = document.querySelector('.pf-hero h1');
        const line = document.querySelector('.pf-line-inner');
        return { intro: s?.dataset.intro, h1Opacity: getComputedStyle(h1).opacity, lineTransform: getComputedStyle(line).transform, portraitOpacity: getComputedStyle(document.querySelector('.pf-portrait')).opacity };
      }) : null;
      await scrollThrough(page);
      const reveals = await hiddenReveals(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      const name = (p === '/' ? 'home' : p.replaceAll('/', '')) + '-' + w + (reduced ? '-rm' : '');
      if (!reduced) await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
      console.log(name, 'overflowX:', overflow, 'reveals hidden:', reveals.hidden + '/' + reveals.total, reveals.sample.join(' | '), hero ? JSON.stringify(hero) : '');
    }
    if (!reduced && w === 375) {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.click('.pf-menu-toggle');
      await page.waitForTimeout(400);
      const navVisible = await page.isVisible('#portfolio-menu');
      await page.screenshot({ path: `${out}/menu-375.png` });
      await page.mouse.click(10, 700);
      await page.waitForTimeout(500);
      const navGone = (await page.$('#portfolio-menu')) === null;
      console.log('menu open visible:', navVisible, 'closed by outside tap:', navGone);
      const marquee = await page.evaluate(() => getComputedStyle(document.querySelector('.pf-marquee-track')).transform);
      console.log('marquee transform:', marquee);
      await page.goto(base + '/projetos/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);
      await page.click('.pf-filters button:nth-child(3)');
      await page.waitForTimeout(700);
      const count = await page.evaluate(() => document.querySelectorAll('.pf-project-card').length);
      await page.click('.pf-project-image');
      await page.waitForTimeout(600);
      const dialog = await page.evaluate(() => { const d = document.querySelector('.pf-dialog'); const r = d.getBoundingClientRect(); return { open: d.open, bottom: Math.round(r.bottom), vh: innerHeight, width: Math.round(r.width) }; });
      await page.screenshot({ path: `${out}/dialog-375.png` });
      console.log('filter Sistemas cards:', count, 'dialog:', JSON.stringify(dialog));
    }
    if (!reduced && w === 1440) {
      await page.goto(base + '/projetos/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const card = await page.$('.pf-project-card');
      const box = await card.boundingBox();
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3);
      await page.waitForTimeout(700);
      const tilt = await page.evaluate(() => { const c = document.querySelector('.pf-project-card'); return { hover: c.dataset.hover, transform: c.style.transform, mx: c.style.getPropertyValue('--mx') }; });
      console.log('card tilt:', JSON.stringify(tilt));
      await page.screenshot({ path: `${out}/tilt-1440.png` });
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(500);
      const header = await page.evaluate(() => ({ scrolled: document.querySelector('.pf-header').dataset.scrolled, height: document.querySelector('.pf-header-inner').getBoundingClientRect().height, progress: document.querySelector('.pf-progress').style.transform }));
      console.log('header:', JSON.stringify(header));
    }
    if (errors.length) console.log('ERRORS', w, reduced ? 'rm' : '', errors.slice(0, 8));
    await ctx.close();
  }
}
await browser.close();
