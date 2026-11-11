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

  // 1. Desktop Light Mode
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 400));
  const aboutElemLight = await page.$('#about');
  if (aboutElemLight) {
    await aboutElemLight.screenshot({ path: path.join(outDir, 'about-restored-light.png') });
    console.log('Saved about-restored-light.png');
  }

  // 2. Desktop Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));
  const aboutElemDark = await page.$('#about');
  if (aboutElemDark) {
    await aboutElemDark.screenshot({ path: path.join(outDir, 'about-restored-dark.png') });
    console.log('Saved about-restored-dark.png');
  }

  // 3. Mobile Viewport at 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 400));
  const aboutElemMobile = await page.$('#about');
  if (aboutElemMobile) {
    await aboutElemMobile.screenshot({ path: path.join(outDir, 'about-restored-mobile-390px.png') });
    console.log('Saved about-restored-mobile-390px.png');
  }

  await browser.close();
  console.log('Completed all captures.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

