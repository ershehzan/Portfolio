const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  // 1. Desktop 1440px
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const desktopBoxes = await page.evaluate(() => {
    const brand = document.querySelector('header a[href="#home"]').getBoundingClientRect();
    const nav = document.querySelector('header nav').getBoundingClientRect();
    const toggle = document.querySelector('header button[aria-label*="Switch to"]').getBoundingClientRect();
    const letsTalk = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const header = document.querySelector('header').getBoundingClientRect();
    return {
      header: { top: header.top, height: header.height },
      brand: { left: brand.left, right: brand.right, top: brand.top, height: brand.height },
      nav: { left: nav.left, right: nav.right, top: nav.top, height: nav.height },
      toggle: { left: toggle.left, right: toggle.right, top: toggle.top, height: toggle.height },
      letsTalk: { left: letsTalk.left, right: letsTalk.right, top: letsTalk.top, height: letsTalk.height }
    };
  });
  console.log('Desktop 1440px:\n', JSON.stringify(desktopBoxes, null, 2));

  // 2. Mobile 390px
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const mobileBoxes = await page.evaluate(() => {
    const brand = document.querySelector('header a[href="#home"]').getBoundingClientRect();
    const toggle = document.querySelector('header button[aria-label*="Switch to"]').getBoundingClientRect();
    const letsTalk = document.querySelector('header a[href*="mail.google.com"]').getBoundingClientRect();
    const menuBtn = document.querySelector('header button[aria-label="Toggle mobile menu"]').getBoundingClientRect();
    const header = document.querySelector('header').getBoundingClientRect();
    return {
      header: { top: header.top, height: header.height },
      brand: { left: brand.left, right: brand.right, top: brand.top, height: brand.height },
      toggle: { left: toggle.left, right: toggle.right, top: toggle.top, height: toggle.height },
      letsTalk: { left: letsTalk.left, right: letsTalk.right, top: letsTalk.top, height: letsTalk.height },
      menuBtn: { left: menuBtn.left, right: menuBtn.right, top: menuBtn.top, height: menuBtn.height }
    };
  });
  console.log('Mobile 390px:\n', JSON.stringify(mobileBoxes, null, 2));

  await browser.close();
})();

