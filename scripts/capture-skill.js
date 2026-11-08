const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:3000/?theme=dark', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const chips = await page.$$('button[title]');
  for (const c of chips) {
    const txt = await (await c.getProperty('textContent')).jsonValue();
    if (txt.includes('FastAPI')) {
      await c.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/12-about-skill-selected.png' });
  await browser.close();
  console.log('Skill detail screenshot updated!');
})();
