import { motion } from 'framer-motion';
import { Lightning as Zap, Sparkle as Sparkles, Compass } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

/**
 * Features — Trois piliers en zigzag connectés par courbes ondulées
 * Cards 1 & 3 en haut, card 2 décalée vers le bas. Badges circulaires en saillie.
 * Inspiration : infographie process en 3 étapes (Pinterest).
 * Charte Akili : Coral → Indigo → Or.
 */

const FEATURES = [
  {
    n: '01',
    Icon: Zap,
    title: 'Intelligent',
    body: "Akili apprend tes flux et propose des automatisations qui ont du sens. Pas de no-code bricolé : du vrai discernement.",
    accentHex: '#FF6B5C',
    badgeBorderClass: 'border-akili-coral',
    cardBorderClass: 'border-akili-coral',
    titleColorClass: 'text-akili-coral',
    iconColorClass: 'text-akili-coral',
    badgeAt: 'top-left',
    offsetClass: '',
  },
  {
    n: '02',
    Icon: Compass,
    title: 'Africain',
    body: "Conçu en Afrique pour le monde. Latence faible, monnaies locales, fuseaux qui font sens.",
    accentHex: '#0E1A3E',
    badgeBorderClass: 'border-akili-indigo',
    cardBorderClass: 'border-akili-indigo',
    titleColorClass: 'text-akili-indigo',
    iconColorClass: 'text-akili-indigo',
    badgeAt: 'bottom-left',
    offsetClass: 'md:mt-32',
  },
  {
    n: '03',
    Icon: Sparkles,
    title: 'Direct',
    body: "Une commande, un clic, un raccourci clavier. Aucune ligne de code, aucun PDF de 80 pages à lire avant de commencer.",
    accentHex: '#F2C94C',
    badgeBorderClass: 'border-akili-or',
    cardBorderClass: 'border-akili-or',
    titleColorClass: 'text-akili-or-700',
    iconColorClass: 'text-akili-or-700',
    badgeAt: 'top-right',
    offsetClass: '',
  },
];

const cardReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const pathDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.4 + i * 0.3, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
      opacity: { delay: 0.4 + i * 0.3, duration: 0.3 },
    },
  }),
};

export function Features() {
  return (
    <section id="produit" className="py-30 bg-akili-papyrus overflow-hidden">
      <Container size="xl">
        {/* Eyebrow + Titre */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral"
        >
          Trois piliers
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-4 max-w-[800px] text-balance"
        >
          Pensé pour ceux qui font, pas pour ceux qui regardent.
        </motion.h2>

        {/* Wrapper des 3 cards avec courbes connectives en arrière-plan */}
        <div className="relative mt-20 md:mt-24">
          {/* SVG des courbes ondulées (visible desktop uniquement) */}
          <svg
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1200 480"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B5C" />
                <stop offset="100%" stopColor="#0E1A3E" />
              </linearGradient>
              <linearGradient id="wave-2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0E1A3E" />
                <stop offset="100%" stopColor="#F2C94C" />
              </linearGradient>
            </defs>

            {/* Courbe Card 1 → Card 2 */}
            <motion.path
              d="M 380 180 C 440 180, 460 320, 540 380 S 660 440, 720 420"
              stroke="url(#wave-1)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={pathDraw}
            />
            {/* Petit dot au point de jonction droite de la courbe 1 */}
            <motion.circle
              cx="720"
              cy="420"
              r="4"
              fill="#0E1A3E"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />

            {/* Courbe Card 2 → Card 3 */}
            <motion.path
              d="M 720 380 C 780 360, 800 220, 880 180 S 1000 140, 1060 160"
              stroke="url(#wave-2)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={pathDraw}
            />
            <motion.circle
              cx="1060"
              cy="160"
              r="4"
              fill="#F2C94C"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8, duration: 0.3 }}
            />
          </svg>

          {/* Grille des 3 cards */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.n}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={cardReveal}
                className={`relative ${f.offsetClass}`}
              >
                {/* Card squircle */}
                <div
                  className={`relative bg-white border-2 ${f.cardBorderClass} rounded-[40px] px-8 pt-16 pb-10 shadow-[0_24px_50px_-20px_rgba(14,26,62,0.18)] transition-all duration-400 ease-akili hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(14,26,62,0.25)]`}
                >
                  {/* Numéro filigrane */}
                  <span className="absolute top-5 right-7 font-mono text-[11px] text-akili-charbon-mute font-medium tracking-wider">
                    {f.n}
                  </span>

                  {/* Titre */}
                  <h3 className={`font-display font-extrabold text-[26px] tracking-[-0.02em] ${f.titleColorClass}`}>
                    {f.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[15px] leading-relaxed text-akili-charbon-soft mt-3">
                    {f.body}
                  </p>
                </div>

                {/* Badge circulaire en saillie */}
                <BadgeIcon feature={f} index={i} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Punchline en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-3 text-akili-charbon-mute"
        >
          <span className="font-mono text-sm">3 piliers</span>
          <span className="text-akili-coral">·</span>
          <span className="font-mono text-sm">1 conviction</span>
          <span className="text-akili-or">·</span>
          <span className="font-mono text-sm">0 compromis</span>
        </motion.div>
      </Container>
    </section>
  );
}

/**
 * Badge circulaire avec icône, en saillie sur le bord de la card.
 * Position varie selon le pilier : top-left, bottom-left, top-right.
 */
function BadgeIcon({ feature, index }) {
  const { Icon, badgeAt, badgeBorderClass, iconColorClass, accentHex } = feature;

  const positionClasses = {
    'top-left': 'left-6 -top-9',
    'bottom-left': 'left-6 -bottom-9',
    'top-right': 'right-6 -top-9',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: 0.3 + index * 0.18,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // bouncy ease pour pop
      }}
      className={`absolute ${positionClasses[badgeAt]} z-20`}
    >
      <div
        className={`w-[72px] h-[72px] rounded-full bg-white border-2 ${badgeBorderClass} flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(14,26,62,0.18)]`}
        style={{ '--ring-glow': `${accentHex}20` }}
      >
        <Icon size={32} weight="duotone" className={iconColorClass} />
      </div>
    </motion.div>
  );
}
