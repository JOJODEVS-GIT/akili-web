import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Sparkle as Sparkles } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

/**
 * Pricing — Trois plans avec toggle mensuel/annuel (-10%).
 * Inspiration : design pricing JubeoConnect (Pinterest).
 * Plans :
 *  • Atelier  → bg papyrus-warm, CTA blanc (gratuit)
 *  • Pro      → bg or, populaire, plus haute, CTA indigo
 *  • Team     → bg indigo nuit, CTA papyrus
 */

const PLANS = [
  {
    id: 'atelier',
    name: 'Atelier',
    monthly: 0,
    tagline: 'Pour mettre les mains dedans, sans engagement.',
    coverage: [
      { label: 'Workflows actifs', value: '5' },
      { label: 'Exécutions / mois', value: '500' },
      { label: 'Connexions', value: '8' },
    ],
    features: [
      'Toutes les intégrations essentielles',
      'Support communautaire',
      'Heatmap d\'activité 30 jours',
    ],
    cta: 'Créer mon compte',
    theme: 'light',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 12,
    tagline: 'Pour les indés qui ne veulent plus passer leurs dimanches sur Stripe.',
    coverage: [
      { label: 'Workflows actifs', value: '∞' },
      { label: 'Exécutions / mois', value: '∞' },
      { label: 'Connexions', value: '∞' },
    ],
    features: [
      'Toutes les connexions',
      'Webhooks personnalisés',
      'Support 24h en français',
      'Heatmap d\'activité 1 an',
    ],
    cta: 'Commencer 14 jours gratuits',
    theme: 'or',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 39,
    tagline: 'Pour les agences et PMEs qui ont besoin de gouvernance.',
    coverage: [
      { label: 'Workflows actifs', value: '∞' },
      { label: 'Utilisateurs', value: '10' },
      { label: 'Espaces partagés', value: '∞' },
    ],
    features: [
      'Tout le plan Pro',
      'Logs avancés et audit',
      'SSO + permissions granulaires',
      'Account manager dédié',
    ],
    cta: 'Parler à l\'équipe',
    theme: 'dark',
    popular: false,
  },
];

const ANNUAL_DISCOUNT = 0.1; // -10%

/** Convertit un prix mensuel en parts entière + décimale, applique la remise annuelle si besoin */
function splitPrice(monthly, annual) {
  if (monthly === 0) return { int: 'Free', dec: '' };
  const final = annual ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
  const [int, dec] = final.toFixed(2).split('.');
  // Si décimales = "00", on n'affiche pas
  return { int, dec: dec === '00' ? '' : dec };
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="tarifs" className="py-30 bg-akili-papyrus relative overflow-hidden">
      {/* Halo doux derrière */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: 80, width: 600, height: 600, transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(242,201,76,0.10) 0%, rgba(242,201,76,0) 60%)',
        }}
      />

      <Container size="xl" className="relative">
        {/* Header centré */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Tarifs
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Des prix simples & transparents.
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5 max-w-xl mx-auto">
            Pas de frais cachés. Pas d'engagement. Tu peux changer de plan à tout moment.
          </p>
        </motion.div>

        {/* Toggle Mensuel / Annuel */}
        <BillingToggle annual={annual} setAnnual={setAnnual} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-14 max-w-5xl mx-auto items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} annual={annual} index={i} />
          ))}
        </div>

        {/* Note bas */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-akili-charbon-mute mt-12"
        >
          Tous les plans incluent : chiffrement AES-256, hébergement européen, et la fierté d'utiliser un produit conçu en Afrique.
        </motion.p>
      </Container>
    </section>
  );
}

/* ─────────────────────────── BillingToggle ─────────────────────────── */

