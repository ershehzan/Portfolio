const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 600, height: 400, deviceScaleFactor: 2 });

  // Load the test canvas portal
  await page.goto(`file:///${__dirname}/test-canvas-portal.html`.replace(/\\/g, '/'), { waitUntil: 'load' }).catch(async () => {
    // If html doesn't exist on disk, we will create it below
  });

  await browser.close();
})();

