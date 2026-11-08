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
          background: #0B0E0C;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: -apple-system, sans-serif;
        }

        .portal-capsule {
          position: relative;
          width: 500px;
          height: 160px;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
          transition: background-color 0.4s ease, border-color 0.4s ease;
          border: 1px solid #282f3a;
          background: #12151b;
        }

        .portal-capsule.light {
          background: #f4efe6;
          border-color: #ded5c5;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        /* Ambient glow */
        .portal-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 50% 65%, rgba(197, 243, 106, 0.15) 0%, transparent 60%);
        }

        /* Top header label */
        .capsule-header {
          position: absolute;
          top: 14px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #C5F36A;
        }
        .portal-capsule.light .capsule-header {
          color: #855b18;
        }

        /* Ground track */
        .ground-line {
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 38px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.08));
        }
        .portal-capsule.light .ground-line {
          background: linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.06));
        }

        /* Sun button (left) */
        .sun-node {
          position: absolute;
          left: 36px;
          bottom: 24px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #222731;
          border: 1px solid #374151;
          color: #f59e0b;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
          transition: all 0.3s;
        }
        .sun-node.active {
          background: #fef3c7;
          border-color: #f59e0b;
          color: #d97706;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
          transform: scale(1.1);
        }

        /* Moon button (right) */
        .moon-node {
          position: absolute;
          right: 36px;
          bottom: 24px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1e26;
          border: 1px solid #2d3748;
          color: #94a3b8;
          transition: all 0.3s;
        }
        .moon-node.active {
          background: #17201c;
          border-color: #C5F36A;
          color: #C5F36A;
          box-shadow: 0 0 20px rgba(197, 243, 106, 0.6);
          transform: scale(1.1);
        }

        /* 3D Portal Hole (center) */
        .portal-hole-container {
          position: absolute;
          left: 50%;
          bottom: 26px;
          transform: translateX(-50%);
          width: 90px;
          height: 26px;
          z-index: 10;
        }
        .portal-hole-depth {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, #000000 30%, #06090d 75%, #111822 100%);
          border: 2px solid #C5F36A;
          box-shadow: inset 0 6px 14px rgba(0,0,0,0.95), 0 0 25px rgba(197, 243, 106, 0.6);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .portal-capsule.light .portal-hole-depth {
          background: radial-gradient(ellipse at center, #0a0a0c 30%, #1e1e24 75%, #3b3b44 100%);
          border-color: #d97706;
          box-shadow: inset 0 6px 14px rgba(0,0,0,0.95), 0 0 25px rgba(217, 119, 6, 0.5);
        }

        /* Stick figure container */
        .stickman-actor {
          position: absolute;
          bottom: 39px;
          left: 0;
          width: 32px;
          height: 48px;
          z-index: 20;
          pointer-events: none;
        }

        /* Authentic SVG limbs walking keyframes */
        .svg-arm-left {
          transform-origin: 16px 18px;
          animation: armSwingL 0.28s ease-in-out infinite alternate;
        }
        .svg-arm-right {
          transform-origin: 16px 18px;
          animation: armSwingR 0.28s ease-in-out infinite alternate;
        }
        .svg-leg-left {
          transform-origin: 16px 28px;
          animation: legSwingL 0.28s ease-in-out infinite alternate;
        }
        .svg-leg-right {
          transform-origin: 16px 28px;
          animation: legSwingR 0.28s ease-in-out infinite alternate;
        }
        .svg-body {
          animation: bodyBob 0.14s ease-in-out infinite alternate;
        }

        @keyframes armSwingL {
          from { transform: rotate(-40deg); }
          to { transform: rotate(40deg); }
        }
        @keyframes armSwingR {
          from { transform: rotate(40deg); }
          to { transform: rotate(-40deg); }
        }
        @keyframes legSwingL {
          from { transform: rotate(45deg); }
          to { transform: rotate(-45deg); }
        }
        @keyframes legSwingR {
          from { transform: rotate(-45deg); }
          to { transform: rotate(45deg); }
        }
        @keyframes bodyBob {
          from { transform: translateY(0); }
          to { transform: translateY(-2px); }
        }

        /* Journey: Light to Dark */
        @keyframes journeyLtoD {
          /* 1. Walk from sun to portal */
          0% {
            transform: translateX(45px) translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          8% {
            transform: translateX(70px) translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          38% {
            transform: translateX(195px) translateY(0) scale(1) rotate(6deg);
            opacity: 1;
          }
          /* 2. Jump and dive into portal */
          44% {
            transform: translateX(225px) translateY(-16px) scale(0.95) rotate(45deg);
            opacity: 1;
          }
          50% {
            transform: translateX(240px) translateY(8px) scale(0.55) rotate(75deg);
            opacity: 0.3;
          }
          54% {
            transform: translateX(245px) translateY(24px) scale(0.08) rotate(90deg);
            opacity: 0;
          }
          /* 3. Emerge from other side of portal */
          60% {
            transform: translateX(255px) translateY(14px) scale(0.35) rotate(-35deg);
            opacity: 0.35;
          }
          68% {
            transform: translateX(275px) translateY(-18px) scale(0.95) rotate(-12deg);
            opacity: 1;
          }
          74% {
            transform: translateX(295px) translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          /* 4. Complete walk to moon */
          92% {
            transform: translateX(420px) translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(435px) translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
        }

        .animate-l-to-d {
          animation: journeyLtoD 2.2s cubic-bezier(0.35, 0, 0.25, 1) forwards;
        }
      </style>
    </head>
    <body>
      <div class="portal-capsule" id="capsule">
        <div class="portal-glow"></div>
        <div class="capsule-header">
          <span>● ENTERING DARK MODE</span>
          <span>PORTAL SHIFT</span>
        </div>

        <div class="ground-line"></div>

        <!-- Sun Node (Left) -->
        <div class="sun-node">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>

        <!-- Moon Node (Right) -->
        <div class="moon-node active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>

        <!-- Center 3D Portal -->
        <div class="portal-hole-container">
          <div class="portal-hole-depth"></div>
        </div>

        <!-- Animated Stickman Actor -->
        <div class="stickman-actor animate-l-to-d">
          <svg viewBox="0 0 32 48" width="32" height="48" fill="none" stroke="#C5F36A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" class="svg-body">
            <!-- Head with neck -->
            <circle cx="16" cy="7.5" r="4.5" fill="#C5F36A" />
            <!-- Torso -->
            <line x1="16" y1="12" x2="16" y2="27" />
            <!-- Animated Arms -->
            <path class="svg-arm-left" d="M16 17 L9 23" />
            <path class="svg-arm-right" d="M16 17 L23 23" />
            <!-- Animated Legs -->
            <path class="svg-leg-left" d="M16 27 L10 41" />
            <path class="svg-leg-right" d="M16 27 L22 41" />
          </svg>
        </div>
      </div>
    </body>
    </html>
  `);

  // Capture walking
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'screenshots/test-portal-01-walking.png' });

  // Capture diving
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'screenshots/test-portal-02-diving.png' });

  // Capture emerging
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshots/test-portal-03-emerging.png' });

  console.log('Portal tests captured!');
  await browser.close();
})();
