const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 400 });
  const logos = [
    { file: 'cpp.png', name: 'C++ — C++17', badge: 'C++17', bg: '#ffffff' },
    { file: 'python.png', name: 'Python', badge: '3.10+', bg: '#ffffff' },
    { file: 'fastapi.png', name: 'FastAPI', badge: 'v0.121', bg: '#ffffff' },
    { file: 'winsock.png', name: 'Winsock & OpenSSL', badge: 'RFC 6455', bg: '#ffffff' },
    { file: 'sql.png', name: 'SQL', badge: 'Relational', bg: '#ffffff' },
    { file: 'docker.png', name: 'Docker', badge: 'Container', bg: '#ffffff' },
    { file: 'git-github.png', name: 'Git & GitHub', badge: '150+ Commits', bg: '#ffffff' },
    { file: 'codolio.png', name: 'Codolio / DSA', badge: '1,335+', bg: '#ffffff' }
  ];
  const b64 = {};
  for (const l of logos) {
    b64[l.file] = 'data:image/png;base64,' + fs.readFileSync('public/assets/logos/' + l.file).toString('base64');
  }
  await page.setContent(`
    <html>
      <body style="font-family: -apple-system, sans-serif; padding: 40px; background: #0e1615; color: #fff;">
        <h3 style="color: #888; font-size: 13px; font-family: monospace; letter-spacing: 2px;">APP TILES MATCHING STACK.PNG</h3>
        <div style="display: flex; gap: 24px; margin-top: 20px;">
          ${logos.map(l => `
            <div style="display: flex; flex-direction: column; align-items: center; width: 85px;">
              <div style="position: relative; width: 72px; height: 72px; background: #ffffff; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; padding: 12px;">
                <span style="position: absolute; top: -6px; right: -6px; background: #ef4444; color: #ffffff; font-size: 9px; font-weight: bold; font-family: monospace; padding: 2px 6px; border-radius: 999px; border: 2px solid #0e1615; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">${l.badge}</span>
                <img src="${b64[l.file]}" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
              <span style="font-size: 11px; margin-top: 10px; font-weight: 600; color: #e5e5e5; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 85px;">${l.name}</span>
            </div>
          `).join('')}
        </div>
      </body>
    </html>
  `);
  await page.screenshot({ path: 'screenshots/app-tiles-preview.png' });
  await browser.close();
  console.log('App tiles preview captured!');
})();