function BillingToggle({ annual, setAnnual }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-10 flex items-center justify-center gap-4 flex-wrap"
    >
      <span
        className={`font-sans text-sm font-medium transition-colors ${
          annual ? 'text-akili-charbon-mute' : 'text-akili-charbon'
        }`}
      >
        Mensuellement
      </span>

      {/* Switch pill */}
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        aria-label="Basculer entre tarif mensuel et annuel"
        onClick={() => setAnnual(!annual)}
        className="relative w-14 h-8 rounded-full bg-akili-indigo transition-colors duration-300 ease-akili focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-akili-or focus-visible:ring-offset-2"
      >
        <motion.span
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-akili-sm"
          animate={{ x: annual ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </button>

      <span
        className={`font-sans text-sm font-medium transition-colors ${
          annual ? 'text-akili-charbon' : 'text-akili-charbon-mute'
        }`}
      >
        Annuellement{' '}
        <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-pill bg-akili-or/30 text-akili-charbon font-display font-bold text-[11px] tracking-wide">
          économisez 10%
        </span>
      </span>
    </motion.div>
  );
}

/* ─────────────────────────── PricingCard ─────────────────────────── */

function PricingCard({ plan, annual, index }) {
  const { int, dec } = splitPrice(plan.monthly, annual);

  // Thèmes couleur par plan
  const themes = {
    light: {
      cardBg: 'bg-akili-papyrus-warm',
      title: 'text-akili-charbon',
      tagline: 'text-akili-charbon-soft',
      priceColor: 'text-akili-charbon',
      symbolColor: 'text-akili-charbon-mute',
      sectionLabel: 'text-akili-charbon',
      rowBg: 'bg-white/60',
      rowText: 'text-akili-charbon',
      rowValue: 'text-akili-charbon font-bold',
      checkBg: 'bg-akili-papyrus-deep',
      checkColor: 'text-akili-success',
      featureText: 'text-akili-charbon-soft',
      ctaClass: 'bg-white text-akili-charbon hover:bg-akili-papyrus-deep border border-akili-line',
    },
    or: {
      cardBg: 'bg-akili-or',
      title: 'text-akili-charbon',
      tagline: 'text-akili-charbon-soft',
      priceColor: 'text-akili-charbon',
      symbolColor: 'text-akili-charbon',
      sectionLabel: 'text-akili-charbon',
      rowBg: 'bg-white/40',
      rowText: 'text-akili-charbon',
      rowValue: 'text-akili-charbon font-bold',
      checkBg: 'bg-white/60',
      checkColor: 'text-akili-charbon',
      featureText: 'text-akili-charbon',
      ctaClass: 'bg-akili-indigo text-white hover:bg-akili-indigo-700 shadow-akili-sm',
    },
    dark: {
      cardBg: 'bg-akili-indigo',
      title: 'text-akili-papyrus',
      tagline: 'text-akili-papyrus/70',
      priceColor: 'text-akili-papyrus',
      symbolColor: 'text-akili-papyrus/60',
      sectionLabel: 'text-akili-papyrus',
      rowBg: 'bg-akili-indigo-700/60',
      rowText: 'text-akili-papyrus/90',
      rowValue: 'text-akili-papyrus font-bold',
      checkBg: 'bg-akili-or/20',
      checkColor: 'text-akili-or',
      featureText: 'text-akili-papyrus/85',
      ctaClass: 'bg-akili-papyrus text-akili-charbon hover:bg-white shadow-akili-sm',
    },
  };

  const t = themes[plan.theme];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={reveal}
      className={`relative rounded-[32px] p-7 lg:p-8 transition-all duration-400 ease-akili hover:-translate-y-1 ${t.cardBg} ${
        plan.popular ? 'md:-mt-8 md:pb-10 shadow-[0_30px_60px_-20px_rgba(242,201,76,0.45)] hover:shadow-[0_40px_80px_-20px_rgba(242,201,76,0.55)]' : 'shadow-[0_20px_40px_-20px_rgba(14,26,62,0.18)] hover:shadow-[0_30px_50px_-20px_rgba(14,26,62,0.25)]'
      }`}
    >
      {/* Badge POPULAIRE */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-akili-indigo text-white text-[11px] font-display font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-pill shadow-akili-md">
          <Sparkles size={12} weight="fill" /> Populaire
        </div>
      )}

      {/* Nom du plan */}
      <h3 className={`font-display font-extrabold text-[28px] tracking-[-0.02em] text-center ${t.title}`}>
        {plan.name}
      </h3>
      <p className={`font-sans text-sm leading-relaxed text-center mt-1.5 ${t.tagline}`}>
        {plan.tagline}
      </p>

      {/* Prix */}
      <div className="flex items-start justify-center gap-1 mt-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${plan.id}-${annual}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-start"
          >
            {plan.monthly > 0 && (
              <span className={`font-display font-bold text-[28px] mt-2 ${t.symbolColor}`}>€</span>
            )}
            <span className={`font-display font-extrabold text-[64px] leading-none tracking-[-0.04em] ${t.priceColor}`}>
              {int}
            </span>
            {dec && (
              <span className={`font-display font-bold text-[20px] mt-2 ${t.priceColor}`}>
                {dec}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className={`font-display font-bold text-[11px] tracking-[0.18em] uppercase text-center mt-2 ${t.symbolColor}`}>
        {plan.monthly === 0 ? 'À vie' : 'Par mois'}
      </p>

      {/* CTA */}
      <Link
        to={plan.id === 'team' ? '#contact' : '/signup'}
        className={`block mt-7 w-full text-center font-display font-bold text-[15px] h-12 leading-[3rem] rounded-pill transition-all duration-200 ease-akili ${t.ctaClass}`}
      >
        {plan.cta}
      </Link>

      {/* Section Couverture */}
      <div className="mt-8">
        <h4 className={`font-display font-bold text-sm tracking-tight ${t.sectionLabel}`}>
          Couverture
        </h4>
        <ul className="mt-3 space-y-2">
          {plan.coverage.map((row) => (
            <li
              key={row.label}
              className={`flex items-center justify-between rounded-akili px-4 py-2.5 ${t.rowBg}`}
            >
              <span className={`flex items-center gap-1.5 text-sm ${t.rowText}`}>
                {row.label}
                <Info size={14} weight="regular" className="opacity-50" />
              </span>
              <span className={`font-display text-sm ${t.rowValue}`}>{row.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Section Inclus */}
      <div className="mt-6">
        <h4 className={`font-display font-bold text-sm tracking-tight ${t.sectionLabel}`}>
          Inclus dans le contrat
        </h4>
        <ul className="mt-3 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className={`flex items-start gap-2.5 text-sm ${t.featureText}`}>
              <span className={`shrink-0 w-5 h-5 rounded-full ${t.checkBg} ${t.checkColor} flex items-center justify-center mt-0.5`}>
                <Check size={12} weight="bold" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
