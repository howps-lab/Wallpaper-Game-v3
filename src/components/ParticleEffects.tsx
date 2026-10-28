import { useEffect, useRef } from 'react';

interface ParticleEffectsProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function ParticleEffects({ className = '' }: ParticleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // Adapt particle count for performance (mobile vs desktop)
    const isMobile = width < 768;
    const particleCount = isMobile ? 36 : 80;

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedY: -(Math.random() * 0.45 + 0.15), // Drifts gently upwards
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.2 + 0.1, // Drifts slightly right
        opacity: Math.random() * 0.6 + 0.15,
        maxOpacity: Math.random() * 0.55 + 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY * (delta * 60);
        p.x += (p.speedX + Math.sin(time * 0.0008 + p.pulsePhase) * 0.15) * (delta * 60);
        p.pulsePhase += p.pulseSpeed;

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;

        const currentOpacity =
          p.maxOpacity * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        // 100% pure white celestial particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentOpacity)})`;
        ctx.shadowColor = `rgba(255, 255, 255, 0.8)`;
        ctx.shadowBlur = p.size * 2.5;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-10 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Pure White Celestial Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
