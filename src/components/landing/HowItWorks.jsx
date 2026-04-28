import { motion } from 'framer-motion';
import { ChatCenteredText as MessageSquare, Plugs as PlugZap, Rocket } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const STEPS = [
  {
    n: '01',
    Icon: MessageSquare,
    title: 'Décris ce que tu veux automatiser',
    body: "En français, en swahili, en commandes. Akili comprend et propose la structure.",
  },
  {
    n: '02',
    Icon: PlugZap,
    title: 'Connecte tes outils',
    body: "Drive, Gmail, Stripe, GitHub, ton serveur SSH. Authentification OAuth en deux clics.",
  },
  {
    n: '03',
    Icon: Rocket,
    title: 'Lance, planifie, oublie',
    body: "Manuel, programmé, déclenché par un événement. Akili tient les rênes pendant que tu dors.",
  },
];

const stepReveal = {
  hidden: { opacity: 0, x: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-30 bg-akili-papyrus-warm relative overflow-hidden">
      {/* Halo decoratif subtil */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -100, top: 100, width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(242,201,76,0.10) 0%, rgba(242,201,76,0) 70%)',
        }}
      />
      <Container size="xl" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-20 items-start">
          {/* Colonne gauche */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral"
            >
              Comment ça marche
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4"
            >
              Trois étapes,
              <br />
              <span className="text-akili-charbon-mute">pas trente.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base leading-relaxed text-akili-charbon-soft mt-5 max-w-[400px]"
            >
              Aucun atelier, aucune certification. Tu décris, Akili exécute, tu reprends ton temps.
            </motion.p>

            {/* Mini visuel — barre de progression évocatrice */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block mt-10 p-6 bg-white border border-akili-line rounded-akili"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-akili-charbon-mute mb-3">
                Temps gagné · 1 an
              </div>
              <div className="font-display font-extrabold text-4xl tracking-[-0.03em] text-akili-charbon">
                480 h
              </div>
              <div className="mt-3 h-2 rounded-full bg-akili-papyrus-deep overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '78%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="h-full bg-gradient-to-r from-akili-coral to-akili-or"
                />
              </div>
              <div className="mt-2 text-xs text-akili-charbon-mute font-mono">
                ≈ 12 semaines de travail récupérées
              </div>
            </motion.div>
          </div>

          {/* Colonne droite — steps */}
          <div className="relative flex flex-col gap-4">
            {/* Ligne verticale connective */}
            <div
              aria-hidden
              className="absolute left-[27px] top-[44px] bottom-[44px] w-px bg-gradient-to-b from-akili-coral via-akili-or to-akili-indigo opacity-50"
            />

            {STEPS.map(({ n, Icon, title, body }, i) => (
              <motion.div
                key={n}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={stepReveal}
                className="relative flex gap-5 items-start p-6 bg-white border border-akili-line rounded-akili shadow-akili-xs hover:shadow-akili-sm transition-shadow duration-300"
              >
                {/* Bulle icône (au-dessus de la ligne) */}
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-coral">
                  <Icon size={26} weight="duotone" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-[12px] text-akili-coral font-medium tracking-wider">
                      {n}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-[22px] tracking-[-0.01em] leading-tight">
                    {title}
                  </h3>
                  <p className="font-sans text-[15px] text-akili-charbon-soft mt-2 leading-[1.55]">
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
