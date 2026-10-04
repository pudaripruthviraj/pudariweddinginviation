import React, { useEffect, useRef, useState } from 'react';

type ParticleType = 'lotus_pink' | 'jasmine_ivory' | 'marigold_gold' | 'akshinthalu_gold' | 'akshinthalu_kumkum';

interface Particle {
  x: number;
  y: number;
  vy: number;
  swaySpeed: number;
  swayAmp: number;
  swayPhase: number;
  rotation: number;
  vRot: number;
  flip: number;
  vFlip: number;
  size: number;
  type: ParticleType;
  opacity: number;
}

export const AmbientPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate initial particles distributed naturally throughout height
    const parentWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 430;
    const initialHeight = window.innerHeight;
    const totalCount = 32;

    const particleTypes: ParticleType[] = [
      'lotus_pink',
      'lotus_pink',
      'jasmine_ivory',
      'marigold_gold',
      'akshinthalu_gold',
      'akshinthalu_kumkum',
    ];

    particlesRef.current = Array.from({ length: totalCount }).map((_, i) => {
      const type = particleTypes[i % particleTypes.length];
      const isRice = type.startsWith('akshinthalu');

      return {
        x: Math.random() * parentWidth,
        y: Math.random() * initialHeight,
        vy: isRice ? 0.9 + Math.random() * 0.9 : 0.45 + Math.random() * 0.7,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayAmp: isRice ? 12 + Math.random() * 15 : 20 + Math.random() * 22,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.035,
        flip: Math.random() * Math.PI * 2,
        vFlip: 0.02 + Math.random() * 0.035,
        size: isRice ? 3.5 + Math.random() * 2 : 5.5 + Math.random() * 4.5,
        type,
        opacity: isRice ? 0.45 + Math.random() * 0.35 : 0.4 + Math.random() * 0.35,
      };
    });

    // Listen to extra burst events (e.g. when Akshinthalu button is tapped)
    const handleBurst = () => {
      const pWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 430;
      const extraParticles: Particle[] = Array.from({ length: 22 }).map((_, i) => {
        const type = particleTypes[i % particleTypes.length];
        const isRice = type.startsWith('akshinthalu');
        return {
          x: pWidth * 0.2 + Math.random() * (pWidth * 0.6),
          y: -10 - Math.random() * 40,
          vy: isRice ? 1.5 + Math.random() * 1.2 : 1.0 + Math.random() * 0.9,
          swaySpeed: 0.02 + Math.random() * 0.03,
          swayAmp: 22 + Math.random() * 25,
          swayPhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.06,
          flip: Math.random() * Math.PI * 2,
          vFlip: 0.04 + Math.random() * 0.05,
          size: isRice ? 4 + Math.random() * 2.5 : 7 + Math.random() * 4,
          type,
          opacity: 0.75 + Math.random() * 0.2,
        };
      });
      particlesRef.current.push(...extraParticles);
      if (particlesRef.current.length > 55) {
        particlesRef.current = particlesRef.current.slice(-55);
      }
    };

    window.addEventListener('shower_akshinthalu_burst', handleBurst);

    let time = 0;

    const render = () => {
      if (!isEnabled) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const pWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 430;
      const pHeight = window.innerHeight;

      ctx.clearRect(0, 0, pWidth, pHeight);
      time += 1;

      particlesRef.current.forEach((p) => {
        // Update physics
        p.y += p.vy;
        p.swayPhase += p.swaySpeed;
        const currentX = p.x + Math.sin(p.swayPhase) * p.swayAmp;
        p.rotation += p.vRot;
        p.flip += p.vFlip;

        // Wrap around when falling past bottom
        if (p.y > pHeight + 25) {
          p.y = -20 - Math.random() * 15;
          p.x = Math.random() * pWidth;
        }

        // DRAW PARTICLES
        if (p.type === 'lotus_pink' || p.type === 'jasmine_ivory' || p.type === 'marigold_gold') {
          // Delicate Floral Petals (Lotus Pink, Jasmine Ivory, Marigold Gold)
          ctx.save();
          ctx.translate(currentX, p.y);
          ctx.rotate(p.rotation);
          const flipScale = Math.cos(p.flip);
          ctx.scale(1, flipScale);

          const w = p.size;
          const h = p.size * 1.55;

          ctx.beginPath();
          ctx.moveTo(0, h * 0.5);
          ctx.bezierCurveTo(-w * 0.65, h * 0.2, -w * 0.75, -h * 0.2, -w * 0.35, -h * 0.5);
          ctx.quadraticCurveTo(0, -h * 0.42, w * 0.35, -h * 0.5);
          ctx.bezierCurveTo(w * 0.75, -h * 0.2, w * 0.65, h * 0.2, 0, h * 0.5);
          ctx.closePath();

          const grad = ctx.createRadialGradient(0, -h * 0.1, 0, 0, 0, h);
          if (p.type === 'lotus_pink') {
            grad.addColorStop(0, `rgba(252, 228, 236, ${p.opacity})`);
            grad.addColorStop(0.55, `rgba(244, 143, 177, ${p.opacity * 0.95})`);
            grad.addColorStop(1, `rgba(216, 27, 96, ${p.opacity * 0.85})`);
          } else if (p.type === 'jasmine_ivory') {
            grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.95})`);
            grad.addColorStop(0.65, `rgba(255, 248, 225, ${p.opacity * 0.9})`);
            grad.addColorStop(1, `rgba(255, 236, 179, ${p.opacity * 0.75})`);
          } else {
            grad.addColorStop(0, `rgba(255, 241, 118, ${p.opacity})`);
            grad.addColorStop(0.55, `rgba(255, 213, 79, ${p.opacity * 0.95})`);
            grad.addColorStop(1, `rgba(255, 160, 0, ${p.opacity * 0.85})`);
          }
          ctx.fillStyle = grad;
          ctx.fill();

          // Delicate center rib
          ctx.strokeStyle = p.type === 'lotus_pink' 
            ? `rgba(173, 20, 87, ${p.opacity * 0.3})`
            : `rgba(200, 155, 60, ${p.opacity * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, h * 0.35);
          ctx.quadraticCurveTo(-0.4, 0, 0, -h * 0.3);
          ctx.stroke();

          ctx.restore();
        } else {
          // Auspicious Akshinthalu Sacred Rice (అక్షింతలు)
          ctx.save();
          ctx.translate(currentX, p.y);
          ctx.rotate(p.rotation);
          const flipScale = Math.cos(p.flip);
          ctx.scale(flipScale, 1);

          const len = p.size * 1.8;
          const width = p.size * 0.52;

          ctx.beginPath();
          ctx.moveTo(0, -len);
          ctx.quadraticCurveTo(width, 0, 0, len);
          ctx.quadraticCurveTo(-width, 0, 0, -len);
          ctx.closePath();

          if (p.type === 'akshinthalu_kumkum') {
            const grad = ctx.createLinearGradient(-width, 0, width, 0);
            grad.addColorStop(0, `rgba(216, 27, 96, ${p.opacity})`);
            grad.addColorStop(0.5, `rgba(229, 57, 53, ${p.opacity})`);
            grad.addColorStop(1, `rgba(142, 36, 170, ${p.opacity * 0.85})`);
            ctx.fillStyle = grad;
          } else {
            const grad = ctx.createLinearGradient(-width, 0, width, 0);
            grad.addColorStop(0, `rgba(255, 238, 88, ${p.opacity})`);
            grad.addColorStop(0.5, `rgba(253, 216, 53, ${p.opacity})`);
            grad.addColorStop(1, `rgba(245, 127, 23, ${p.opacity * 0.9})`);
            ctx.fillStyle = grad;
          }
          ctx.fill();

          // Golden glint
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(0, -len * 0.35, width * 0.35, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Pause rendering when document is hidden to conserve mobile battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      } else {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('shower_akshinthalu_burst', handleBurst);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden max-w-[430px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none opacity-90 select-none"
      />
    </div>
  );
};
