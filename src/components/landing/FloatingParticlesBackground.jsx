import { useEffect, useRef } from 'react';

/**
 * FloatingParticlesBackground — particules flottantes avec interaction souris.
 *
 * Adapté de FloatingParticlesBackground (Framer) à la charte Akili :
 * particules Or vif (#F2C94C) sur fond Indigo Nuit, glow doux,
 * mouse-attract subtil pour donner l'illusion d'un essaim qui réagit.
 *
 * Usage : poser en absolute inset-0 derrière un contenu en z-index >= 10.
 *
 * @param {object} props
 * @param {number} [props.particleCount=60]    Nombre de particules
 * @param {number} [props.particleSize=2]      Taille max (px)
 * @param {number} [props.particleOpacity=0.55] Opacité de base
 * @param {number} [props.glowIntensity=12]    Intensité du blur du glow
 * @param {number} [props.movementSpeed=0.4]   Vitesse de drift
 * @param {number} [props.mouseInfluence=140]  Rayon d'influence souris (px)
 * @param {string} [props.particleColor='#F2C94C'] Couleur (Or Akili par défaut)
 * @param {'none'|'attract'|'repel'} [props.mouseGravity='attract']
 * @param {number} [props.gravityStrength=40]  Force de la gravité souris
 * @param {string} [props.className]           Classes Tailwind extra
 */
export function FloatingParticlesBackground({
  particleCount = 60,
  particleSize = 2,
  particleOpacity = 0.55,
  glowIntensity = 12,
  movementSpeed = 0.4,
  mouseInfluence = 140,
  particleColor = '#F2C94C',
  mouseGravity = 'attract',
  gravityStrength = 40,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Initialise les particules avec positions aléatoires.
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: Math.random() * particleSize + 1,
        opacity: particleOpacity,
        baseOpacity: particleOpacity,
        glowMult: 1,
      }));
    };

    // Resize : ajuste le canvas au container et redistribue les particules.
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) initParticles();
      else {
        // Redistribue si le container a changé.
        particlesRef.current.forEach(p => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    // Souris : track relativement au container.
    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Tick d'animation.
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      particlesRef.current.forEach(p => {
        // Influence souris (attraction / répulsion).
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseInfluence && dist > 0 && mouseGravity !== 'none') {
          const force = (mouseInfluence - dist) / mouseInfluence;
          const nx = dx / dist;
          const ny = dy / dist;
          const g = force * (gravityStrength * 0.001);
          if (mouseGravity === 'attract') {
            p.vx += nx * g;
            p.vy += ny * g;
          } else {
            p.vx -= nx * g;
            p.vy -= ny * g;
          }
          p.opacity = Math.min(1, p.baseOpacity + force * 0.4);
          // Glow ease-in-out.
          const target = 1 + force * 2;
          p.glowMult += (target - p.glowMult) * 0.15;
        } else {
          p.opacity = Math.max(p.baseOpacity * 0.3, p.opacity - 0.02);
          p.glowMult = Math.max(1, p.glowMult + (1 - p.glowMult) * 0.08);
        }

        // Drift + bruit subtil + damping.
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.001;
        p.vy += (Math.random() - 0.5) * 0.001;
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Wrap aux bords.
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Dessin avec glow.
        ctx.save();
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = glowIntensity * p.glowMult * 2;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    // Setup.
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    particleCount,
    particleSize,
    particleOpacity,
    glowIntensity,
    movementSpeed,
    mouseInfluence,
    particleColor,
    mouseGravity,
    gravityStrength,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
