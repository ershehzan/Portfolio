const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outDir = path.join('C:/Portfolio/scratch/verification_runs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Desktop 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 400));

  const before = await page.evaluate(() => {
    const h = document.querySelector('header').getBoundingClientRect();
    const nav = document.querySelector('header nav').getBoundingClientRect();
    const lets = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const tog = document.querySelector('header button[aria-label*="Switch to"]').getBoundingClientRect();
    return {
      headerH: h.height,
      navRight: nav.right,
      letsLeft: lets.left,
      letsTop: lets.top,
      togLeft: tog.left,
      togRight: tog.right,
      togTop: tog.top
    };
  });
  console.log('Desktop Before:', JSON.stringify(before, null, 2));

  // Click toggle
  const toggleBtn = await page.$('button[aria-label*="Switch to"]');
  await toggleBtn.click();

  // Wait 400ms during animation
  await new Promise(r => setTimeout(r, 400));
  const during = await page.evaluate(() => {
    const h = document.querySelector('header').getBoundingClientRect();
    const nav = document.querySelector('header nav').getBoundingClientRect();
    const lets = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const portal = document.querySelector('header div[aria-label="Theme transition in progress"]');
    const p = portal ? portal.getBoundingClientRect() : null;
    return {
      headerH: h.height,
      navRight: nav.right,
      letsLeft: lets.left,
      portal: p ? { top: p.top, bottom: p.bottom, left: p.left, right: p.right, width: p.width, height: p.height } : null
    };
  });
  console.log('Desktop During:', JSON.stringify(during, null, 2));

  if (during.portal) {
    console.log('Header height change:', during.headerH - before.headerH, 'px (0 is desired)');
    console.log('Clearance from nav:', during.portal.left - during.navRight, 'px');
    console.log('Clearance to LetsTalk:', during.letsLeft - during.portal.right, 'px');
    console.log('Vertical top alignment difference with LetsTalk:', Math.abs(during.portal.top - before.letsTop), 'px');
  }

  await browser.close();
})();

