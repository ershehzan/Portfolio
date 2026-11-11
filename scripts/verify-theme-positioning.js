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

  // ==========================================
  // Test 1: Desktop 1440px - Dark to Light
  // ==========================================
  console.log('--- TEST 1: Desktop 1440px (Dark to Light) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  // 1. Navbar before switch
  await page.screenshot({
    path: path.join(outDir, '01_desktop_before_switch.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  const beforeBoxes = await page.evaluate(() => {
    const header = document.querySelector('header').getBoundingClientRect();
    const nav = document.querySelector('header nav').getBoundingClientRect();
    const letsTalk = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const toggle = document.querySelector('header button[aria-label*="Switch to"]').getBoundingClientRect();
    return { header, nav, letsTalk, toggle };
  });
  console.log('Desktop Before Click:');
  console.log('Header height:', beforeBoxes.header.height);
  console.log('Nav right:', beforeBoxes.nav.right);
  console.log('Toggle left:', beforeBoxes.toggle.left, 'right:', beforeBoxes.toggle.right, 'top:', beforeBoxes.toggle.top);
  console.log('LetsTalk left:', beforeBoxes.letsTalk.left);

  // Click toggle
  const toggleBtn = await page.$('button[aria-label*="Switch to"]');
  await toggleBtn.click();
  console.log('Clicked toggle button.');

  // 2. Capsule appearance & stickman walk (~400ms)
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(outDir, '02_desktop_capsule_stride.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  const midBoxes = await page.evaluate(() => {
    const header = document.querySelector('header').getBoundingClientRect();
    const nav = document.querySelector('header nav').getBoundingClientRect();
    const letsTalk = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const portal = document.querySelector('header div[aria-label="Theme transition in progress"]');
    const portalBox = portal ? portal.getBoundingClientRect() : null;
    return { header, nav, letsTalk, portalBox };
  });
  console.log('During Animation (~400ms):');
  console.log('Header height (did it change?):', midBoxes.header.height, 'vs', beforeBoxes.header.height);
  if (midBoxes.portalBox) {
    console.log('Capsule box: top:', midBoxes.portalBox.top, 'bottom:', midBoxes.portalBox.bottom, 'left:', midBoxes.portalBox.left, 'right:', midBoxes.portalBox.right, 'height:', midBoxes.portalBox.height);
    console.log('Clearance from nav:', midBoxes.portalBox.left - midBoxes.nav.right, 'px');
    console.log('Clearance to LetsTalk:', midBoxes.letsTalk.left - midBoxes.portalBox.right, 'px');
    console.log('Vertical alignment with LetsTalk:', Math.abs(midBoxes.portalBox.top - midBoxes.letsTalk.top) <= 2 ? 'PERFECT' : 'OFF');
  }

  // 3. Stickman jump arc & dive (~950ms)
  await new Promise(r => setTimeout(r, 550));
  await page.screenshot({
    path: path.join(outDir, '03_desktop_dive_portal.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // 4. Submerged & theme swapped (~1250ms)
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({
    path: path.join(outDir, '04_desktop_submerged_swapped.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // 5. Emergence (~1550ms)
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({
    path: path.join(outDir, '05_desktop_emerging.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // 6. Final navbar after transition completes (~2200ms)
  await new Promise(r => setTimeout(r, 650));
  await page.screenshot({
    path: path.join(outDir, '06_desktop_final_navbar.png'),
    clip: { x: 0, y: 0, width: 1440, height: 100 }
  });

  // ==========================================
  // Test 2: Mobile 390px - Dark to Light
  // ==========================================
  console.log('\n--- TEST 2: Mobile 390px (Dark to Light) ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(outDir, '07_mobile_before_switch.png'),
    clip: { x: 0, y: 0, width: 390, height: 80 }
  });

  const mobToggle = await page.$('button[aria-label*="Switch to"]');
  await mobToggle.click();

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(outDir, '08_mobile_during_anim.png'),
    clip: { x: 0, y: 0, width: 390, height: 80 }
  });

  const mobBoxes = await page.evaluate(() => {
    const brand = document.querySelector('header a[href="#home"]').getBoundingClientRect();
    const portal = document.querySelector('header div[aria-label="Theme transition in progress"]');
    const letsTalk = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    return {
      brandRight: brand.right,
      portalLeft: portal ? portal.getBoundingClientRect().left : null,
      portalRight: portal ? portal.getBoundingClientRect().right : null,
      letsTalkLeft: letsTalk.left
    };
  });
  console.log('Mobile Layout during transition:');
  console.log('Brand right:', mobBoxes.brandRight, 'Portal left:', mobBoxes.portalLeft);
  console.log('Portal right:', mobBoxes.portalRight, 'LetsTalk left:', mobBoxes.letsTalkLeft);

  await new Promise(r => setTimeout(r, 1700));
  await page.screenshot({
    path: path.join(outDir, '09_mobile_final_navbar.png'),
    clip: { x: 0, y: 0, width: 390, height: 80 }
  });

  await browser.close();
  console.log('\nAll geometry verification screenshots captured successfully in scratch/verification_runs!');
})();

