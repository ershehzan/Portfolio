const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function recordFullScreencast({ themeInitial, testName, viewport, durationMs = 2400 }) {
  console.log(`Recording ${testName}: initial=${themeInitial}, vp=${viewport.width}x${viewport.height}`);

  const outDir = path.join('C:/Portfolio/scratch/recordings_v2', testName);
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(`http://localhost:3000/?theme=${themeInitial}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  const toggleBtn = await page.$('button[aria-label*="Switch to"]');
  if (!toggleBtn) throw new Error('Toggle button not found');

  const client = await page.target().createCDPSession();
  let frameCount = 0;

  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    try {
      const buffer = Buffer.from(data, 'base64');
      const fName = `frame_${String(frameCount).padStart(4, '0')}.png`;
      fs.writeFileSync(path.join(outDir, fName), buffer);
      frameCount++;
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (e) {}
  });

  await client.send('Page.startScreencast', {
    format: 'png',
    quality: 100,
    everyNthFrame: 1
  });

  // Small pause to capture "before switch" state
  await new Promise(r => setTimeout(r, 200));

  // Click toggle
  await toggleBtn.click();

  // Record during full animation
  await new Promise(r => setTimeout(r, durationMs));

  await client.send('Page.stopScreencast');
  await new Promise(r => setTimeout(r, 250));
  await browser.close();

  console.log(`Finished ${testName}: ${frameCount} frames recorded`);
  return { frameCount, outDir };
}

(async () => {
  try {
    // 1. Desktop 1440x900 Dark to Light
    await recordFullScreencast({
      themeInitial: 'dark',
      testName: 'desktop_dark_to_light',
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 }
    });

    // 2. Desktop 1440x900 Light to Dark
    await recordFullScreencast({
      themeInitial: 'light',
      testName: 'desktop_light_to_dark',
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 }
    });

    // 3. Mobile 390x844 Dark to Light
    await recordFullScreencast({
      themeInitial: 'dark',
      testName: 'mobile_dark_to_light',
      viewport: { width: 390, height: 844, deviceScaleFactor: 2 }
    });

    // 4. Mobile 390x844 Light to Dark
    await recordFullScreencast({
      themeInitial: 'light',
      testName: 'mobile_light_to_dark',
      viewport: { width: 390, height: 844, deviceScaleFactor: 2 }
    });

    console.log('All 4 screencasts recorded successfully!');
  } catch (err) {
    console.error('Recording error:', err);
    process.exit(1);
  }
})();

