/**
 * Comparison — Tableau de positionnement Akili vs Zapier vs Make vs n8n.
 *
 * Honnête : on souligne ce qu'on fait mieux (FR, prix, support, contexte
 * africain) sans cacher ce qu'on a pas encore (intégrations massives).
 * La colonne Akili est mise en avant via fond Or doux + bordures.
 */
import { motion } from 'framer-motion';
import { Check, X, Minus, ArrowRight } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const COMPETITORS = [
  { id: 'akili',  name: 'Akili',  tagline: 'Tout en français',     featured: true  },
  { id: 'zapier', name: 'Zapier', tagline: 'Le standard US',       featured: false },
  { id: 'make',   name: 'Make',   tagline: 'Visual builder',       featured: false },
  { id: 'n8n',    name: 'n8n',    tagline: 'Open source / self',   featured: false },
];

// values: 'yes' | 'no' | 'partial' | string
const ROWS = [
  {
    label: 'Interface en français natif',
    values: { akili: 'yes',     zapier: 'partial', make: 'partial', n8n: 'no' },
    note: 'Pas une simple traduction — pensé en français dès l\'origine.',
  },
  {
    label: 'Support en français (humain)',
    values: { akili: '< 4 h',   zapier: 'no',      make: 'no',      n8n: 'community' },
  },
  {
    label: 'Erreurs humanisées en français',
    values: { akili: 'yes',     zapier: 'no',      make: 'no',      n8n: 'no' },
  },
  {
    label: 'Prix de départ',
    values: { akili: '12 €/mo', zapier: '20 €/mo', make: '11 €/mo', n8n: 'self / 24 €' },
    note: 'Nos automatisations sont illimitées dès le 1er plan payant.',
  },
  {
    label: 'Tâches illimitées sur plan payant',
    values: { akili: 'yes',     zapier: 'no',      make: 'partial', n8n: 'yes' },
  },
  {
    label: 'Hébergement européen (RGPD)',
    values: { akili: 'yes',     zapier: 'partial', make: 'partial', n8n: 'self' },
  },
  {
    label: 'Intégrations africaines prévues',
    values: { akili: 'roadmap', zapier: 'no',      make: 'no',      n8n: 'no' },
    note: 'Wave, Orange Money, MTN MoMo — Q3 2026.',
  },
  {
    label: 'Templates prêts à l\'emploi',
    values: { akili: '20+',     zapier: '6 000+',  make: '300+',    n8n: '900+' },
    note: 'On préfère 20 templates testés à 6 000 abandonnés.',
  },
  {
    label: 'Setup d\'une 1re automatisation',
    values: { akili: '60 s',    zapier: '5 min',   make: '10 min',  n8n: '30 min' },
  },
];

const DOT_STYLES = {
  yes:    { className: 'bg-akili-success/15 text-akili-success', Icon: Check, weight: 'bold' },
  no:     { className: 'bg-akili-coral-50 text-akili-coral-700', Icon: X,     weight: 'bold' },
  partial:{ className: 'bg-akili-or-50 text-akili-or-900',       Icon: Minus, weight: 'bold' },
};

