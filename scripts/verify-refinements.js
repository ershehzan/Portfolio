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

  console.log('Navigating to http://localhost:3000?theme=dark ...');
  await page.goto('http://localhost:3000?theme=dark', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // 1. Capture About section in Dark Mode
  const aboutElem = await page.$('#about');
  if (aboutElem) {
    await aboutElem.screenshot({ path: path.join(outDir, 'solio-about-refined.png') });
    console.log('Saved solio-about-refined.png');
  }

  // 2. Capture theme toggle portal open
  await page.evaluate(() => {
    const toggleBtn = document.querySelector('button[title*="Switch to"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, 'solio-theme-portal.png') });
  console.log('Saved solio-theme-portal.png');

  // Wait for transition to complete
  await new Promise(r => setTimeout(r, 1200));

  // 3. Capture desktop in Light Mode
  await page.screenshot({ path: path.join(outDir, 'solio-desktop-light.png'), fullPage: false });
  console.log('Saved solio-desktop-light.png');

  // Return to dark mode
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));

  // 4. Capture desktop in Dark Mode
  await page.screenshot({ path: path.join(outDir, 'solio-desktop-dark.png'), fullPage: false });
  console.log('Saved solio-desktop-dark.png');

  // 5. Capture mobile at 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'solio-mobile-390px.png'), fullPage: false });
  console.log('Saved solio-mobile-390px.png');

  await browser.close();
  console.log('All QA screenshots captured successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

