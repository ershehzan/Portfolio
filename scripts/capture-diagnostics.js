const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Testing Light to Dark...');
  await page.goto('http://localhost:3000/?theme=light', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: 'screenshots/diag-01-light-before.png' });

  // Click toggle
  await page.click('button[title*="dark mode"]');

  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: 'screenshots/diag-02-150ms-opening.png' });

  await new Promise(r => setTimeout(r, 250)); // 400ms total
  await page.screenshot({ path: 'screenshots/diag-03-400ms-walking.png' });

  await new Promise(r => setTimeout(r, 250)); // 650ms total
  await page.screenshot({ path: 'screenshots/diag-04-650ms-portal-entry.png' });

  await new Promise(r => setTimeout(r, 300)); // 950ms total
  await page.screenshot({ path: 'screenshots/diag-05-950ms-emerging.png' });

  await new Promise(r => setTimeout(r, 300)); // 1250ms total
  await page.screenshot({ path: 'screenshots/diag-06-1250ms-finishing.png' });

  await new Promise(r => setTimeout(r, 300)); // 1550ms total
  await page.screenshot({ path: 'screenshots/diag-07-1550ms-dark-complete.png' });

  console.log('Testing Dark to Light...');
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/diag-08-dark-before.png' });

  await page.click('button[title*="light mode"]');

  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: 'screenshots/diag-09-d2l-150ms-opening.png' });

  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: 'screenshots/diag-10-d2l-400ms-walking.png' });

  await new Promise(r => setTimeout(r, 250));
  await page.screenshot({ path: 'screenshots/diag-11-d2l-650ms-portal-entry.png' });

  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: 'screenshots/diag-12-d2l-950ms-emerging.png' });

  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/diag-13-d2l-1400ms-light-complete.png' });

  await browser.close();
  console.log('Current diagnostics captured!');
})();
