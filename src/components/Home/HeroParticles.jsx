import { useEffect, useRef, useState } from 'react';

// A decorative network: no external animation library or remote assets.
export default function HeroParticles({ theme }) {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const stage = canvas.parentElement;
    const pointer = { x: 0, y: 0, active: false };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let lastTime = 0;
    let inView = true;
    const rgb = theme === 'dark' ? '143, 220, 198' : '23, 119, 108';
    const canAnimate = () => !paused && !motion.matches && !document.hidden && inView;

    function paint(time = 0) {
      frame = 0;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      context.clearRect(0, 0, width, height);
      for (const point of particles) {
        if (canAnimate()) {
          if (pointer.active) {
            const dx = point.x - pointer.x;
            const dy = point.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 140) {
              const push = (1 - distance / 140) * 65 * delta;
              point.x += dx / distance * push;
              point.y += dy / distance * push;
            }
          }
          point.x += point.vx * delta;
          point.y += point.vy * delta;
          if (point.x < -10) point.x = width + 10;
          if (point.x > width + 10) point.x = -10;
          if (point.y < -10) point.y = height + 10;
          if (point.y > height + 10) point.y = -10;
        }
      }
      if (pointer.active && canAnimate()) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 170);
        glow.addColorStop(0, `rgba(${rgb}, 0.12)`);
        glow.addColorStop(1, `rgba(${rgb}, 0)`);
        context.fillStyle = glow;
        context.fillRect(pointer.x - 170, pointer.y - 170, 340, 340);
      }
      const distanceLimit = width < 600 ? 105 : 155;
      for (let i = 0; i < particles.length; i += 1) {
        const point = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const next = particles[j];
          const distance = Math.hypot(point.x - next.x, point.y - next.y);
          if (distance < distanceLimit) {
            context.strokeStyle = `rgba(${rgb}, ${(1 - distance / distanceLimit) * 0.25})`;
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(next.x, next.y);
            context.stroke();
          }
        }
        if (pointer.active && canAnimate()) {
          const distance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
          if (distance < 180) {
            context.strokeStyle = `rgba(${rgb}, ${(1 - distance / 180) * 0.55})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(pointer.x, pointer.y);
            context.stroke();
          }
        }
        context.fillStyle = `rgba(${rgb}, ${point.opacity})`;
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      }
      if (canAnimate()) frame = requestAnimationFrame(paint);
    }

    function movePointer(event) {
      if (event.pointerType === 'touch' || !canAnimate()) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function clearPointer() {
      pointer.active = false;
    }

    function restart() {
      clearPointer();
      cancelAnimationFrame(frame);
      lastTime = 0;
      paint();
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(85, Math.max(24, Math.round(width * height / 13000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        radius: 1.2 + Math.random() * 1.5,
        opacity: 0.25 + Math.random() * 0.35,
      }));
      restart();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      restart();
    });
    stage.addEventListener('pointermove', movePointer, { passive: true });
    stage.addEventListener('pointerleave', clearPointer);
    stage.addEventListener('pointercancel', clearPointer);
    window.addEventListener('blur', clearPointer);
    window.addEventListener('scroll', clearPointer, { passive: true });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motion.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener('pointermove', movePointer);
      stage.removeEventListener('pointerleave', clearPointer);
      stage.removeEventListener('pointercancel', clearPointer);
      window.removeEventListener('blur', clearPointer);
      window.removeEventListener('scroll', clearPointer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
    };
  }, [theme, paused]);

  return (
    <>
      <canvas className="hero-particles" ref={canvasRef} aria-hidden="true" />
      <button className="particles-toggle" type="button" aria-label="Pause background animation" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Resume animation' : 'Pause animation'}
      </button>
    </>
  );
}
