'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ThemeTransitionPortalProps {
  isTransitioning: boolean;
  direction: 'dark-to-light' | 'light-to-dark';
  currentPhase: 'entering' | 'swapped';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export default function ThemeTransitionPortal({
  isTransitioning,
  direction,
}: ThemeTransitionPortalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isTransitioning) {
      setIsClosing(false);
      return;
    }

    const exitTimer = setTimeout(() => {
      setIsClosing(true);
    }, 1180);

    return () => clearTimeout(exitTimer);
  }, [isTransitioning]);

  useEffect(() => {
    if (!isTransitioning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();
    const particles: Particle[] = [];
    let diveParticleFired = false;
    let emergeParticleFired = false;

    // Retina / High-DPI support
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 440;
    const height = rect.height || 130;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const groundY = height * 0.70; // ground track at y = 91px
    const portalX = width / 2;
    const portalY = groundY;
    const rx = 42; // portal horizontal radius
    const ry = 11.5; // portal vertical radius
    const sunX = Math.max(50, width * 0.13);
    const moonX = Math.min(width - 50, width * 0.87);

    const isLTR = direction === 'light-to-dark';
    const facingSign = isLTR ? 1 : -1;

    function spawnParticles(x: number, y: number, count: number, upward = false) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 2.2,
          vy: upward ? -(Math.random() * 2.2 + 1.2) : Math.random() * 2 - 1,
          alpha: 1,
          size: Math.random() * 2 + 1.2,
        });
      }
    }

    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 2.4;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        ctx!.fillStyle = `rgba(197, 243, 106, ${Math.max(0, p.alpha)})`;
        ctx!.shadowColor = '#C5F36A';
        ctx!.shadowBlur = 6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    // 1. Draw Ground Track & Departure / Destination Nodes
    function drawBackgroundAndNodes(t: number) {
      // Ground Track
      ctx!.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(sunX - 16, groundY);
      ctx!.lineTo(moonX + 16, groundY);
      ctx!.stroke();

      // Sun Node (left)
      const sunActive = isLTR ? t < 680 : t >= 1150;
      drawSunNode(sunX, groundY - 16, sunActive);

      // Moon Node (right)
      const moonActive = isLTR ? t >= 1150 : t < 680;
      drawMoonNode(moonX, groundY - 16, moonActive);
    }

    function drawSunNode(x: number, y: number, active: boolean) {
      ctx!.beginPath();
      ctx!.arc(x, y, 16, 0, Math.PI * 2);
      ctx!.fillStyle = active ? 'rgba(245, 158, 11, 0.20)' : 'rgba(255, 255, 255, 0.04)';
      ctx!.fill();
      ctx!.strokeStyle = active ? 'rgba(245, 158, 11, 0.70)' : 'rgba(255, 255, 255, 0.10)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      ctx!.strokeStyle = active ? '#F59E0B' : '#71717a';
      ctx!.fillStyle = active ? '#F59E0B' : 'transparent';
      ctx!.lineWidth = 1.8;
      ctx!.shadowColor = active ? 'rgba(245, 158, 11, 0.8)' : 'transparent';
      ctx!.shadowBlur = active ? 12 : 0;

      ctx!.beginPath();
      ctx!.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx!.stroke();

      const rayLen = 3.5;
      const rayOffset = 8.5;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const x1 = x + Math.cos(angle) * rayOffset;
        const y1 = y + Math.sin(angle) * rayOffset;
        const x2 = x + Math.cos(angle) * (rayOffset + rayLen);
        const y2 = y + Math.sin(angle) * (rayOffset + rayLen);
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();
      }
      ctx!.shadowBlur = 0;
    }

    function drawMoonNode(x: number, y: number, active: boolean) {
      ctx!.beginPath();
      ctx!.arc(x, y, 16, 0, Math.PI * 2);
      ctx!.fillStyle = active ? 'rgba(197, 243, 106, 0.18)' : 'rgba(255, 255, 255, 0.04)';
      ctx!.fill();
      ctx!.strokeStyle = active ? 'rgba(197, 243, 106, 0.70)' : 'rgba(255, 255, 255, 0.10)';
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      ctx!.strokeStyle = active ? '#C5F36A' : '#71717a';
      ctx!.fillStyle = active ? '#C5F36A' : '#71717a';
      ctx!.shadowColor = active ? 'rgba(197, 243, 106, 0.8)' : 'transparent';
      ctx!.shadowBlur = active ? 12 : 0;

      ctx!.save();
      ctx!.translate(x - 1, y);
      ctx!.beginPath();
      ctx!.arc(0, 0, 6.8, -Math.PI * 0.45, Math.PI * 0.45, false);
      ctx!.arc(-3.2, 0, 5.8, Math.PI * 0.35, -Math.PI * 0.35, true);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
      ctx!.shadowBlur = 0;
    }

    // 2. Portal Void & Back Rim (Drawn behind the character)
    function drawPortalCavityAndBackRim(cx: number, cy: number) {
      // Ambient glow pool
      const glowGrad = ctx!.createRadialGradient(cx, cy + 3, 8, cx, cy + 3, 58);
      glowGrad.addColorStop(0, 'rgba(197, 243, 106, 0.22)');
      glowGrad.addColorStop(1, 'rgba(197, 243, 106, 0)');
      ctx!.fillStyle = glowGrad;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy + 3, 58, 20, 0, 0, Math.PI * 2);
      ctx!.fill();

      // Subterranean Void
      const voidGrad = ctx!.createRadialGradient(cx, cy + 5, 0, cx, cy, rx);
      voidGrad.addColorStop(0, '#000000');
      voidGrad.addColorStop(0.65, '#04070a');
      voidGrad.addColorStop(1, '#0c131a');

      ctx!.fillStyle = voidGrad;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx!.fill();

      // Deep inner shadow on upper half
      ctx!.strokeStyle = 'rgba(0, 0, 0, 0.95)';
      ctx!.lineWidth = 3.5;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy + 1, rx - 2, ry - 1, 0, Math.PI, Math.PI * 2);
      ctx!.stroke();

      // Back half of outer rim (dimmer)
      ctx!.strokeStyle = 'rgba(197, 243, 106, 0.55)';
      ctx!.lineWidth = 2.0;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx, ry, 0, Math.PI, Math.PI * 2);
      ctx!.stroke();
    }

    // 3. Portal Front Lip & Foreground (Drawn ON TOP of character for genuine 3D occlusion)
    function drawPortalFrontRimOcclusion(cx: number, cy: number) {
      // Front neon rim (closest to camera, brightest highlight)
      ctx!.strokeStyle = '#C5F36A';
      ctx!.lineWidth = 2.4;
      ctx!.shadowColor = 'rgba(197, 243, 106, 0.85)';
      ctx!.shadowBlur = 14;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI);
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Subtle ground lip shading in front of the hole
      const lipGrad = ctx!.createLinearGradient(cx, cy, cx, cy + 4);
      lipGrad.addColorStop(0, 'rgba(197, 243, 106, 0.35)');
      lipGrad.addColorStop(1, 'rgba(197, 243, 106, 0)');
      ctx!.fillStyle = lipGrad;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy + 1, rx, 3, 0, 0, Math.PI);
      ctx!.fill();
    }

    // Kinematic Stickman Drawing
    function drawStickman(
      x: number,
      y: number,
      scale: number,
      rotation: number,
      walkCycle: number | null,
      diveMode: 'dive' | 'emerge' | null
    ) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.scale(scale, scale);
      ctx!.rotate(rotation);

      ctx!.strokeStyle = '#C5F36A';
      ctx!.fillStyle = '#C5F36A';
      ctx!.lineWidth = 2.6;
      ctx!.lineCap = 'round';
      ctx!.lineJoin = 'round';
      ctx!.shadowColor = 'rgba(197, 243, 106, 0.55)';
      ctx!.shadowBlur = 6;

      const headR = 4.6;
      let headX = 0,
        headY = -35;
      const neckX = 0;
      let neckY = -27;
      const pelvisX = 0;
      let pelvisY = -14;

      let leftArmAngle = 0;
      let rightArmAngle = 0;
      let leftLegAngle = 0;
      let rightLegAngle = 0;
      let leftKneeAngle = 0;
      let rightKneeAngle = 0;

      if (diveMode === 'dive') {
        // Streamlined diver pose
        leftArmAngle = -Math.PI * 0.88;
        rightArmAngle = -Math.PI * 0.85;
        leftLegAngle = Math.PI * 0.10;
        rightLegAngle = Math.PI * 0.08;
        leftKneeAngle = 0;
        rightKneeAngle = 0;
      } else if (diveMode === 'emerge') {
        // Dynamic upward leap
        leftArmAngle = -Math.PI * 0.55;
        rightArmAngle = Math.PI * 0.24;
        leftLegAngle = -Math.PI * 0.28;
        rightLegAngle = Math.PI * 0.35;
        leftKneeAngle = 0.5;
        rightKneeAngle = 0.75;
      } else if (walkCycle !== null) {
        // Natural human stride with recovery knee bend
        const s = Math.sin(walkCycle);

        leftLegAngle = s * 0.65;
        rightLegAngle = -s * 0.65;

        leftKneeAngle = Math.max(0, -s) * 0.75;
        rightKneeAngle = Math.max(0, s) * 0.75;

        leftArmAngle = -s * 0.6;
        rightArmAngle = s * 0.6;

        // Step bobbing
        const bob = -Math.abs(s) * 2.4;
        headY += bob;
        neckY += bob;
        pelvisY += bob * 0.7;
      }

      // Head
      ctx!.beginPath();
      ctx!.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx!.fill();

      // Torso
      ctx!.beginPath();
      ctx!.moveTo(neckX, neckY);
      ctx!.lineTo(pelvisX, pelvisY);
      ctx!.stroke();

      // Back Arm
      drawLimb(neckX, neckY + 2, rightArmAngle, 7.2, 0.4, 7.2);

      // Back Leg
      drawLeg(pelvisX, pelvisY, rightLegAngle, rightKneeAngle, 7.8, 7.8);

      // Front Leg
      drawLeg(pelvisX, pelvisY, leftLegAngle, leftKneeAngle, 7.8, 7.8);

      // Front Arm
      drawLimb(neckX, neckY + 2, leftArmAngle, 7.2, 0.3, 7.2);

      ctx!.restore();
    }

    function drawLimb(
      sx: number,
      sy: number,
      shoulderAngle: number,
      len1: number,
      elbowBend: number,
      len2: number
    ) {
      const elbowX = sx + Math.sin(shoulderAngle) * len1;
      const elbowY = sy + Math.cos(shoulderAngle) * len1;
      const handX = elbowX + Math.sin(shoulderAngle + elbowBend) * len2;
      const handY = elbowY + Math.cos(shoulderAngle + elbowBend) * len2;

      ctx!.beginPath();
      ctx!.moveTo(sx, sy);
      ctx!.lineTo(elbowX, elbowY);
      ctx!.lineTo(handX, handY);
      ctx!.stroke();
    }

    function drawLeg(
      hx: number,
      hy: number,
      hipAngle: number,
      kneeBend: number,
      len1: number,
      len2: number
    ) {
      const kneeX = hx + Math.sin(hipAngle) * len1;
      const kneeY = hy + Math.cos(hipAngle) * len1;
      const footX = kneeX + Math.sin(hipAngle + kneeBend) * len2;
      const footY = kneeY + Math.cos(hipAngle + kneeBend) * len2;

      ctx!.beginPath();
      ctx!.moveTo(hx, hy);
      ctx!.lineTo(kneeX, kneeY);
      ctx!.lineTo(footX, footY);
      ctx!.stroke();
    }

    let lastFrameTime = performance.now();

    function frameLoop(now: number) {
      const elapsed = now - startTime;
      const dt = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      ctx!.clearRect(0, 0, width, height);

      // 1. Draw Background, Track & Nodes
      drawBackgroundAndNodes(elapsed);

      // 2. Draw Portal Void Cavity & Back Rim (Behind Character)
      drawPortalCavityAndBackRim(portalX, portalY);

      // 3. Compute Character Kinematics
      const portalEdgeOffset = 36;
      const startX = isLTR ? sunX + 18 : moonX - 18;
      const approachX = isLTR ? portalX - portalEdgeOffset : portalX + portalEdgeOffset;
      const emergeX = isLTR ? portalX + portalEdgeOffset : portalX - portalEdgeOffset;
      const destX = isLTR ? moonX - 18 : sunX + 18;

      let charX = startX;
      let charY = groundY;
      let scale = 1;
      let rotation = 0;
      let walkCycle: number | null = null;
      let diveMode: 'dive' | 'emerge' | null = null;
      let visible = true;

      if (elapsed < 160) {
        // Standing at departure node
        charX = startX;
        charY = groundY;
        walkCycle = 0;
        rotation = 0;
      } else if (elapsed >= 160 && elapsed < 520) {
        // Walking towards portal
        const p = (elapsed - 160) / 360;
        charX = startX + (approachX - startX) * p;
        charY = groundY;
        walkCycle = (elapsed - 160) * 0.022;
        rotation = facingSign * 0.10; // forward spine lean
      } else if (elapsed >= 520 && elapsed < 700) {
        // Leaping and diving into portal hole
        const p = (elapsed - 520) / 180;
        diveMode = 'dive';
        charX = approachX + (portalX - approachX) * p;

        // Parabolic jump arc: jumps up 16px, then plunges into hole
        const jumpArc = -16 * Math.sin(p * Math.PI);
        const plunge = 22 * Math.pow(p, 2);
        charY = groundY + jumpArc + plunge;

        // Rotates headfirst towards hole
        rotation = facingSign * (p * 1.35);

        // Compresses into depth
        scale = Math.max(0.20, 1 - p * 0.80);

        if (p > 0.65 && !diveParticleFired) {
          spawnParticles(portalX, portalY, 5, false);
          diveParticleFired = true;
        }

        if (p > 0.88) {
          visible = false;
        }
      } else if (elapsed >= 700 && elapsed < 750) {
        // Fully submerged in void
        visible = false;
      } else if (elapsed >= 750 && elapsed < 980) {
        // Emerging from portal
        const p = (elapsed - 750) / 230;
        diveMode = 'emerge';
        charX = portalX + (emergeX - portalX) * p;

        if (p < 0.2 && !emergeParticleFired) {
          spawnParticles(portalX, portalY, 6, true);
          emergeParticleFired = true;
        }

        // Upward leap arc out of hole
        const leapArc = -22 * Math.sin(p * Math.PI);
        charY = groundY + leapArc;

        // Untwists back to vertical
        rotation = facingSign * ((1 - p) * -0.6);

        // Expands back to full scale
        scale = Math.min(1, 0.25 + p * 0.75);
      } else if (elapsed >= 980 && elapsed < 1180) {
        // Walking to destination node
        const p = (elapsed - 980) / 200;
        charX = emergeX + (destX - emergeX) * p;
        charY = groundY;
        walkCycle = (elapsed - 980) * 0.022;
        rotation = facingSign * 0.08;
      } else {
        // Arrived at destination node
        charX = destX;
        charY = groundY;
        walkCycle = 0;
        rotation = 0;
      }

      // 4. Draw Character
      if (visible) {
        ctx!.save();
        if (!isLTR) {
          ctx!.translate(charX, 0);
          ctx!.scale(-1, 1);
          ctx!.translate(-charX, 0);
        }
        drawStickman(charX, charY, scale, rotation, walkCycle, diveMode);
        ctx!.restore();
      }

      // 5. Draw Portal Front Lip (ON TOP of character for 3D occlusion)
      drawPortalFrontRimOcclusion(portalX, portalY);

      // 6. Draw Sparkle Particles
      updateParticles(dt);
      drawParticles();

      if (elapsed < 1350) {
        animationFrameId = requestAnimationFrame(frameLoop);
      }
    }

    animationFrameId = requestAnimationFrame(frameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTransitioning, direction]);

  if (!isTransitioning) return null;

  return (
    <div
      className={`absolute right-0 top-full mt-2.5 z-50 origin-top-right w-[calc(100vw-32px)] max-w-[440px] h-[130px] rounded-[26px] overflow-hidden border pointer-events-auto bg-[#0e1217] border-[#222a36] transition-all duration-200 ${
        isClosing ? 'opacity-0 scale-95' : 'animate-in fade-in zoom-in-95 opacity-100 scale-100'
      }`}
      style={{
        boxShadow:
          '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
      aria-live="polite"
      aria-label="Theme transition in progress"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
