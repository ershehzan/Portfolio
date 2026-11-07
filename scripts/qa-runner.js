const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVisualQA() {
  console.log('🚀 Starting Automated Visual QA Pass...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  
  // Collect console logs and errors
  const consoleErrors = [];
  const consoleWarnings = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  // Track failed network requests
  const failedRequests = [];
  page.on('requestfailed', (req) => {
    failedRequests.push(`${req.method()} ${req.url()} - ${req.failure().errorText}`);
  });

  // ==========================================
  // 1. DESKTOP DARK MODE
  // ==========================================
  console.log('📸 1. Capturing Desktop DARK mode...');
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.waitForSelector('#home');

  // Hero Section Dark
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-hero-dark.png') });

  // About Section Dark
  await page.evaluate(() => document.getElementById('about').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-about-dark.png') });

  // Work Section Dark
  await page.evaluate(() => document.getElementById('work').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-work-dark.png') });

  // Stack Section Dark
  await page.evaluate(() => document.getElementById('stack').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-stack-dark.png') });

  // Codolio Section Dark
  await page.evaluate(() => document.getElementById('problem-solving').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-codolio-dark.png') });

  // Footer Section Dark (Showing S H E H Z A N restored letter tiles)
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-footer-dark.png') });

  // ==========================================
  // 2. DESKTOP LIGHT MODE
  // ==========================================
  console.log('📸 2. Capturing Desktop LIGHT mode...');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await page.waitForSelector('#home');

  // Hero Section Light
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-hero-light.png') });

  // Work Section Light
  await page.evaluate(() => document.getElementById('work').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-work-light.png') });

  // Stack Section Light
  await page.evaluate(() => document.getElementById('stack').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-stack-light.png') });

  // Footer Section Light (Showing S H E H Z A N restored letter tiles in Light mode)
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-footer-light.png') });

  // ==========================================
  // 3. THEME TOGGLE STATES
  // ==========================================
  console.log('📸 3. Capturing Theme Toggle in both states...');
  const toggleBtn = await page.$('button[aria-label="Switch to dark mode"], button[aria-label="Switch to light mode"]');
  if (toggleBtn) {
    await toggleBtn.screenshot({ path: path.join(SCREENSHOT_DIR, 'toggle-light-state.png') });
    await toggleBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    await toggleBtn.screenshot({ path: path.join(SCREENSHOT_DIR, 'toggle-dark-state.png') });
  }

  // ==========================================
  // 4. VIDEO MODALS PLAYING MUTED
  // ==========================================
  console.log('📸 4. Testing FlowForge Video Modal...');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.evaluate(() => document.getElementById('work').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));

  // Click Watch Demo for FlowForge
  const watchFlowForgeBtn = await page.waitForSelector('button[title*="FlowForge"]');
  await watchFlowForgeBtn.click();
  await new Promise((r) => setTimeout(r, 1200));

  // Check if video is playing and muted
  const flowForgeStatus = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { muted: v.muted, paused: v.paused, currentTime: v.currentTime } : null;
  });
  console.log('  -> FlowForge Video Status:', flowForgeStatus);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'modal-flowforge-playing.png') });

  // Close modal via Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // Click Watch Demo for CodeGuard
  console.log('📸 4. Testing CodeGuard Video Modal...');
  const watchCodeGuardBtn = await page.waitForSelector('button[title*="CodeGuard"]');
  await watchCodeGuardBtn.click();
  await new Promise((r) => setTimeout(r, 1200));

  const codeGuardStatus = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { muted: v.muted, paused: v.paused, currentTime: v.currentTime } : null;
  });
  console.log('  -> CodeGuard Video Status:', codeGuardStatus);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'modal-codeguard-playing.png') });

  // Close modal via Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // ==========================================
  // 5. MOBILE 390px VIEWPORT
  // ==========================================
  console.log('📸 5. Testing Mobile Viewport at 390px width...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });

  // Hero Mobile
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-01-hero-390px.png') });

  // Open Mobile Nav Menu
  const mobileMenuBtn = await page.$('button[aria-label="Toggle mobile menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-02-nav-menu-390px.png') });
    await mobileMenuBtn.click();
    await new Promise((r) => setTimeout(r, 300));
  }

  // Work Cards Mobile
  await page.evaluate(() => document.getElementById('work').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-03-work-cards-390px.png') });

  // Footer Restored Letter Tiles Mobile
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-04-footer-390px.png') });

  // ==========================================
  // 6. CONSOLE & NETWORK AUDIT
  // ==========================================
  console.log('\n🔍 Console & Network Audit:');
  console.log('Console Errors:', consoleErrors.length ? consoleErrors : 'None (Clean)');
  console.log('Console Warnings:', consoleWarnings.length ? consoleWarnings : 'None (Clean)');
  console.log('Failed Requests:', failedRequests.length ? failedRequests : 'None (Clean)');

  await browser.close();
  console.log('\n✨ Automated Visual QA Pass Finished Successfully!');
}

runVisualQA().catch((err) => {
  console.error('QA Error:', err);
  process.exit(1);
});
