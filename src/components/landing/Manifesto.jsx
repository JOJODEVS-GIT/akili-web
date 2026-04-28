/**
 * Manifesto — "Pourquoi Akili" / l'histoire derrière le produit.
 *
 * Section éditoriale, ton chaleureux, pas commerciale.
 * Layout magazine : citation grosse à gauche, paragraphes de l'histoire
 * à droite, signature équipe en bas. Fond Indigo Nuit pour casser le
 * rythme et marquer le moment "voix de la marque".
 */
import { motion } from 'framer-motion';
import { Sun, MapPin, Users } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const PARAGRAPHS = [
  {
    body:
      "On a passé des années à voir nos amis devs, freelances, comptables, créateurs galérer. Zapier en anglais, factures à 50 € le mois pour cinq automatisations, support qui répond en 48 h dans une langue qui n'est pas la nôtre. On a entendu mille fois la même phrase : « j'aimerais juste que ce truc marche en français et qu'il comprenne mes outils. »",
  },
  {
    body:
      "Akili est née de ça. À Cotonou, en 2025, autour d'une idée simple : l'automatisation ne doit pas être un luxe californien. Ce qui prend des heures à la main doit pouvoir devenir une commande, en français, payée en CFA si on veut, hébergée en Europe pour la conformité, supportée par une équipe qui décroche le téléphone aux heures de bureau d'Abidjan.",
  },
  {
    body:
      "Le mot « Akili » veut dire sagesse en swahili. Pas la sagesse érudite — la sagesse pratique, celle qui se lève chaque matin, qui sait quand il faut faire confiance à la machine et quand il faut reprendre la main. C'est ça qu'on construit. Pas un n-ième concurrent de Zapier. Un outil africain contemporain, qui parle ta langue, qui comprend ton fuseau, et qui te rend tes dimanches.",
  },
];

const PILLARS = [
  { Icon: MapPin, label: 'Conçu à Cotonou', detail: 'Bénin · Lagos · Paris' },
  { Icon: Users,  label: '5 personnes',     detail: 'Devs, designer, ops' },
  { Icon: Sun,    label: 'Lancé en 2026',   detail: 'Beta privée depuis janvier' },
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-30 bg-akili-indigo text-akili-papyrus relative overflow-hidden"
    >
      {/* Halo soleil levant — central, métaphore "sagesse qui se lève" */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '8%',
          width: 720,
          height: 720,
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(242,201,76,0.20) 0%, rgba(242,201,76,0.05) 35%, rgba(242,201,76,0) 70%)',
        }}
      />
      {/* Ligne d'horizon dorée subtile */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-akili-or/30 to-transparent"
      />

      <Container size="xl" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or">
            · Manifesto ·
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 mt-10 items-start">
          {/* Colonne gauche — citation grosse */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="font-display font-extrabold text-[40px] sm:text-[52px] lg:text-[60px] leading-[0.98] tracking-[-0.04em] text-balance">
              <span className="block">L'automatisation</span>
              <span className="block text-akili-or">
                ne doit pas être
              </span>
              <span className="block">un luxe</span>
              <span className="block text-akili-charbon-mute">californien.</span>
            </h2>

            {/* Pillars petits */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {PILLARS.map(({ Icon, label, detail }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <span className="w-8 h-8 rounded-md bg-akili-or-50/10 text-akili-or flex items-center justify-center">
                    <Icon size={16} weight="duotone" />
                  </span>
                  <span className="font-display font-bold text-[12px] text-akili-papyrus leading-tight">
                    {label}
                  </span>
                  <span className="font-sans text-[10px] text-akili-charbon-mute leading-tight">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Colonne droite — paragraphes de l'histoire */}
          <div className="flex flex-col gap-7">
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                className="font-sans text-[16.5px] sm:text-[17.5px] leading-[1.7] text-akili-indigo-100"
              >
                {/* Initiale dorée sur le 1er paragraphe — détail magazine */}
                {i === 0 ? (
                  <>
                    <span className="float-left mr-3 mt-1 font-display font-extrabold text-[64px] leading-[0.85] tracking-[-0.05em] text-akili-or">
                      O
                    </span>
                    {p.body.slice(1)}
                  </>
                ) : (
                  p.body
                )}
              </motion.p>
            ))}

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 pt-6 border-t border-akili-indigo-700 flex items-center justify-between"
            >
              <div>
                <p className="font-display font-bold text-akili-papyrus tracking-tight">
                  L'équipe Akili
                </p>
                <p className="font-sans text-[12px] text-akili-charbon-mute mt-0.5">
                  Cotonou · Lagos · Paris
                </p>
              </div>
              <span className="font-display font-extrabold text-[11px] tracking-[0.2em] uppercase text-akili-or">
                — la sagesse qui se lève
              </span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