function Cell({ value, isFeatured }) {
  // Booléen visuel
  if (value === 'yes' || value === 'no' || value === 'partial') {
    const style = DOT_STYLES[value];
    return (
      <span
        className={cn(
          'inline-flex w-7 h-7 rounded-full items-center justify-center',
          style.className
        )}
      >
        <style.Icon size={14} weight={style.weight} />
      </span>
    );
  }
  // Texte (prix, durée, etc.)
  return (
    <span
      className={cn(
        'font-display font-bold text-[13px] tracking-tight',
        isFeatured ? 'text-akili-coral-700' : 'text-akili-charbon'
      )}
    >
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section
      id="comparaison"
      className="py-30 bg-akili-papyrus relative overflow-hidden"
    >
      {/* Halo or */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -100,
          top: 80,
          width: 480,
          height: 480,
          background:
            'radial-gradient(circle, rgba(242,201,76,0.10) 0%, rgba(242,201,76,0) 60%)',
        }}
      />

      <Container size="xl" className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            · Pourquoi Akili plutôt qu'un autre ·
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Honnêtes sur ce qu'on fait{' '}
            <span className="text-akili-coral">mieux</span>,
            <span className="block">honnêtes sur le reste.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            On a moins d'intégrations que Zapier, on n'est pas open source comme n8n.
            Mais sur le français, le prix, le support et le contexte africain, on est devant.
          </p>
        </motion.div>

        {/* Tableau — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block mt-16 max-w-5xl mx-auto bg-white rounded-3xl border border-akili-line overflow-hidden shadow-akili-md"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] border-b border-akili-line">
            <div className="px-6 py-5" />
            {COMPETITORS.map((c) => (
              <div
                key={c.id}
                className={cn(
                  'px-3 py-5 text-center border-l border-akili-line/60',
                  c.featured && 'bg-akili-or-50/60 relative'
                )}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center bg-akili-coral text-white text-[10px] font-display font-bold uppercase tracking-wider px-2.5 py-1 rounded-pill shadow-akili-coral">
                    Nous
                  </span>
                )}
                <div className="font-display font-extrabold text-base tracking-[-0.02em] text-akili-charbon">
                  {c.name}
                </div>
                <div className="font-sans text-[11px] text-akili-charbon-mute mt-0.5 leading-tight">
                  {c.tagline}
                </div>
              </div>
            ))}
          </div>

          {/* Body rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                'grid grid-cols-[1.4fr_repeat(4,1fr)] items-center',
                i !== ROWS.length - 1 && 'border-b border-akili-line/60'
              )}
            >
              <div className="px-6 py-4">
                <div className="font-display font-bold text-[14px] text-akili-charbon">
                  {row.label}
                </div>
                {row.note && (
                  <div className="font-sans text-[11px] text-akili-charbon-mute mt-1 italic leading-tight">
                    {row.note}
                  </div>
                )}
              </div>
              {COMPETITORS.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    'px-3 py-4 text-center border-l border-akili-line/60',
                    c.featured && 'bg-akili-or-50/40'
                  )}
                >
                  <Cell value={row.values[c.id]} isFeatured={c.featured} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Vue mobile — uniquement Akili vs Zapier (le compétiteur le plus connu) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:hidden mt-12 bg-white rounded-3xl border border-akili-line overflow-hidden shadow-akili-md"
        >
          <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-akili-line">
            <div />
            <div className="px-3 py-4 text-center bg-akili-or-50 border-l border-akili-line/60">
              <div className="font-display font-extrabold text-akili-charbon">Akili</div>
              <div className="font-sans text-[10px] text-akili-coral-700 font-bold uppercase tracking-wider mt-0.5">
                Nous
              </div>
            </div>
            <div className="px-3 py-4 text-center border-l border-akili-line/60">
              <div className="font-display font-extrabold text-akili-charbon">Zapier</div>
              <div className="font-sans text-[10px] text-akili-charbon-mute mt-0.5">
                Standard US
              </div>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                'grid grid-cols-[1.3fr_1fr_1fr] items-center',
                i !== ROWS.length - 1 && 'border-b border-akili-line/60'
              )}
            >
              <div className="px-4 py-3">
                <div className="font-display font-bold text-[12px] text-akili-charbon leading-tight">
                  {row.label}
                </div>
              </div>
              <div className="px-2 py-3 text-center bg-akili-or-50/50 border-l border-akili-line/60">
                <Cell value={row.values.akili} isFeatured />
              </div>
              <div className="px-2 py-3 text-center border-l border-akili-line/60">
                <Cell value={row.values.zapier} isFeatured={false} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-akili-coral text-white px-6 py-3 rounded-akili font-display font-bold text-sm hover:bg-akili-coral-700 hover:shadow-akili-coral transition-all duration-200 group"
          >
            Essayer Akili gratuitement
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <span className="font-sans text-sm text-akili-charbon-mute">
            14 jours · sans CB · annulation 1 clic
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
