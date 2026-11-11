const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function recordTransition({ themeInitial, testName, viewport, durationMs = 1800 }) {
  console.log(`Starting recordTransition: ${testName} (initial theme: ${themeInitial}, viewport: ${viewport.width}x${viewport.height})`);

  const outDir = path.join('C:/Portfolio/scratch/recordings', testName);
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);

  // Load page with query param for deterministic initial theme
  await page.goto(`http://localhost:3000/?theme=${themeInitial}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Find toggle button
  const toggleBtn = await page.$('button[aria-label*="Switch to"]');
  if (!toggleBtn) {
    throw new Error('Theme toggle button not found!');
  }

  // Setup screencast via CDP
  const client = await page.target().createCDPSession();
  let frameCount = 0;
  const framePaths = [];

  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    try {
      const buffer = Buffer.from(data, 'base64');
      const fName = `frame_${String(frameCount).padStart(4, '0')}.png`;
      const fPath = path.join(outDir, fName);
      fs.writeFileSync(fPath, buffer);
      framePaths.push(fPath);
      frameCount++;
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (e) {
      // ignore frame ack error on finish
    }
  });

  await client.send('Page.startScreencast', {
    format: 'png',
    quality: 100,
    everyNthFrame: 1,
  });

  // Short pause before click
  await new Promise(r => setTimeout(r, 200));

  // Click toggle
  await toggleBtn.click();
  console.log(`Clicked toggle for ${testName}`);

  // Record during transition
  await new Promise(r => setTimeout(r, durationMs));

  // Stop screencast
  await client.send('Page.stopScreencast');
  await new Promise(r => setTimeout(r, 300));

  await browser.close();
  console.log(`Recorded ${frameCount} frames for ${testName}`);
  return { frameCount, outDir };
}

(async () => {
  try {
    // 1. Dark to Light (Desktop 1280x720)
    await recordTransition({
      themeInitial: 'dark',
      testName: 'dark_to_light_desktop',
      viewport: { width: 1280, height: 720, deviceScaleFactor: 1 }
    });

    // 2. Light to Dark (Desktop 1280x720)
    await recordTransition({
      themeInitial: 'light',
      testName: 'light_to_dark_desktop',
      viewport: { width: 1280, height: 720, deviceScaleFactor: 1 }
    });

    // 3. Mobile (390x844) Dark to Light
    await recordTransition({
      themeInitial: 'dark',
      testName: 'dark_to_light_mobile',
      viewport: { width: 390, height: 844, deviceScaleFactor: 2 }
    });

    console.log('All transitions recorded successfully!');
  } catch (err) {
    console.error('Error during recording:', err);
    process.exit(1);
  }
})();

