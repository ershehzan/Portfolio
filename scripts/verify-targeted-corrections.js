const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots', 'targeted_corrections');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Running Targeted Corrections Visual Verification...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Desktop 1440px Navbar (Dark Theme)
  console.log('📸 1. Capturing Navbar in Dark Theme...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-navbar-dark.png'),
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });

  // 2. Active Navigation Capsule Glider Test (About -> Work -> Stack)
  console.log('📸 2. Testing Active Capsule Glider between links...');
  // Click Work
  const workLink = await page.$('a[href="#work"]');
  if (workLink) {
    await workLink.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '02-navbar-active-work.png'),
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
  }

  // Click Stack
  const stackLink = await page.$('a[href="#stack"]');
  if (stackLink) {
    await stackLink.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '03-navbar-active-stack.png'),
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
  }

  // 3. Restored Original Stack Section
  console.log('📸 3. Capturing Restored Original Stack Section...');
  await page.evaluate(() => {
    document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-restored-stack-section.png'),
    fullPage: false,
  });

  // 4. Test Compact Theme Switcher (Dark -> Light)
  console.log('📸 4. Testing Compact Theme Switcher (Dark -> Light)...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));

  const toggleBtn = await page.$('button[aria-label="Switch to light mode"], button[aria-label="Switch to dark mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    // Capture mid-flight capsule (around 450ms)
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '05-compact-theme-switcher-inflight-dark-to-light.png'),
      clip: { x: 700, y: 0, width: 740, height: 200 },
    });
    // Wait for transition to complete
    await new Promise((r) => setTimeout(r, 1200));
  }

  // 5. Navbar in Light Theme
  console.log('📸 5. Capturing Navbar in Light Theme...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '06-navbar-light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });

  // 6. Test Compact Theme Switcher (Light -> Dark)
  console.log('📸 6. Testing Compact Theme Switcher (Light -> Dark)...');
  const toggleBtn2 = await page.$('button[aria-label="Switch to light mode"], button[aria-label="Switch to dark mode"]');
  if (toggleBtn2) {
    await toggleBtn2.click();
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '07-compact-theme-switcher-inflight-light-to-dark.png'),
      clip: { x: 700, y: 0, width: 740, height: 200 },
    });
    await new Promise((r) => setTimeout(r, 1200));
  }

  // 7. Mobile 390px Test
  console.log('📱 7. Testing Mobile 390px Layout...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-mobile-390px-header.png'),
    clip: { x: 0, y: 0, width: 390, height: 180 },
  });

  // Mobile Theme Toggle & Capsule Test
  const mobileToggle = await page.$('button[aria-label="Switch to light mode"], button[aria-label="Switch to dark mode"]');
  if (mobileToggle) {
    await mobileToggle.click();
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '09-mobile-compact-switcher-inflight.png'),
      clip: { x: 0, y: 0, width: 390, height: 200 },
    });
    await new Promise((r) => setTimeout(r, 1200));
  }

  await browser.close();
  console.log('✅ Targeted Corrections QA Complete! Console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
  }
}

runVerification().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});

