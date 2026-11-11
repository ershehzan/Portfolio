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

  // 1. Desktop 1440px Dark Mode
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#about', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  const aboutElem = await page.$('#about');
  if (aboutElem) {
    await aboutElem.screenshot({ path: path.join(outDir, 'rollback-01-about-dark-1440px.png') });
    console.log('Saved rollback-01-about-dark-1440px.png');
  }

  // 2. Desktop 1440px Light Mode
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  if (aboutElem) {
    await aboutElem.screenshot({ path: path.join(outDir, 'rollback-02-about-light-1440px.png') });
    console.log('Saved rollback-02-about-light-1440px.png');
  }

  // 3. Mobile Viewport at 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  const mobileAbout = await page.$('#about');
  if (mobileAbout) {
    await mobileAbout.screenshot({ path: path.join(outDir, 'rollback-03-about-mobile-390px.png') });
    console.log('Saved rollback-03-about-mobile-390px.png');
  }

  // 4. Full Desktop Homepage
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'rollback-04-homepage-dark.png') });
  console.log('Saved rollback-04-homepage-dark.png');

  await browser.close();
  console.log('All rollback QA screenshots saved successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

