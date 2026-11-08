const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.goto('file:///C:/Portfolio/public/videos/BG_Video.mp4');
  await new Promise(r => setTimeout(r, 1000));
  const meta = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { width: v.videoWidth, height: v.videoHeight, duration: v.duration } : null;
  });
  console.log('Video metadata:', meta);
  await page.screenshot({ path: 'screenshots/bg-video-frame.png' });
  await browser.close();
})();
