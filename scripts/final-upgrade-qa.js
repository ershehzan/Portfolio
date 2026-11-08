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

  console.log('--- 1. Testing Dark Mode Hero with BG Video ---');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // Verify video is playing
  const videoPlaying = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v && !v.paused && v.readyState >= 2 && v.videoWidth > 0;
  });
  console.log('Dark mode background video playing:', videoPlaying);
  await page.screenshot({ path: 'screenshots/01-hero-video-dark.png' });

  console.log('--- 2. Testing Light Mode Hero with BG Video ---');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'screenshots/01-hero-video-light.png' });

  console.log('--- 3. Testing About Section Portrait Framing ---');
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/03-about-portrait-color.png' });

  console.log('--- 4. Testing Stack Section with Logos & SQL ---');
  await page.evaluate(() => {
    document.getElementById('stack')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/04-stack-logos-sql.png' });

  console.log('--- 5. Testing Problem Solving Section ---');
  await page.evaluate(() => {
    document.getElementById('problem-solving')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/05-problem-solving.png' });

  console.log('--- 6. Testing Footer with Email & Phone ---');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/06-footer-contact.png' });

  console.log('--- 7. Testing Theme Transition Animation (Light to Dark) ---');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  // Click theme toggle
  await page.click('button[title*="dark mode"]');
  // Wait 400ms to capture mid-dive
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/02-anim-light-to-dark.png' });

  // Wait for transition to complete
  await new Promise(r => setTimeout(r, 1200));

  console.log('--- 8. Testing Theme Transition Animation (Dark to Light) ---');
  // Click theme toggle again
  await page.click('button[title*="light mode"]');
  // Wait 450ms to capture mid-journey
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/02-anim-dark-to-light.png' });
  await new Promise(r => setTimeout(r, 1200));

  console.log('--- 9. Testing Mobile 390px Homepage ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/07-mobile-homepage-390px.png' });

  // Mobile about section
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/08-mobile-about-390px.png' });

  // Mobile footer
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshots/09-mobile-footer-390px.png' });

  console.log('Console Errors found:', consoleErrors);
  await browser.close();
  console.log('All QA screenshots captured successfully!');
})();
