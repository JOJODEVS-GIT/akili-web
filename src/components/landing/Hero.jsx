import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Play } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroTerminal } from './HeroTerminal';
import { DemoModal } from './DemoModal';
import { FloatingParticlesBackground } from './FloatingParticlesBackground';
import { usePublicStats } from '@/hooks/usePublicStats';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// Count-up animé qui se déclenche quand l'élément entre dans le viewport
function CountUp({ to, format = (n) => n, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setDisplay(format(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, to, duration, format, value]);

  return <span ref={ref}>{display}</span>;
}

const fmtThousands = (n) => n.toLocaleString('fr-FR');

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yOr = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yCoral = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [demoOpen, setDemoOpen] = useState(false);
  const { stats, live } = usePublicStats();

  return (
    <>
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    <section
      ref={ref}
      className="relative overflow-hidden bg-akili-indigo text-akili-papyrus pt-24 pb-26 lg:pt-30"
    >
      {/* Particules Or flottantes (canvas, derrière tout) */}
      <FloatingParticlesBackground
        particleCount={70}
        particleColor="#F2C94C"
        particleOpacity={0.5}
        glowIntensity={14}
        movementSpeed={0.35}
        mouseInfluence={150}
        mouseGravity="attract"
        gravityStrength={45}
      />

      {/* Halo or top-right (parallax) */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -120,
          top: 40,
          width: 480,
          height: 480,
          background:
            'radial-gradient(circle, rgba(242,201,76,0.32) 0%, rgba(242,201,76,0) 60%)',
          y: yOr,
        }}
      />
      {/* Halo corail bottom-left (parallax) */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: -100,
          bottom: -80,
          width: 380,
          height: 380,
          background:
            'radial-gradient(circle, rgba(255,107,92,0.22) 0%, rgba(255,107,92,0) 65%)',
          y: yCoral,
        }}
      />

      <Container size="xl" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Colonne gauche — texte */}
          <div>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or"
            >
              · La sagesse au travail ·
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="font-display font-extrabold text-akili-papyrus mt-5 max-w-[820px] text-balance leading-[0.98] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              <span className="block">La sagesse qui se lève,</span>
              <span className="block mt-2 text-akili-papyrus/85" style={{ fontSize: '0.86em' }}>
                en <span className="text-akili-or">une commande</span>.
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="font-sans text-lg lg:text-xl leading-relaxed mt-6 max-w-[560px] text-akili-indigo-100"
            >
              Akili automatise les corvées du lundi matin — factures, uploads, déploiements.
              Ce qui te prenait des heures devient une commande, puis un réflexe.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3.5 mt-9"
            >
              <Link to="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  shape="pill"
                  iconRight={<ArrowRight size={18} />}
                  className="w-full sm:w-[210px] justify-center whitespace-nowrap"
                >
                  Démarrer
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                shape="pill"
                className="w-full sm:w-[210px] justify-center whitespace-nowrap border-akili-papyrus/30 text-akili-papyrus hover:bg-akili-papyrus/10 hover:border-akili-papyrus/60"
                iconLeft={<Play size={18} fill="currentColor" />}
                onClick={() => setDemoOpen(true)}
              >
                Voir une démo
              </Button>
            </motion.div>

            {/* Stats — branchées sur usePublicStats avec fallback marketing */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="grid grid-cols-3 gap-6 mt-12 max-w-[520px]"
            >
              {/* Stat 1 — heures économisées */}
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-[28px] leading-none tracking-[-0.02em] text-akili-or">
                  <CountUp to={stats.hours} /> h
                </div>
                <div className="font-sans text-[12px] text-akili-charbon-mute mt-1.5 leading-tight">
                  économisées par utilisateur, par mois
                </div>
              </div>

              {/* Stat 2 — automatisations actives (avec dot LIVE si données réelles) */}
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-[28px] leading-none tracking-[-0.02em] text-akili-or inline-flex items-center gap-2">
                  <CountUp to={stats.active} format={fmtThousands} />+
                  {live && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-display font-bold uppercase tracking-wider text-akili-success">
                      <span className="w-1.5 h-1.5 rounded-full bg-akili-success animate-pulse" />
                      live
                    </span>
                  )}
                </div>
                <div className="font-sans text-[12px] text-akili-charbon-mute mt-1.5 leading-tight">
                  automatisations actives
                </div>
              </div>

              {/* Stat 3 — temps setup (statique, claim marketing) */}
              <div>
                <div className="font-display font-extrabold text-2xl lg:text-[28px] leading-none tracking-[-0.02em] text-akili-or">
                  &lt; <CountUp to={stats.setupSec} /> s
                </div>
                <div className="font-sans text-[12px] text-akili-charbon-mute mt-1.5 leading-tight">
                  entre l'idée et l'exécution
                </div>
              </div>
            </motion.div>
          </div>

          {/* Colonne droite — Terminal mockup */}
          <HeroTerminal />
        </div>

        {/* Social proof — villes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-16 pt-10 border-t border-akili-indigo-700/60"
        >
          <p className="text-[10px] uppercase tracking-[0.24em] text-akili-charbon-mute mb-5">
            Déjà adopté à
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {[
              { city: 'Cotonou',  flag: '🇧🇯' },
              { city: 'Lagos',    flag: '🇳🇬' },
              { city: 'Abidjan',  flag: '🇨🇮' },
              { city: 'Dakar',    flag: '🇸🇳' },
              { city: 'Nairobi',  flag: '🇰🇪' },
              { city: 'Paris',    flag: '🇫🇷' },
            ].map(({ city, flag }) => (
              <span
                key={city}
                className="inline-flex items-center gap-2 font-display font-extrabold text-lg text-akili-papyrus/80 hover:text-akili-or transition-colors tracking-tight"
              >
                <span className="text-xl leading-none" aria-hidden>{flag}</span>
                {city}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
    </>
  );
}
