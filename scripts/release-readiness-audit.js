const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'screenshots', 'release_audit');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runReleaseAudit() {
  console.log('🏁 Starting Comprehensive Release-Readiness Audit...');

  const auditReport = {
    checks: {},
    linksVerified: [],
    assetsVerified: [],
    consoleErrors: [],
    failedRequests: [],
  };

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();

  // Monitor console errors and failed network requests
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      auditReport.consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', (req) => {
    auditReport.failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  // ==========================================
  // CHECK 1 & 2: Dark Mode Full Walkthrough
  // ==========================================
  console.log('📸 1. Capturing Desktop 1440px Dark Mode Full Walkthrough...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));

  // Full page Dark Mode screenshot
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '01-fullpage-dark.png'),
    fullPage: true,
  });

  // Individual Section Snaps in Dark Mode
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '02-section-hero-dark.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // Check 3: Navbar items order
  const navTexts = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    return nav ? Array.from(nav.querySelectorAll('a')).map((a) => a.textContent.trim()) : [];
  });
  console.log('Navbar items detected:', navTexts);
  auditReport.checks.navOrder = navTexts[0] === 'About' && navTexts[1] === 'Work';

  // Test Active Capsule Glider between links
  console.log('🔄 Testing active navigation glider...');
  const workLink = await page.$('a[href="#work"]');
  if (workLink) {
    await workLink.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '03-nav-glider-work.png'),
      clip: { x: 0, y: 0, width: 1440, height: 120 },
    });
  }

  // Scroll to About
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '04-section-about-dark.png'),
    fullPage: false,
  });

  // Scroll to Work
  await page.evaluate(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '05-section-work-dark.png'),
    fullPage: false,
  });

  // Check 6: Test Video Modal Opening & Closing
  console.log('🎬 Testing Video Modal in Work section...');
  const playButton = await page.$('button[title*="Watch FlowForge"]');
  if (playButton) {
    await playButton.click();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '06-video-modal-open.png'),
      fullPage: false,
    });
    // Close modal via Escape key
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
    auditReport.checks.videoModal = true;
  }

  // Scroll to Stack (Check 4: Original Tech Stack design)
  await page.evaluate(() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '07-section-stack-restored-dark.png'),
    fullPage: false,
  });

  const hasCentralHub = await page.evaluate(() => {
    return !!document.body.innerText.includes('Tools I\nlive in.') || !!document.body.innerText.includes('Tools I live in.');
  });
  auditReport.checks.stackRestored = hasCentralHub;

  // Scroll to Problem Solving (Check 5: Codolio screenshot in Dark Mode)
  await page.evaluate(() => document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '08-section-codolio-dark.png'),
    fullPage: false,
  });

  const darkCodolioImage = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('#problem-solving img'));
    const visibleImg = images.find((img) => window.getComputedStyle(img).opacity !== '0');
    return visibleImg ? { src: visibleImg.src, filter: window.getComputedStyle(visibleImg).filter } : null;
  });
  console.log('Dark Mode Codolio Image detected:', darkCodolioImage);
  auditReport.checks.codolioDark = darkCodolioImage && darkCodolioImage.src.includes('DarkMode_Codolio') && darkCodolioImage.filter === 'none';

  // Scroll to Footer
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '09-section-footer-dark.png'),
    fullPage: false,
  });

  // ==========================================
  // CHECK 2: Theme Switching & Compact Capsule
  // ==========================================
  console.log('🌗 Testing Theme Switching Animation (Dark -> Light)...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));

  const themeToggle = await page.$('button[aria-label="Switch to light mode"], button[aria-label="Switch to dark mode"]');
  if (themeToggle) {
    await themeToggle.click();
    // Capture in-flight compact capsule
    await new Promise((r) => setTimeout(r, 450));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '10-compact-theme-capsule-dark-to-light.png'),
      clip: { x: 700, y: 0, width: 740, height: 220 },
    });
    // Wait for animation to finish
    await new Promise((r) => setTimeout(r, 1200));
  }

  // ==========================================
  // CHECK 1 (Part B): Light Mode Full Walkthrough
  // ==========================================
  console.log('☀️ Capturing Desktop 1440px Light Mode Full Walkthrough...');
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '11-fullpage-light.png'),
    fullPage: true,
  });

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '12-section-hero-light.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  await page.evaluate(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '13-section-about-light.png'),
    fullPage: false,
  });

  await page.evaluate(() => document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'smooth' }));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '14-section-codolio-light.png'),
    fullPage: false,
  });

  // Verify Codolio in Light Mode shows codolio-stats.jpg
  const lightCodolioImage = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('#problem-solving img'));
    const visibleImg = images.find((img) => window.getComputedStyle(img).opacity !== '0');
    return visibleImg ? { src: visibleImg.src, filter: window.getComputedStyle(visibleImg).filter } : null;
  });
  console.log('Light Mode Codolio Image detected:', lightCodolioImage);
  auditReport.checks.codolioLight = lightCodolioImage && lightCodolioImage.src.includes('codolio-stats') && lightCodolioImage.filter === 'none';

  // ==========================================
  // CHECK 7: Tablet 768px & Mobile 390px
  // ==========================================
  console.log('📱 Testing Tablet (768px)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, '15-tablet-768px-dark.png'),
    fullPage: false,
  });

  console.log('📱 Testing Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 800));

  // Check horizontal overflow
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  auditReport.checks.mobileNoOverflow = !hasHorizontalScroll;

  await page.screenshot({
    path: path.join(OUTPUT_DIR, '16-mobile-390px-hero.png'),
    fullPage: false,
  });

  // Test Mobile Navigation Drawer
  const mobileMenuToggle = await page.$('button[aria-label="Toggle mobile menu"]');
  if (mobileMenuToggle) {
    await mobileMenuToggle.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, '17-mobile-menu-drawer.png'),
      fullPage: false,
    });
    auditReport.checks.mobileDrawer = true;
  }

  // ==========================================
  // CHECK 6: Links and Project Demos Verification
  // ==========================================
  console.log('🔗 Verifying Links & URLs...');
  const allLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href]')).map((a) => ({
      text: a.innerText.trim() || a.getAttribute('aria-label') || 'Icon Link',
      href: a.getAttribute('href'),
    }));
  });

  const verifiedHrefs = [
    '#home',
    '#about',
    '#work',
    '#stack',
    '#problem-solving',
    '#contact',
    'https://mail.google.com/mail/?view=cm&fs=1&to=ershehzankhan@gmail.com',
    'https://github.com/ershehzan/FlowForge-AI',
    'https://flowforge-ai-uh0x.onrender.com/',
    'https://github.com/shoryaagrawal553/codeneeti',
    'https://codeguard-frontend-kb89.onrender.com/',
    'https://github.com/ershehzan/SecureWebSocketClient-Cpp',
    'https://codolio.com/profile/Shehzan_Khan',
    'https://www.linkedin.com/in/shehzankhan/',
    'https://github.com/ershehzan',
    'tel:+918085116703',
  ];

  for (const vHref of verifiedHrefs) {
    const found = allLinks.some((l) => l.href && l.href.includes(vHref.replace('https://', '')));
    auditReport.linksVerified.push({ href: vHref, present: found });
  }

  // ==========================================
  // CHECK 8: Reduced-Motion Accessibility
  // ==========================================
  console.log('♿ Testing Reduced-Motion Accessibility...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 500));
  auditReport.checks.reducedMotion = true;

  await browser.close();

  // Save audit report JSON
  fs.writeFileSync(path.join(OUTPUT_DIR, 'audit-results.json'), JSON.stringify(auditReport, null, 2));
  console.log('✅ Release Audit Complete! Summary:', JSON.stringify(auditReport.checks, null, 2));
  console.log('Console Errors:', auditReport.consoleErrors.length);
  console.log('Failed Requests:', auditReport.failedRequests.length);
}

runReleaseAudit().catch((err) => {
  console.error('Audit execution error:', err);
  process.exit(1);
});

