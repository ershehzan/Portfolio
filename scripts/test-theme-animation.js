const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          height: 100vh;
          background: #0d0f12;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, sans-serif;
        }

        .portal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .portal-stage {
          position: relative;
          width: 420px;
          height: 130px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: background-color 0.4s ease, border-color 0.4s ease;
        }

        .portal-stage.dark {
          background: #14171d;
          border: 1px solid #282f3d;
        }

        .portal-stage.light {
          background: #f4efe6;
          border: 1px solid #ded5c5;
        }

        /* Ground track */
        .ground-track {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 30px;
          height: 2px;
          border-radius: 999px;
          transition: background 0.4s ease;
        }
        .portal-stage.dark .ground-track {
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05));
        }
        .portal-stage.light .ground-track {
          background: linear-gradient(90deg, rgba(0,0,0,0.05), rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05));
        }

        /* The Portal Hole */
        .portal-hole-wrapper {
          position: absolute;
          left: 210px;
          bottom: 20px;
          transform: translateX(-50%);
          width: 80px;
          height: 22px;
          z-index: 10;
        }

        .portal-hole {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          transition: all 0.4s ease;
        }

        .portal-stage.dark .portal-hole {
          background: radial-gradient(ellipse at center, #000 20%, #06090e 70%, #1a2230 100%);
          box-shadow: inset 0 4px 10px rgba(0,0,0,0.9), 0 0 15px rgba(197, 243, 106, 0.45);
          border: 1.5px solid rgba(197, 243, 106, 0.7);
        }

        .portal-stage.light .portal-hole {
          background: radial-gradient(ellipse at center, #18181b 30%, #27272a 70%, #52525b 100%);
          box-shadow: inset 0 4px 10px rgba(0,0,0,0.8), 0 0 15px rgba(245, 158, 11, 0.45);
          border: 1.5px solid rgba(245, 158, 11, 0.8);
        }

        /* Character wrapper container */
        .runner-container {
          position: absolute;
          bottom: 30px;
          left: 0;
          width: 100%;
          height: 60px;
          pointer-events: none;
          z-index: 20;
        }

        /* Keyframes for the full journey: Run -> Dive -> In-Portal -> Emerge -> Run Out */
        @keyframes characterJourney {
          0% {
            transform: translateX(10px) translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            transform: translateX(50px) translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          38% {
            transform: translateX(165px) translateY(0) scale(1) rotate(5deg);
            opacity: 1;
          }
          /* Dive down into the hole */
          46% {
            transform: translateX(190px) translateY(-14px) scale(0.95) rotate(45deg);
            opacity: 1;
          }
          54% {
            transform: translateX(205px) translateY(12px) scale(0.5) rotate(80deg);
            opacity: 0.1;
          }
          58% {
            transform: translateX(210px) translateY(24px) scale(0.1) rotate(90deg);
            opacity: 0;
          }
          /* Emerge from the hole */
          64% {
            transform: translateX(210px) translateY(12px) scale(0.3) rotate(-30deg);
            opacity: 0.3;
          }
          72% {
            transform: translateX(225px) translateY(-16px) scale(0.95) rotate(-15deg);
            opacity: 1;
          }
          80% {
            transform: translateX(245px) translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(380px) translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
        }

        .animated-character {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 34px;
          height: 52px;
          animation: characterJourney 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* SVG Limbs Running Animation */
        .arm-front {
          transform-origin: 17px 20px;
          animation: armSwing 0.25s ease-in-out infinite alternate;
        }
        .arm-back {
          transform-origin: 17px 20px;
          animation: armSwingBack 0.25s ease-in-out infinite alternate;
        }
        .leg-front {
          transform-origin: 17px 32px;
          animation: legSwing 0.25s ease-in-out infinite alternate;
        }
        .leg-back {
          transform-origin: 17px 32px;
          animation: legSwingBack 0.25s ease-in-out infinite alternate;
        }

        @keyframes armSwing {
          from { transform: rotate(-35deg); }
          to { transform: rotate(35deg); }
        }
        @keyframes armSwingBack {
          from { transform: rotate(35deg); }
          to { transform: rotate(-35deg); }
        }
        @keyframes legSwing {
          from { transform: rotate(40deg); }
          to { transform: rotate(-40deg); }
        }
        @keyframes legSwingBack {
          from { transform: rotate(-40deg); }
          to { transform: rotate(40deg); }
        }

        .dark-char {
          stroke: #C5F36A;
        }
        .dark-char circle {
          fill: #C5F36A;
        }
        .light-char {
          stroke: #18181b;
        }
        .light-char circle {
          fill: #18181b;
        }

        /* Status Label */
        .stage-label {
          position: absolute;
          top: 14px;
          left: 20px;
          font-size: 10px;
          font-family: monospace;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .portal-stage.dark .stage-label {
          color: #8892b0;
        }
        .portal-stage.light .stage-label {
          color: #71717a;
        }
      </style>
    </head>
    <body>
      <div class="portal-overlay">
        <div class="portal-stage dark" id="stage">
          <div class="stage-label">TRANSITIONING WORLD...</div>
          <div class="ground-track"></div>
          
          <div class="portal-hole-wrapper">
            <div class="portal-hole"></div>
          </div>

          <div class="runner-container">
            <div class="animated-character" id="char">
              <svg viewBox="0 0 34 52" width="34" height="52" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="dark-char">
                <!-- Head -->
                <circle cx="17" cy="9" r="4.5" />
                <!-- Torso -->
                <line x1="17" y1="14" x2="17" y2="32" />
                <!-- Arms -->
                <path class="arm-back" d="M17 20 L9 26" />
                <path class="arm-front" d="M17 20 L25 26" />
                <!-- Legs -->
                <path class="leg-back" d="M17 32 L11 46" />
                <path class="leg-front" d="M17 32 L23 46" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);

  // Let's capture at different stages of the animation
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'screenshots/anim-01-running.png' });

  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: 'screenshots/anim-02-diving.png' });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: 'screenshots/anim-03-emerging.png' });

  console.log('Animation frames captured!');
  await browser.close();
})();
