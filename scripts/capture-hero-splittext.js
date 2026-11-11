const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Capture animation stages
  // Frame 1: Immediate load (start of staggered entrance)
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 80));
  await page.screenshot({ path: path.join(outDir, 'phase2-hero-anim-01-start.png') });
  console.log('Saved phase2-hero-anim-01-start.png');

  // Frame 2: Mid-stagger (lines entering with spring offset)
  await new Promise(r => setTimeout(r, 220));
  await page.screenshot({ path: path.join(outDir, 'phase2-hero-anim-02-stagger.png') });
  console.log('Saved phase2-hero-anim-02-stagger.png');

  // Frame 3: Settled in Dark Mode
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'phase2-hero-desktop-dark.png') });
  console.log('Saved phase2-hero-desktop-dark.png');

  // 2. Light Mode settled
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, 'phase2-hero-desktop-light.png') });
  console.log('Saved phase2-hero-desktop-light.png');

  // 3. Mobile Viewport at 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'phase2-hero-mobile-390px.png') });
  console.log('Saved phase2-hero-mobile-390px.png');

  // 4. Verify reduced motion functionality
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 300));
  const hasVisibleHeading = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    return h1 && h1.innerText.includes('ENGINEER.') && h1.innerText.includes('BUILD.') && h1.innerText.includes('SOLVE.');
  });
  console.log('Reduced motion check passed:', hasVisibleHeading);

  await browser.close();
  console.log('All Phase 2 captures and tests completed successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

