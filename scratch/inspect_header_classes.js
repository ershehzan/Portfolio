const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Evaluate the exact styles and positioning
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const container = header.querySelector('div');
    const toggleContainer = document.querySelector('header button[aria-label*="Switch to"]').parentElement;
    return {
      headerClasses: header.className,
      containerClasses: container.className,
      toggleContainerClasses: toggleContainer.className,
    };
  });
  console.log('Header info:', headerInfo);

  await browser.close();
})();

