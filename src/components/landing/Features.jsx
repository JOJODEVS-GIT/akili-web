import { motion } from 'framer-motion';
import { Lightning as Zap, Sparkle as Sparkles, Compass } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const FEATURES = [
  {
    n: '01',
    Icon: Zap,
    title: 'Intelligent',
    body: "Akili apprend tes flux et propose des automatisations qui ont du sens. Pas de no-code bricolé : du vrai discernement.",
    accent: 'coral',
    bgAccent: 'bg-akili-coral-50',
    textAccent: 'text-akili-coral',
    border: 'border-t-akili-coral',
  },
  {
    n: '02',
    Icon: Sparkles,
    title: 'Accessible',
    body: "Une commande, un clic, un raccourci clavier. Aucune ligne de code, aucun PDF de 80 pages à lire avant de commencer.",
    accent: 'or',
    bgAccent: 'bg-akili-or-50',
    textAccent: 'text-akili-or-700',
    border: 'border-t-akili-or',
  },
  {
    n: '03',
    Icon: Compass,
    title: 'Africain',
    body: "Conçu en Afrique pour le monde. Latence faible, monnaies locales, fuseaux qui font sens.",
    accent: 'indigo',
    bgAccent: 'bg-akili-indigo-50',
    textAccent: 'text-akili-indigo',
    border: 'border-t-akili-indigo',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Features() {
  return (
    <section id="produit" className="py-30 bg-akili-papyrus">
      <Container size="xl">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {FEATURES.map(({ n, Icon, title, body, bgAccent, textAccent, border }, i) => (
            <motion.div
              key={n}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={reveal}
              className={`relative bg-white rounded-akili border-t-4 ${border} border-x border-b border-akili-line/60 p-8 transition-all duration-300 ease-akili hover:-translate-y-1 hover:shadow-akili-lg`}
            >
              {/* Numéro en filigrane */}
              <span className="absolute top-6 right-7 font-mono text-xs text-akili-charbon-mute font-medium tracking-wider">
                {n}
              </span>

              {/* Icône large + colorée */}
              <div className={`w-16 h-16 rounded-akili ${bgAccent} flex items-center justify-center ${textAccent}`}>
                <Icon size={32} strokeWidth={1.75} />
              </div>

              <h3 className="font-display font-extrabold text-[28px] tracking-[-0.02em] mt-6">
                {title}
              </h3>
              <p className="font-sans text-[15px] leading-relaxed text-akili-charbon-soft mt-3">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Punchline en bas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 text-akili-charbon-mute"
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
