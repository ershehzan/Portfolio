const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

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
        }
        .capsule {
          position: relative;
          width: 460px;
          height: 136px;
          border-radius: 32px;
          background: #111419;
          border: 1px solid #232a36;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08);
          overflow: hidden;
        }
        canvas {
          width: 460px;
          height: 136px;
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="capsule">
        <canvas id="stage" width="920" height="272"></canvas>
      </div>

      <script>
        const canvas = document.getElementById('stage');
        const ctx = canvas.getContext('2d');
        const dpr = 2;
        ctx.scale(dpr, dpr);

        const WIDTH = 460;
        const HEIGHT = 136;
        const GROUND_Y = 94;
        const PORTAL_X = 230;
        const PORTAL_Y = 94;
        const SUN_X = 65;
        const MOON_X = 395;

        // Particle system for portal entry/exit
        const particles = [];

        function spawnParticles(x, y, count, upward = false) {
          for (let i = 0; i < count; i++) {
            particles.push({
              x: x + (Math.random() - 0.5) * 20,
              y: y + (Math.random() - 0.5) * 6,
              vx: (Math.random() - 0.5) * 2.5,
              vy: upward ? -(Math.random() * 2 + 1) : (Math.random() * 2 - 1),
              alpha: 1,
              size: Math.random() * 2 + 1.5,
              life: 1
            });
          }
        }

        function updateParticles(dt) {
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= dt * 2;
            if (p.alpha <= 0) {
              particles.splice(i, 1);
            }
          }
        }

        function drawParticles() {
          for (const p of particles) {
            ctx.fillStyle = \`rgba(197, 243, 106, \${Math.max(0, p.alpha)})\`;
            ctx.shadowColor = '#C5F36A';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Draw Ambient Track & Nodes
        function drawStage(isSwapped, direction) {
          // 1. Soft track
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(50, GROUND_Y);
          ctx.lineTo(WIDTH - 50, GROUND_Y);
          ctx.stroke();

          // 2. Sun Node on Left (x=65, y=78)
          const sunActive = isSwapped && direction === 'dark-to-light' || (!isSwapped && direction === 'light-to-dark');
          drawSunNode(SUN_X, 78, !isSwapped);

          // 3. Moon Node on Right (x=395, y=78)
          drawMoonNode(MOON_X, 78, isSwapped);

          // 4. Center 3D Portal Hole
          drawPortalHole(PORTAL_X, PORTAL_Y);
        }

        function drawSunNode(x, y, active) {
          // Disc background
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, Math.PI * 2);
          ctx.fillStyle = active ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.04)';
          ctx.fill();
          ctx.strokeStyle = active ? 'rgba(245, 158, 11, 0.6)' : 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Sun Icon
          ctx.strokeStyle = active ? '#F59E0B' : '#71717a';
          ctx.fillStyle = active ? '#F59E0B' : 'transparent';
          ctx.lineWidth = 1.8;
          ctx.shadowColor = active ? 'rgba(245, 158, 11, 0.7)' : 'transparent';
          ctx.shadowBlur = active ? 10 : 0;

          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.stroke();

          // Sun rays
          const rayLength = 3.5;
          const rayOffset = 9;
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x1 = x + Math.cos(angle) * rayOffset;
            const y1 = y + Math.sin(angle) * rayOffset;
            const x2 = x + Math.cos(angle) * (rayOffset + rayLength);
            const y2 = y + Math.sin(angle) * (rayOffset + rayLength);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
        }

        function drawMoonNode(x, y, active) {
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, Math.PI * 2);
          ctx.fillStyle = active ? 'rgba(197, 243, 106, 0.15)' : 'rgba(255, 255, 255, 0.04)';
          ctx.fill();
          ctx.strokeStyle = active ? 'rgba(197, 243, 106, 0.6)' : 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Crescent Moon Icon
          ctx.strokeStyle = active ? '#C5F36A' : '#71717a';
          ctx.fillStyle = active ? '#C5F36A' : '#71717a';
          ctx.shadowColor = active ? 'rgba(197, 243, 106, 0.7)' : 'transparent';
          ctx.shadowBlur = active ? 10 : 0;

          ctx.save();
          ctx.translate(x - 1, y);
          ctx.beginPath();
          // Crescent shape
          ctx.arc(0, 0, 7, -Math.PI * 0.45, Math.PI * 0.45, false);
          ctx.arc(-3, 0, 6, Math.PI * 0.35, -Math.PI * 0.35, true);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          ctx.shadowBlur = 0;
        }

        function drawPortalHole(cx, cy) {
          const rx = 44;
          const ry = 12;

          // 1. Ambient outer glow beneath hole
          const glowGrad = ctx.createRadialGradient(cx, cy + 4, 10, cx, cy + 4, 60);
          glowGrad.addColorStop(0, 'rgba(197, 243, 106, 0.22)');
          glowGrad.addColorStop(1, 'rgba(197, 243, 106, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.ellipse(cx, cy + 4, 60, 20, 0, 0, Math.PI * 2);
          ctx.fill();

          // 2. Void depth fill (true subterranean hole)
          const voidGrad = ctx.createRadialGradient(cx, cy + 5, 0, cx, cy, rx);
          voidGrad.addColorStop(0, '#000000');
          voidGrad.addColorStop(0.7, '#04070a');
          voidGrad.addColorStop(1, '#0c131a');

          ctx.fillStyle = voidGrad;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.fill();

          // 3. Inner shadow rim for deep 3D perspective
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(cx, cy + 1, rx - 2, ry - 1, 0, Math.PI, Math.PI * 2); // top inner shadow
          ctx.stroke();

          // 4. Glowing neon outer rim
          ctx.strokeStyle = '#C5F36A';
          ctx.lineWidth = 2;
          ctx.shadowColor = 'rgba(197, 243, 106, 0.85)';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Draw animated stickman with realistic limbs and kinematics
        function drawStickman(x, y, scale, rotation, walkCycle, diveMode) {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          ctx.rotate(rotation);

          ctx.strokeStyle = '#C5F36A';
          ctx.fillStyle = '#C5F36A';
          ctx.lineWidth = 2.4;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = 'rgba(197, 243, 106, 0.6)';
          ctx.shadowBlur = 6;

          const headR = 4.2;
          let headX = 0, headY = -34;
          let neckX = 0, neckY = -27;
          let pelvisX = 0, pelvisY = -14;

          let leftArmAngle = 0;
          let rightArmAngle = 0;
          let leftLegAngle = 0;
          let rightLegAngle = 0;
          let leftKneeAngle = 0;
          let rightKneeAngle = 0;

          if (diveMode === 'dive') {
            // Streamlined diver pose
            leftArmAngle = -Math.PI * 0.85;
            rightArmAngle = -Math.PI * 0.82;
            leftLegAngle = Math.PI * 0.1;
            rightLegAngle = Math.PI * 0.08;
            leftKneeAngle = 0;
            rightKneeAngle = 0;
          } else if (diveMode === 'emerge') {
            // Emerging dynamic leap
            leftArmAngle = -Math.PI * 0.55;
            rightArmAngle = Math.PI * 0.2;
            leftLegAngle = -Math.PI * 0.25;
            rightLegAngle = Math.PI * 0.35;
            leftKneeAngle = 0.5;
            rightKneeAngle = 0.8;
          } else if (walkCycle !== null) {
            // Running / walking kinematics
            const s = Math.sin(walkCycle);
            const c = Math.cos(walkCycle);

            leftLegAngle = s * 0.65;
            rightLegAngle = -s * 0.65;

            // Knee bends during recovery
            leftKneeAngle = Math.max(0, -s) * 0.7;
            rightKneeAngle = Math.max(0, s) * 0.7;

            // Arms swing in opposition to legs
            leftArmAngle = -s * 0.6;
            rightArmAngle = s * 0.6;

            // Vertical bobbing
            const bob = -Math.abs(s) * 2;
            headY += bob;
            neckY += bob;
            pelvisY += bob * 0.7;
          }

          // 1. Head
          ctx.beginPath();
          ctx.arc(headX, headY, headR, 0, Math.PI * 2);
          ctx.fill();

          // 2. Torso
          ctx.beginPath();
          ctx.moveTo(neckX, neckY);
          ctx.lineTo(pelvisX, pelvisY);
          ctx.stroke();

          // 3. Back Arm (draw behind torso)
          drawLimb(ctx, neckX, neckY + 2, rightArmAngle, 7, 0.4, 7);

          // 4. Back Leg (draw behind)
          drawLeg(ctx, pelvisX, pelvisY, rightLegAngle, rightKneeAngle, 7.5, 7.5);

          // 5. Front Leg
          drawLeg(ctx, pelvisX, pelvisY, leftLegAngle, leftKneeAngle, 7.5, 7.5);

          // 6. Front Arm
          drawLimb(ctx, neckX, neckY + 2, leftArmAngle, 7, 0.3, 7);

          ctx.restore();
        }

        function drawLimb(ctx, sx, sy, shoulderAngle, len1, elbowBend, len2) {
          const elbowX = sx + Math.sin(shoulderAngle) * len1;
          const elbowY = sy + Math.cos(shoulderAngle) * len1;
          const handX = elbowX + Math.sin(shoulderAngle + elbowBend) * len2;
          const handY = elbowY + Math.cos(shoulderAngle + elbowBend) * len2;

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(handX, handY);
          ctx.stroke();
        }

        function drawLeg(ctx, hx, hy, hipAngle, kneeBend, len1, len2) {
          const kneeX = hx + Math.sin(hipAngle) * len1;
          const kneeY = hy + Math.cos(hipAngle) * len1;
          const footX = kneeX + Math.sin(hipAngle + kneeBend) * len2;
          const footY = kneeY + Math.cos(hipAngle + kneeBend) * len2;

          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(footX, footY);
          ctx.stroke();
        }

        // Global render function for arbitrary timeline position t (0 to 1350ms)
        window.renderFrame = function(t, direction) {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);

          const isLTR = direction === 'light-to-dark';
          const isSwapped = t >= 680;

          drawStage(isSwapped, direction);

          // Timeline logic:
          // 0 to 160ms: Fade in / enter
          // 160 to 520ms: Walk to portal
          // 520 to 700ms: Leap and dive into hole
          // 700 to 760ms: Under hole (submerged)
          // 760 to 980ms: Emerge and land
          // 980 to 1180ms: Walk to destination
          // 1180 to 1350ms: Complete / close

          let charX = 0, charY = GROUND_Y;
          let scale = 1, rotation = 0;
          let walkCycle = null;
          let diveMode = null;
          let visible = true;

          const facingSign = isLTR ? 1 : -1;

          if (t < 160) {
            // Standing at start node
            charX = isLTR ? SUN_X + 18 : MOON_X - 18;
            charY = GROUND_Y;
            walkCycle = 0;
            rotation = 0;
          } else if (t >= 160 && t < 520) {
            // Walking to portal
            const p = (t - 160) / 360; // 0 to 1
            const startX = isLTR ? SUN_X + 18 : MOON_X - 18;
            const endX = isLTR ? PORTAL_X - 35 : PORTAL_X + 35;
            charX = startX + (endX - startX) * p;
            charY = GROUND_Y;
            walkCycle = (t - 160) * 0.025;
            rotation = facingSign * 0.08;
          } else if (t >= 520 && t < 700) {
            // Diving into portal
            const p = (t - 520) / 180; // 0 to 1
            diveMode = 'dive';
            const startX = isLTR ? PORTAL_X - 35 : PORTAL_X + 35;
            const endX = PORTAL_X;
            charX = startX + (endX - startX) * p;

            // Parabolic dive curve: jumps up 14px, then plunges into hole
            const jumpArc = -16 * Math.sin(p * Math.PI);
            const plunge = 18 * Math.pow(p, 2);
            charY = GROUND_Y + jumpArc + plunge;

            // Rotation into head-first dive
            rotation = facingSign * (p * 1.35); // tilts up to ~78 deg

            // Scale shrinks into hole
            scale = Math.max(0.15, 1 - p * 0.85);

            if (p > 0.85) {
              visible = false;
            }
          } else if (t >= 700 && t < 760) {
            // Fully inside portal
            visible = false;
          } else if (t >= 760 && t < 980) {
            // Emerging from portal
            const p = (t - 760) / 220; // 0 to 1
            diveMode = 'emerge';
            const startX = PORTAL_X;
            const endX = isLTR ? PORTAL_X + 38 : PORTAL_X - 38;
            charX = startX + (endX - startX) * p;

            // Emerge upward leap arc
            const leapArc = -20 * Math.sin(p * Math.PI);
            charY = GROUND_Y + leapArc;

            // Untwist rotation
            rotation = facingSign * ((1 - p) * -0.6);

            // Scale expands from small back to 1
            scale = Math.min(1, 0.25 + p * 0.75);
          } else if (t >= 980 && t < 1180) {
            // Walking to destination node
            const p = (t - 980) / 200; // 0 to 1
            const startX = isLTR ? PORTAL_X + 38 : PORTAL_X - 38;
            const endX = isLTR ? MOON_X - 18 : SUN_X + 18;
            charX = startX + (endX - startX) * p;
            charY = GROUND_Y;
            walkCycle = (t - 980) * 0.025;
            rotation = facingSign * 0.08;
          } else {
            // Standing at destination node
            charX = isLTR ? MOON_X - 18 : SUN_X + 18;
            charY = GROUND_Y;
            walkCycle = 0;
            rotation = 0;
          }

          if (visible) {
            ctx.save();
            if (!isLTR) {
              // flip character horizontally for right-to-left
              ctx.translate(charX, 0);
              ctx.scale(-1, 1);
              ctx.translate(-charX, 0);
            }
            drawStickman(charX, charY, scale, rotation, walkCycle, diveMode);
            ctx.restore();
          }
        };
      </script>
    </body>
    </html>
  `);

  console.log('Rendering test frames...');
  const times = [0, 160, 360, 530, 620, 680, 720, 800, 920, 1050, 1200];
  for (const t of times) {
    await page.evaluate((time) => window.renderFrame(time, 'light-to-dark'), t);
    await page.screenshot({ path: `screenshots/canvas-test-l2d-${String(t).padStart(4, '0')}ms.png` });
  }

  // Reverse direction Dark to Light
  for (const t of times) {
    await page.evaluate((time) => window.renderFrame(time, 'dark-to-light'), t);
    await page.screenshot({ path: `screenshots/canvas-test-d2l-${String(t).padStart(4, '0')}ms.png` });
  }

  await browser.close();
  console.log('Canvas prototype rendered successfully!');
})();
