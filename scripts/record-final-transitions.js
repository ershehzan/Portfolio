const puppeteer = require('puppeteer');
const fs = require('fs');
const sharp = require('sharp');
const { GIFEncoder, quantize, applyPalette } = require('gifenc');

async function createGifFromFrames(frameBuffers, outputPath, width = 720, height = 450, delay = 65) {
  const gif = GIFEncoder();
  console.log(`Encoding GIF with ${frameBuffers.length} frames to ${outputPath}...`);

  for (let i = 0; i < frameBuffers.length; i++) {
    const { data, info } = await sharp(frameBuffers[i])
      .resize(width, height, { fit: 'contain', background: { r: 14, g: 18, b: 23, alpha: 1 } })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, info.width, info.height, { palette, delay });
  }

  gif.finish();
  fs.writeFileSync(outputPath, Buffer.from(gif.bytes()));
  console.log(`Saved GIF: ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('=== 1. RECORDING LIGHT TO DARK TRANSITION ===');
  // Initialize to light mode using localStorage directly before navigation
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  const l2dFrames = [];

  // Frame 0: Light mode before click
  l2dFrames.push(await page.screenshot());
  await page.screenshot({ path: 'screenshots/final-01-light-before.png' });

  // Click toggle
  await page.click('button[title*="dark mode"]');

  // Capture 21 frames across the 1.35 second interaction (approx 65ms per frame)
  for (let i = 1; i <= 21; i++) {
    await new Promise(r => setTimeout(r, 65));
    const buf = await page.screenshot();
    l2dFrames.push(buf);

    if (i === 3) await page.screenshot({ path: 'screenshots/final-02-opening.png' });
    if (i === 6) await page.screenshot({ path: 'screenshots/final-03-walking.png' });
    if (i === 9) await page.screenshot({ path: 'screenshots/final-04-diving.png' });
    if (i === 11) await page.screenshot({ path: 'screenshots/final-05-submerged-theme-swap.png' });
    if (i === 13) await page.screenshot({ path: 'screenshots/final-06-emerging.png' });
    if (i === 17) await page.screenshot({ path: 'screenshots/final-07-arriving-moon.png' });
  }

  // Final dark mode completed
  await new Promise(r => setTimeout(r, 120));
  l2dFrames.push(await page.screenshot());
  await page.screenshot({ path: 'screenshots/final-08-dark-complete.png' });

  // Encode Light -> Dark recording
  await createGifFromFrames(l2dFrames, 'screenshots/recording-light-to-dark.gif', 720, 450, 65);

  console.log('\n=== 2. TEST THEME PERSISTENCE AFTER REFRESH ===');
  console.log('Reloading page to test dark mode persistence...');
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  const isDarkAfterReload = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
  console.log(`Document has 'dark' class after reload: ${isDarkAfterReload}`);
  console.log(`localStorage 'theme' value: ${storedTheme}`);

  console.log('\n=== 3. RECORDING DARK TO LIGHT TRANSITION ===');
  const d2lFrames = [];
  d2lFrames.push(await page.screenshot());
  await page.screenshot({ path: 'screenshots/final-09-dark-before.png' });

  // Click toggle to switch back to light
  await page.click('button[title*="light mode"]');

  for (let i = 1; i <= 21; i++) {
    await new Promise(r => setTimeout(r, 65));
    const buf = await page.screenshot();
    d2lFrames.push(buf);

    if (i === 3) await page.screenshot({ path: 'screenshots/final-10-d2l-opening.png' });
    if (i === 6) await page.screenshot({ path: 'screenshots/final-11-d2l-walking.png' });
    if (i === 9) await page.screenshot({ path: 'screenshots/final-12-d2l-diving.png' });
    if (i === 11) await page.screenshot({ path: 'screenshots/final-13-d2l-submerged-swap.png' });
    if (i === 13) await page.screenshot({ path: 'screenshots/final-14-d2l-emerging.png' });
    if (i === 17) await page.screenshot({ path: 'screenshots/final-15-d2l-arriving-sun.png' });
  }

  await new Promise(r => setTimeout(r, 120));
  d2lFrames.push(await page.screenshot());
  await page.screenshot({ path: 'screenshots/final-16-d2l-light-complete.png' });

  await createGifFromFrames(d2lFrames, 'screenshots/recording-dark-to-light.gif', 720, 450, 65);

  console.log('\n=== 4. TEST THEME PERSISTENCE FOR LIGHT MODE ===');
  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  const isLightAfterReload = await page.evaluate(() => !document.documentElement.classList.contains('dark'));
  const storedLight = await page.evaluate(() => localStorage.getItem('theme'));
  console.log(`Document is light mode after reload: ${isLightAfterReload}`);
  console.log(`localStorage value: ${storedLight}`);

  console.log('\n=== 5. RAPID CLICKING STRESS TEST ===');
  console.log('Attempting 5 rapid clicks on the theme toggle within 200ms...');
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      const btn = document.querySelector('button[title*="mode"]');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 40));
  }
  // Wait for the animation to safely resolve
  await new Promise(r => setTimeout(r, 1500));
  const transitionActive = await page.evaluate(() => {
    return !!document.querySelector('[aria-label="Theme transition in progress"]');
  });
  console.log(`Theme transition resolved cleanly (is portal closed?): ${!transitionActive}`);

  console.log('\n=== 6. MOBILE RESPONSIVE TEST (390px) ===');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  await page.click('button[title*="mode"]');
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/final-17-mobile-390px-midpoint.png' });

  console.log('\nConsole Errors:', consoleErrors);
  await browser.close();
  console.log('\nAll screen recordings and stress tests completed successfully!');
})();
