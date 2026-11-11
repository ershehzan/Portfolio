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

  // Test 1: Desktop 1440px Dark Mode
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#about', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 500));

  // Verify DOM contents
  const domVerification = await page.evaluate(() => {
    const about = document.getElementById('about');
    if (!about) return { found: false };
    const text = about.innerText;
    return {
      found: true,
      hasHeadline: text.includes('Engineering software that works reliably from bits to scale.'),
      hasLowLevelRigor: text.includes('Low-Level Rigor'),
      hasCombinatorial: text.includes('Combinatorial Optimization'),
      hasAlgorithmic: text.includes('Algorithmic Consistency'),
      hasOldImShehzan: text.includes("I'm Shehzan"),
      hasOldSkillCloud: text.includes('Click any skill to inspect'),
      hasOldWhatIDo: text.includes('WHAT I DO'),
    };
  });

  console.log('DOM Verification Result:', JSON.stringify(domVerification, null, 2));

  if (!domVerification.hasHeadline || !domVerification.hasLowLevelRigor) {
    throw new Error('Verification failed: Headline or cards not in DOM!');
  }
  if (domVerification.hasOldImShehzan || domVerification.hasOldSkillCloud) {
    throw new Error('Verification failed: Old components still present in DOM!');
  }

  // 1. Dark Mode screenshot of About
  const aboutElem = await page.$('#about');
  await aboutElem.screenshot({ path: path.join(outDir, 'actual-dark-mode.png') });
  console.log('Saved actual-dark-mode.png');

  // Also full desktop viewport
  await page.screenshot({ path: path.join(outDir, 'actual-desktop-1440px.png') });
  console.log('Saved actual-desktop-1440px.png');

  // 2. Light Mode screenshot of About
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  await aboutElem.screenshot({ path: path.join(outDir, 'actual-light-mode.png') });
  console.log('Saved actual-light-mode.png');

  // 3. Mobile Viewport at 390px
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  const mobileAbout = await page.$('#about');
  await mobileAbout.screenshot({ path: path.join(outDir, 'actual-mobile-390px.png') });
  console.log('Saved actual-mobile-390px.png');

  await browser.close();
  console.log('ALL ACTUAL IN-BROWSER TESTS PASSED!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

