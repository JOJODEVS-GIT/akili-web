/**
 * TemplatesGallery — Galerie de templates pré-faits.
 * Surface 8 templates phares parmi les 20 seedés en BDD.
 * CTA "Voir les 20" → /signup ou /app/automations.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkle as Sparkles, Lightning as Zap } from '@phosphor-icons/react';
import {
  SiGmail, SiGoogledrive, SiStripe, SiSlack, SiNotion, SiGithub, SiDiscord,
  SiGooglecalendar, SiGooglesheets, SiPostgresql, SiX, SiVercel, SiToggl,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TEMPLATES, CATEGORIES } from '@/data/templates';
import { cn } from '@/lib/cn';

const INTEGRATION_LOGOS = {
  gmail:    { Icon: SiGmail,          color: '#EA4335' },
  drive:    { Icon: SiGoogledrive,    color: '#1FA463' },
  stripe:   { Icon: SiStripe,         color: '#635BFF' },
  slack:    { Icon: SiSlack,          color: '#4A154B' },
  notion:   { Icon: SiNotion,         color: '#000000' },
  github:   { Icon: SiGithub,         color: '#171515' },
  discord:  { Icon: SiDiscord,        color: '#5865F2' },
  calendar: { Icon: SiGooglecalendar, color: '#4285F4' },
  sheets:   { Icon: SiGooglesheets,   color: '#1FA463' },
  postgres: { Icon: SiPostgresql,     color: '#336791' },
  s3:       { Icon: FaAws,            color: '#FF9900' },
  twitter:  { Icon: SiX,              color: '#000000' },
  vercel:   { Icon: SiVercel,         color: '#000000' },
  toggl:    { Icon: SiToggl,          color: '#E57CD8' },
};

const ACCENT_BY_CATEGORY = {
  files:         { badge: 'indigo', text: 'text-akili-indigo',     bg: 'bg-akili-indigo-50',  ring: 'ring-akili-indigo-100' },
  email:         { badge: 'coral',  text: 'text-akili-coral-700',  bg: 'bg-akili-coral-50',   ring: 'ring-akili-coral-100' },
  invoicing:     { badge: 'or',     text: 'text-akili-or-900',     bg: 'bg-akili-or-50',      ring: 'ring-akili-or-100' },
  calendar:      { badge: 'indigo', text: 'text-akili-indigo',     bg: 'bg-akili-indigo-50',  ring: 'ring-akili-indigo-100' },
  communication: { badge: 'coral',  text: 'text-akili-coral-700',  bg: 'bg-akili-coral-50',   ring: 'ring-akili-coral-100' },
  devops:        { badge: 'or',     text: 'text-akili-or-900',     bg: 'bg-akili-or-50',      ring: 'ring-akili-or-100' },
};

const FILTERS = [
  { id: 'all', label: 'Tous' },
  ...Object.values(CATEGORIES).map((c) => ({ id: c.id, label: c.label })),
];

const FEATURED_IDS = ['t09', 't18', 't08', 't12', 't20', 't02', 't15', 't11'];
const FEATURED = FEATURED_IDS.map((id) => TEMPLATES.find((t) => t.id === id)).filter(Boolean);

function IntegrationChip({ id }) {
  const meta = INTEGRATION_LOGOS[id];
  if (!meta) return null;
  const { Icon, color } = meta;
  return (
    <span
      title={id}
      className="inline-flex items-center justify-center w-6 h-6 rounded-md ring-1 ring-akili-line bg-white"
      style={{ color }}
    >
      <Icon size={13} />
    </span>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function TemplatesGallery() {
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all' ? FEATURED : FEATURED.filter((t) => t.category === filter);

  return (
    <section id="templates" className="py-30 bg-akili-papyrus-deep relative overflow-hidden">
      {/* Halo discret */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -120, top: -80, width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 60%)',
        }}
      />

      <Container size="xl" className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral inline-flex items-center gap-2">
              <Sparkles size={14} weight="fill" /> Templates prêts à l'emploi
            </span>
            <h2 className="font-display font-extrabold text-[44px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
              Lance-toi en 60 secondes,
              <span className="block text-akili-coral">avec un template.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5 max-w-xl">
              Pas envie de tout configurer à la main ? Pioche un template, branche tes outils,
              et c'est parti. <span className="font-semibold text-akili-charbon">20 templates</span>{' '}
              maintenus, testés en production.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'px-4 py-2 rounded-pill font-display font-bold text-xs uppercase tracking-wider transition-all duration-200',
                filter === f.id
                  ? 'bg-akili-indigo text-akili-papyrus shadow-akili-md'
                  : 'bg-white text-akili-charbon-soft border border-akili-line hover:border-akili-indigo hover:text-akili-indigo'
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => {
              const accent = ACCENT_BY_CATEGORY[t.category];
              const cat = CATEGORIES[t.category];
              return (
                <motion.div
                  key={t.id}
                  layout
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={reveal}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                >
                  <Card
                    variant="flat"
                    padding="md"
                    interactive
                    className="group h-full flex flex-col"
                  >
                    {/* Icon + category */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-akili flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
                          accent.bg, accent.text
                        )}
                      >
                        <t.Icon size={20} weight="bold" />
                      </div>
                      <Badge variant={accent.badge}>{cat.label}</Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold text-[15px] leading-[1.25] tracking-[-0.01em] text-balance min-h-[36px]">
                      {t.name}
                    </h3>
                    <p className="font-sans text-[13px] text-akili-charbon-soft mt-2 leading-[1.5] line-clamp-2">
                      {t.desc}
                    </p>

                    {/* Integrations */}
                    <div className="flex items-center gap-1.5 mt-5">
                      {t.integrations.slice(0, 4).map((id) => (
                        <IntegrationChip key={id} id={id} />
                      ))}
                      {t.integrations.length > 4 && (
                        <span className="text-[10px] text-akili-charbon-mute font-medium ml-1">
                          +{t.integrations.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer : savings */}
                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-akili-line/60 mt-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-wider text-akili-charbon-mute">
                        <Zap size={12} weight="fill" className={accent.text} />
                        {t.savings}
                      </span>
                      <ArrowRight size={14} className="text-akili-charbon-mute group-hover:text-akili-coral group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-14"
        >
          <Link to="/signup">
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
              Voir les 20 templates
            </Button>
          </Link>
          <span className="text-sm text-akili-charbon-mute">
            Tous gratuits, branchables en quelques clics.
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
