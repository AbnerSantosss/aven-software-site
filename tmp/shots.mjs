import { chromium } from 'playwright';
const out = process.argv[2];
const base = 'http://127.0.0.1:4175';
const browser = await chromium.launch();
const views = [[375,812],[768,1024],[1440,900]];
const pages = ['/','/projetos/','/especialidades/','/sobre/','/contato/'];
for (const [w,h] of views) {
  const ctx = await browser.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
  const page = await ctx.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{ if(m.type()==='error') errors.push(m.text()); });
  for (const p of pages) {
    await page.goto(base+p,{waitUntil:'networkidle'});
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
    const name = (p==='/'?'home':p.replaceAll('/',''))+'-'+w;
    await page.screenshot({path:`${out}/${name}.png`, fullPage:true});
    console.log(name, 'overflowX:', overflow);
  }
  if(errors.length) console.log('ERRORS', w, errors);
  await ctx.close();
}
await browser.close();
