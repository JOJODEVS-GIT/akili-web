import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Play } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { HeroTerminal } from './HeroTerminal';
import { DemoModal } from './DemoModal';

const STATS = [
  { value: '40 h',   label: 'économisées par mois en moyenne' },
  { value: '2 800+', label: 'automatisations actives' },
  { value: '< 60 s', label: "entre l'idée et l'exécution" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yOr = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yCoral = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    <section
      ref={ref}
      className="relative overflow-hidden bg-akili-indigo text-akili-papyrus pt-24 pb-26 lg:pt-30"
    >
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
              · Nuit &amp; Lumière ·
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
                en <span className="text-akili-or">un seul clic</span>.
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="font-sans text-lg lg:text-xl leading-relaxed mt-6 max-w-[560px] text-akili-indigo-100"
            >
              Akili automatise les tâches informatiques répétitives — uploads, factures, déploiements.
              Ce qui prend des heures à la main devient une commande, puis un réflexe.
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
                  iconRight={<ArrowRight size={18} />}
                  className="w-full sm:w-[210px] justify-center whitespace-nowrap"
                >
                  Démarrer
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-[210px] justify-center whitespace-nowrap border-akili-papyrus/30 text-akili-papyrus hover:bg-akili-papyrus/10 hover:border-akili-papyrus/60"
                iconLeft={<Play size={18} fill="currentColor" />}
                onClick={() => setDemoOpen(true)}
              >
                Voir une démo
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="grid grid-cols-3 gap-6 mt-12 max-w-[520px]"
            >
              {STATS.map((s) => (
                <div key={s.value}>
                  <div className="font-display font-extrabold text-2xl lg:text-[28px] leading-none tracking-[-0.02em] text-akili-or">
                    {s.value}
                  </div>
                  <div className="font-sans text-[12px] text-akili-charbon-mute mt-1.5 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Colonne droite — Terminal mockup */}
          <HeroTerminal />
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 pt-10 border-t border-akili-indigo-700/60"
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
