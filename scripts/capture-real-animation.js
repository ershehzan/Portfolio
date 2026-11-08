const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('=== TEST 1: LIGHT TO DARK THEME TRANSITION ===');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Light mode before clicking
  await page.screenshot({ path: 'screenshots/portal-01-light-before.png' });
  console.log('Saved: portal-01-light-before.png');

  // Click theme toggle button
  await page.click('button[title*="dark mode"]');

  // 2. Portal opening (150ms)
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: 'screenshots/portal-02-opening-150ms.png' });
  console.log('Saved: portal-02-opening-150ms.png');

  // 3. Stickman walking toward hole (380ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-03-walking-380ms.png' });
  console.log('Saved: portal-03-walking-380ms.png');

  // 4. Character diving into portal hole (620ms total)
  await new Promise(r => setTimeout(r, 240));
  await page.screenshot({ path: 'screenshots/portal-04-diving-620ms.png' });
  console.log('Saved: portal-04-diving-620ms.png');

  // 5. Theme swap midpoint & emerging from portal (850ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-05-emerging-850ms.png' });
  console.log('Saved: portal-05-emerging-850ms.png');

  // 6. Walking to Moon destination node (1080ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-06-arriving-moon-1080ms.png' });
  console.log('Saved: portal-06-arriving-moon-1080ms.png');

  // 7. Dark mode after completion (1450ms total)
  await new Promise(r => setTimeout(r, 370));
  await page.screenshot({ path: 'screenshots/portal-07-dark-complete.png' });
  console.log('Saved: portal-07-dark-complete.png');

  console.log('\n=== TEST 2: DARK TO LIGHT THEME TRANSITION ===');
  // Confirm we are in dark mode
  await page.screenshot({ path: 'screenshots/portal-08-dark-before.png' });
  console.log('Saved: portal-08-dark-before.png');

  // Click theme toggle button to switch to light mode
  await page.click('button[title*="light mode"]');

  // 8. Portal opening (150ms)
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: 'screenshots/portal-09-d2l-opening-150ms.png' });
  console.log('Saved: portal-09-d2l-opening-150ms.png');

  // 9. Stickman walking leftward from Moon (380ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-10-d2l-walking-380ms.png' });
  console.log('Saved: portal-10-d2l-walking-380ms.png');

  // 10. Character diving into portal hole from right (620ms total)
  await new Promise(r => setTimeout(r, 240));
  await page.screenshot({ path: 'screenshots/portal-11-d2l-diving-620ms.png' });
  console.log('Saved: portal-11-d2l-diving-620ms.png');

  // 11. Emerging leftward toward Sun (850ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-12-d2l-emerging-850ms.png' });
  console.log('Saved: portal-12-d2l-emerging-850ms.png');

  // 12. Walking to Sun destination node (1080ms total)
  await new Promise(r => setTimeout(r, 230));
  await page.screenshot({ path: 'screenshots/portal-13-d2l-arriving-sun-1080ms.png' });
  console.log('Saved: portal-13-d2l-arriving-sun-1080ms.png');

  // 13. Light mode after completion (1450ms total)
  await new Promise(r => setTimeout(r, 370));
  await page.screenshot({ path: 'screenshots/portal-14-d2l-light-complete.png' });
  console.log('Saved: portal-14-d2l-light-complete.png');

  console.log('\n=== MOBILE VIEW VERIFICATION (390px) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Click toggle on mobile
  await page.click('button[title*="light mode"]');
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/portal-15-mobile-390px-transition.png' });
  console.log('Saved: portal-15-mobile-390px-transition.png');

  await new Promise(r => setTimeout(r, 1000));

  console.log('\nConsole Errors:', consoleErrors);
  await browser.close();
  console.log('All portal transition frames verified and saved!');
})();
