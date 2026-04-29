import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkle as Sparkles } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const PLANS = [
  {
    id: 'atelier',
    name: 'Atelier',
    price: '0',
    period: 'gratuit',
    tagline: 'Pour découvrir et essayer.',
    features: [
      '5 automatisations actives',
      '500 exécutions / mois',
      'Connexions essentielles',
      'Support communautaire',
    ],
    cta: 'Créer mon compte',
    ctaVariant: 'outline',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '12',
    period: '/ mois',
    tagline: 'Pour les indépendants et petites équipes.',
    features: [
      'Automatisations illimitées',
      'Exécutions illimitées',
      'Toutes les connexions',
      'Webhooks personnalisés',
      'Support 24h en français',
      'Heatmap d\'activité 1 an',
    ],
    cta: 'Commencer 14 jours gratuits',
    ctaVariant: 'primary',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '39',
    period: '/ mois',
    tagline: 'Pour les agences et les PMEs.',
    features: [
      'Tout le plan Pro',
      'Jusqu\'à 10 utilisateurs',
      'Espaces de travail partagés',
      'Logs avancés et audit',
      'SSO + permissions',
      'Account manager dédié',
    ],
    cta: 'Nous contacter',
    ctaVariant: 'outline',
    popular: false,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function Pricing() {
  return (
    <section id="tarifs" className="py-30 bg-akili-papyrus relative overflow-hidden">
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: 80, width: 480, height: 480, transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(242,201,76,0.08) 0%, rgba(242,201,76,0) 60%)',
        }}
      />
      <Container size="xl" className="relative">
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
            Un prix simple, à la hauteur de ce que tu gagnes.
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5 max-w-xl mx-auto">
            Pas de frais cachés. Pas d'engagement. Tu peux changer de plan à tout moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-16 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={reveal}
              className={`relative bg-white rounded-akili p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-2 border-akili-coral shadow-akili-md hover:shadow-akili-coral'
                  : 'border border-akili-line hover:shadow-akili-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-akili-coral text-white text-[11px] font-display font-bold uppercase tracking-wider px-3 py-1 rounded-pill shadow-akili-coral">
                  <Sparkles size={12} /> Le plus populaire
                </div>
              )}

              <div className="font-display font-extrabold text-2xl tracking-[-0.02em]">
                {plan.name}
              </div>
              <p className="text-sm text-akili-charbon-soft mt-1.5 leading-relaxed">
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className={`font-display font-extrabold text-[56px] leading-none tracking-[-0.03em] ${
                  plan.popular ? 'text-akili-coral' : 'text-akili-charbon'
                }`}>
                  {plan.price === '0' ? 'Free' : `${plan.price} €`}
                </span>
                {plan.price !== '0' && (
                  <span className="text-sm text-akili-charbon-mute font-medium">
                    {plan.period}
                  </span>
                )}
              </div>
              {plan.price === '0' && (
                <p className="text-xs text-akili-charbon-mute mt-1">{plan.period}</p>
              )}

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className={`shrink-0 w-5 h-5 rounded-full ${
                      plan.popular ? 'bg-akili-coral-50 text-akili-coral' : 'bg-akili-papyrus-deep text-akili-success'
                    } flex items-center justify-center mt-0.5`}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-akili-charbon-soft">{f}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.id === 'team' ? '#contact' : '/signup'} className="block mt-8">
                <Button variant={plan.ctaVariant} fullWidth size="md" shape="pill">
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-akili-charbon-mute mt-10"
        >
          Tous les plans incluent : chiffrement AES-256, hébergement européen, et la fierté d'utiliser un produit conçu en Afrique.
        </motion.p>
      </Container>
    </section>
  );
}
