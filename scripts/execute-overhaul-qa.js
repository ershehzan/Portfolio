const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots', 'overhaul');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runQA() {
  console.log('🚀 Starting Comprehensive Phase F QA Audit...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();

  // Monitor console errors
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // 1. Desktop 1440px Dark Mode
  console.log('📸 1. Capturing Desktop 1440px Dark Mode...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-desktop-hero-dark.png'),
    fullPage: false,
  });

  // Scroll to About
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-desktop-about-dark.png'),
    fullPage: false,
  });

  // Scroll to Work
  await page.evaluate(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '03-desktop-work-dark.png'),
    fullPage: false,
  });

  // Test Work Category Filter (Systems & C++)
  console.log('🔄 Testing Work category filter...');
  const systemsFilterBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find((b) => b.textContent.includes('Systems & C++'));
  });
  if (systemsFilterBtn) {
    await systemsFilterBtn.click();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '04-desktop-work-filtered-systems.png'),
      fullPage: false,
    });
  }

  // Scroll to Stack
  await page.evaluate(() => {
    document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-desktop-stack-dark.png'),
    fullPage: false,
  });

  // Scroll to Codolio / Problem Solving
  await page.evaluate(() => {
    document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06-desktop-codolio-dark.png'),
    fullPage: false,
  });

  // Scroll to Footer
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-desktop-footer-dark.png'),
    fullPage: false,
  });

  // 2. Test Theme Transition in Action
  console.log('🌗 Testing Theme Transition Animation...');
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));

  // Find theme toggle button and click
  const toggleBtn = await page.$('button[aria-label="Switch to light mode"], button[aria-label="Switch to dark mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    // Capture mid-transition (around 500ms when stickman dives)
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '08-theme-portal-in-flight.png'),
      fullPage: false,
    });
    // Wait for transition to complete
    await new Promise((r) => setTimeout(r, 1200));
  }

  // 3. Desktop 1440px Light Mode
  console.log('☀️ Capturing Desktop 1440px Light Mode...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-desktop-hero-light.png'),
    fullPage: false,
  });

  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '10-desktop-about-light.png'),
    fullPage: false,
  });

  // 4. Tablet 768px
  console.log('📱 Capturing Tablet 768px...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-tablet-768px-dark.png'),
    fullPage: false,
  });

  // 5. Mobile 390px
  console.log('📱 Capturing Mobile 390px...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '12-mobile-390px-dark.png'),
    fullPage: false,
  });

  // Test Mobile Navigation Menu
  const mobileMenuBtn = await page.$('button[aria-label="Toggle mobile menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '13-mobile-menu-open.png'),
      fullPage: false,
    });
  }

  await browser.close();
  console.log('✅ QA Audit Completed! Console errors detected:', errors.length);
  if (errors.length > 0) {
    console.error('Errors:', errors);
  }
}

runQA().catch((err) => {
  console.error('QA Error:', err);
  process.exit(1);
});

