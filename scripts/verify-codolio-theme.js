const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots', 'codolio_theme');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyCodolioTheme() {
  console.log('🚀 Verifying Codolio Screenshot Theme Handling...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Dark Mode
  console.log('📸 1. Testing Dark Mode Codolio Screenshot...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Check filter on image in dark mode
  const darkFilter = await page.evaluate(() => {
    const img = document.querySelector('img[src*="DarkMode_Codolio"]');
    return img ? window.getComputedStyle(img).filter : 'not found';
  });
  console.log('Dark mode computed filter:', darkFilter);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-codolio-section-dark.png'),
    fullPage: false,
  });

  // 2. Light Mode
  console.log('📸 2. Testing Light Mode Codolio Screenshot...');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Check filter on image in light mode
  const lightFilter = await page.evaluate(() => {
    const img = document.querySelector('img[src*="DarkMode_Codolio"]');
    return img ? window.getComputedStyle(img).filter : 'not found';
  });
  console.log('Light mode computed filter:', lightFilter);

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-codolio-section-light.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('✅ Codolio Verification Complete! Console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }
}

verifyCodolioTheme().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});

