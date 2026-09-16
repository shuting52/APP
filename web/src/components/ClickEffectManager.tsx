import React, { useEffect, useRef } from 'react';

// Core Socialist Values: 12 words
const VALUES_WORDS = [
  '富强',
  '民主',
  '文明',
  '和谐',
  '自由',
  '平等',
  '公正',
  '法治',
  '爱国',
  '敬业',
  '诚信',
  '友善'
];

// Curated vibrant click text colors
const TEXT_COLORS = [
  '#ef4444', // 鲜红
  '#f59e0b', // 琥珀金
  '#10b981', // 翠绿
  '#3b82f6', // 宝蓝
  '#8b5cf6', // 紫罗兰
  '#ec4899', // 玫瑰粉
  '#06b6d4'  // 晴空青
];

// Luminous micro particle trail colors
const TRAIL_COLORS = [
  '#38bdf8', // 霓虹天蓝
  '#ec4899', // 活力玫瑰粉
  '#fbbf24', // 暖金微芒
  '#34d399', // 翡翠薄荷
  '#a78bfa', // 幻彩薰衣草
  '#06b6d4', // 晴空碧青
  '#f87171', // 极光珊瑚红
  '#ffffff'  // 晶莹白
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  shape: 'circle' | 'sparkle';
}

export const ClickEffectManager: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isAnimatingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  const lastWordTriggerTimeRef = useRef<number>(0);
  const keyIndexRef = useRef<number>(0);
  const activeWordNodesCountRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Draw 4-pointed micro star sparkle
    const drawSparkle = (cx: number, cy: number, radius: number, color: string, alpha: number) => {
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius * 1.6);
      ctx.quadraticCurveTo(cx, cy, cx + radius * 1.6, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + radius * 1.6);
      ctx.quadraticCurveTo(cx, cy, cx - radius * 1.6, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - radius * 1.6);
      ctx.fill();
      ctx.restore();
    };

    // Main animation loop
    const animate = () => {
      const particles = particlesRef.current;
      if (particles.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isAnimatingRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= p.decay;
        p.size *= 0.96;

        if (p.alpha <= 0.02 || p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        if (p.shape === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.color, p.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        requestAnimationFrame(animate);
      }
    };

    // Add trail particles at mouse coordinates
    const addTrailParticles = (x: number, y: number, count: number = 2) => {
      const particles = particlesRef.current;
      // Cap maximum simultaneous trail particles for fluid 60FPS
      if (particles.length > 80) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.9 + 0.3;
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
        const isSparkle = Math.random() > 0.65;

        particles.push({
          x: x + (Math.random() * 6 - 3),
          y: y + (Math.random() * 6 - 3),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.2 + 1.6,
          color,
          alpha: Math.random() * 0.3 + 0.7,
          decay: Math.random() * 0.028 + 0.022,
          shape: isSparkle ? 'sparkle' : 'circle'
        });
      }

      startAnimation();
    };

    // Add burst particles on click
    const addClickBurstParticles = (x: number, y: number, count: number = 8) => {
      const particles = particlesRef.current;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const speed = Math.random() * 2.2 + 1.2;
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 2,
          color,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          shape: Math.random() > 0.4 ? 'sparkle' : 'circle'
        });
      }
      startAnimation();
    };

    // Mouse move handler with throttle
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const last = lastMousePosRef.current;
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);

      // Spawn if moved at least 8px or at least 25ms elapsed since last spawn
      if (dist > 8 || now - last.time > 25) {
        lastMousePosRef.current = { x: e.clientX, y: e.clientY, time: now };
        addTrailParticles(e.clientX, e.clientY, dist > 20 ? 3 : 2);
      }
    };

    // Mobile touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      addTrailParticles(touch.clientX, touch.clientY, 1);
    };

    // Interactive element filter for floating word
    const isInteractiveElement = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      const interactiveSelector = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'label',
        'summary',
        '[role="button"]',
        '[role="tab"]',
        '[role="dialog"]',
        '[role="menuitem"]',
        '[role="checkbox"]',
        '[role="switch"]',
        '.iiice-card',
        '.modal-content',
        '[data-interactive="true"]'
      ].join(',');

      return Boolean(target.closest(interactiveSelector));
    };

    // Spawn floating word
    const spawnWord = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastWordTriggerTimeRef.current < 160) return;
      lastWordTriggerTimeRef.current = now;

      if (activeWordNodesCountRef.current > 12) return;

      const word = VALUES_WORDS[keyIndexRef.current];
      keyIndexRef.current = (keyIndexRef.current + 1) % VALUES_WORDS.length;

      const randomColor = TEXT_COLORS[Math.floor(Math.random() * TEXT_COLORS.length)];
      const randomRotate = (Math.random() * 20 - 10).toFixed(1);
      const randomDriftX = (Math.random() * 30 - 15).toFixed(1);

      const span = document.createElement('span');
      span.textContent = word;
      span.className = 'click-float-word';
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      span.style.color = randomColor;
      span.style.setProperty('--drift-x', `${randomDriftX}px`);
      span.style.setProperty('--drift-rotate', `${randomRotate}deg`);

      document.body.appendChild(span);
      activeWordNodesCountRef.current += 1;

      setTimeout(() => {
        if (span.parentNode) {
          span.parentNode.removeChild(span);
        }
        activeWordNodesCountRef.current = Math.max(0, activeWordNodesCountRef.current - 1);
      }, 1000);
    };

    // Click handler: emits particle burst + floating word
    const handleClick = (e: MouseEvent) => {
      addClickBurstParticles(e.clientX, e.clientY, 8);

      const target = e.target as HTMLElement | null;
      if (isInteractiveElement(target)) return;

      spawnWord(e.pageX, e.pageY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
