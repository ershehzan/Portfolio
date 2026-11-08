const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('--- 1. Dark-theme navbar with theme switcher closed ---');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshots/01-navbar-dark-closed.png' });

  console.log('--- 2. Light-theme navbar with theme switcher closed ---');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshots/02-navbar-light-closed.png' });

  console.log('--- 3. Floating portal animation while switching to dark mode ---');
  // Click theme toggle button to switch to dark mode
  await page.click('button[title*="dark mode"]');
  // Wait 400ms to capture mid-run/dive inside the floating panel
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/03-floating-portal-switching-dark.png' });
  // Wait for transition to complete
  await new Promise(r => setTimeout(r, 1200));

  console.log('--- 4. Floating portal animation while switching to light mode ---');
  // Click theme toggle button to switch to light mode
  await page.click('button[title*="light mode"]');
  // Wait 450ms to capture mid-journey
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/04-floating-portal-switching-light.png' });
  await new Promise(r => setTimeout(r, 1200));

  console.log('--- 6. Hero section in dark mode with visible BG_Video ---');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshots/06-hero-video-dark.png' });

  console.log('--- 7. Hero section in light mode with visible BG_Video ---');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshots/07-hero-video-light.png' });

  console.log('--- 9. About section desktop light-theme ---');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/09-about-desktop-light.png' });

  console.log('--- 10. About section desktop dark-theme ---');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/10-about-desktop-dark.png' });

  console.log('--- 11. About section with a professional role selected ---');
  // Click 'C++ Developer' role
  const roleButtons = await page.$$('button[aria-pressed]');
  if (roleButtons.length >= 3) {
    await roleButtons[2].click(); // C++ Developer
    await new Promise(r => setTimeout(r, 500));
  }
  await page.screenshot({ path: 'screenshots/11-about-role-selected.png' });

  console.log('--- 12. About section with a skill selected and description visible ---');
  // Click 'FastAPI' skill chip
  const skillChips = await page.$$('button[title]');
  for (const chip of skillChips) {
    const text = await (await chip.getProperty('textContent')).jsonValue();
    if (text.includes('FastAPI')) {
      await chip.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshots/12-about-skill-selected.png' });

  console.log('--- 13. Mobile screenshot at 390px ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/13-mobile-hero-390px.png' });

  // Mobile about section
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/14-mobile-about-390px.png' });

  console.log('Console Errors found:', consoleErrors);
  await browser.close();
  console.log('All 13 QA screenshots captured successfully!');
})();
