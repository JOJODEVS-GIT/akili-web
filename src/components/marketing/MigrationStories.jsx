/**
 * MigrationStories — Témoignages "j'ai migré de Zapier à Akili"
 * pour /comparaisons/zapier.
 *
 * 3 stories détaillées avec : profil, contexte, raison de migration,
 * gain mesurable. Plus crédible qu'un simple témoignage.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quotes, ArrowRight, Clock, CurrencyDollar, Globe } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const STORIES = [
  {
    name: 'Aïcha Diallo',
    role: 'Freelance design',
    city: 'Cotonou 🇧🇯',
    initials: 'AD',
    slug: 'aicha',
    before: 'Zapier Pro à 49 $/mois, 6 zaps actifs',
    after: 'Akili Pro à 12 €/mois, 14 automatisations illimitées',
    gain: { Icon: CurrencyDollar, label: '37 €/mois économisés' },
    quote: "Je payais 49 $ par mois pour 6 zaps. Sur Akili je suis à 14 automatisations pour 12 €. Et le support répond en français — j'ai gagné 4× plus pour le tiers du prix.",
    duration: 'Migration en 2h',
    accent: 'coral',
  },
  {
    name: 'Olusola Adeyemi',
    role: 'CTO · agence digitale',
    city: 'Lagos 🇳🇬',
    initials: 'OA',
    slug: 'olusola',
    before: 'Zapier Team à 103 $/mois, 25 zaps, support qui répond en 48h',
    after: 'Akili Team à 39 €/mois, support FR sous 4h',
    gain: { Icon: Clock, label: '12× plus rapide à débugger' },
    quote: "Le support Zapier nous répondait en 48h pour des bugs critiques sur des intégrations Stripe. Akili : 4h max, en français, par un humain qui comprend notre stack. Migration = no-brainer.",
    duration: 'Migration en 1 semaine',
    accent: 'or',
  },
  {
    name: 'Mamadou Sow',
    role: 'Lead dev · scale-up fintech',
    city: 'Dakar 🇸🇳',
    initials: 'MS',
    slug: 'mamadou',
    before: 'Zapier + Make en parallèle, 80 $/mois total',
    after: 'Akili Pro 12 €/mois + roadmap Wave/Orange Money',
    gain: { Icon: Globe, label: 'Intégrations africaines à venir' },
    quote: "Zapier ne couvrira jamais Wave ou Orange Money. Akili a Wave dans sa roadmap Q3. Pour une fintech africaine, c'est strictement non-négociable.",
    duration: 'Migration en 3 jours',
    accent: 'indigo',
  },
];

const ACCENTS = {
  coral:  { ring: 'ring-akili-coral',   bg: 'bg-akili-coral-50',   text: 'text-akili-coral-700' },
  or:     { ring: 'ring-akili-or',      bg: 'bg-akili-or-50',      text: 'text-akili-or-900' },
  indigo: { ring: 'ring-akili-indigo',  bg: 'bg-akili-indigo-50',  text: 'text-akili-indigo' },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function Avatar({ slug, name, initials, accent }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <span className="w-12 h-12 rounded-full bg-akili-indigo text-akili-or font-display font-extrabold text-sm flex items-center justify-center">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={`https://i.pravatar.cc/200?u=akili-${slug}`}
      alt={name}
      width={48}
      height={48}
      onError={() => setErrored(true)}
      className={`w-12 h-12 rounded-full object-cover ring-2 ring-inset ${ACCENTS[accent].ring}`}
    />
  );
}

export function MigrationStories() {
  return (
    <section className="py-22 bg-akili-papyrus">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral inline-flex items-center gap-2">
            <ArrowRight size={14} weight="bold" /> Histoires de migration
          </span>
          <h2 className="font-display font-extrabold text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Trois équipes qui ont quitté Zapier
            <span className="block text-akili-coral">pour Akili.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Chaque histoire avec son contexte avant/après et son gain mesurable.
            Pas de marketing creux.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
          {STORIES.map((story, i) => {
            const accent = ACCENTS[story.accent];
            return (
              <motion.article
                key={story.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={reveal}
                className="bg-white rounded-akili border border-akili-line p-6 lg:p-7 hover:shadow-akili-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                {/* Avatar + identity */}
                <div className="flex items-center gap-4">
                  <Avatar slug={story.slug} name={story.name} initials={story.initials} accent={story.accent} />
                  <div>
                    <div className="font-display font-extrabold text-[15px] text-akili-charbon">
                      {story.name}
                    </div>
                    <div className="font-sans text-[12px] text-akili-charbon-mute">
                      {story.role}
                    </div>
                    <div className="font-sans text-[11px] text-akili-charbon-mute mt-0.5">
                      {story.city}
                    </div>
                  </div>
                </div>

                {/* Before/After */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-12 text-[10px] font-display font-bold uppercase tracking-wider text-akili-charbon-mute">
                      Avant
                    </span>
                    <span className="text-[12px] text-akili-charbon-soft leading-[1.5] line-through opacity-70">
                      {story.before}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-12 text-[10px] font-display font-bold uppercase tracking-wider text-akili-coral">
                      Après
                    </span>
                    <span className="text-[12px] text-akili-charbon leading-[1.5] font-medium">
                      {story.after}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-5 relative">
                  <Quotes
                    size={20}
                    weight="fill"
                    className={`${accent.text} opacity-30 -mb-1`}
                  />
                  <p className="font-display font-bold text-[14px] leading-[1.5] tracking-[-0.01em] text-akili-charbon mt-2">
                    « {story.quote} »
                  </p>
                </blockquote>

                {/* Gain footer */}
                <div className={`mt-auto pt-5 mt-5 border-t border-akili-line/60 flex items-center justify-between gap-2`}>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${accent.bg} ${accent.text}`}>
                    <story.gain.Icon size={12} weight="bold" />
                    <span className="font-display font-bold text-[11px] uppercase tracking-wider whitespace-nowrap">
                      {story.gain.label}
                    </span>
                  </div>
                  <span className="font-sans text-[11px] text-akili-charbon-mute italic">
                    {story.duration}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="text-center font-sans text-sm text-akili-charbon-mute mt-10 italic">
          *Histoires basées sur des cas réels d'utilisateurs beta — noms et photos placeholder à swap au launch.
        </p>
      </Container>
    </section>
  );
}
