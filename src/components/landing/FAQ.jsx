/**
 * FAQ — Questions fréquentes en accordion.
 * 8 questions qui répondent aux objections clés avant le pricing/CTA.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, Question, EnvelopeSimple as Mail } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const ITEMS = [
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui. Tout transite en TLS 1.3, les données au repos sont chiffrées en AES-256, et l'hébergement est en Europe (Frankfurt). On utilise OAuth officiel pour Gmail, Stripe, Drive, Slack — on ne stocke jamais ton mot de passe. Tu peux révoquer un accès en un clic depuis ton dashboard.",
  },
  {
    q: "Comment Akili se compare à Zapier ou Make ?",
    a: "Trois différences clés : (1) Akili parle français naturellement — erreurs, doc, support. (2) Akili comprend le contexte africain — fuseaux horaires, intégrations locales prévues (Wave, Orange Money). (3) Akili est moins cher : 12 € / mois pour des automatisations illimitées, là où Zapier facture par tâche.",
  },
  {
    q: "Faut-il savoir coder pour utiliser Akili ?",
    a: "Non. Tu pioches un template, tu connectes tes outils via OAuth, et c'est parti. Pour les cas plus avancés, tu peux écrire des conditions en français simple (\"si le montant > 100 €, alors…\") — pas de JSON, pas de regex obligatoire.",
  },
  {
    q: "Combien d'intégrations sont supportées ?",
    a: "Aujourd'hui : Gmail, Google Drive, Google Calendar, Google Sheets, Stripe, Slack, Discord, Notion, GitHub, Vercel, Postgres, AWS S3, Twitter/X, Toggl, plus webhooks et cron génériques. Une dizaine d'intégrations supplémentaires arrivent chaque trimestre.",
  },
  {
    q: "Que se passe-t-il si une automatisation échoue ?",
    a: "Akili retry automatiquement jusqu'à 3 fois avec backoff exponentiel. Si ça échoue malgré tout, tu reçois une notif Slack ou email avec le détail de l'erreur et un bouton \"relancer\". L'historique complet est consultable pendant 1 an.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans engagement. Tu annules en un clic depuis tes paramètres. Ton compte reste actif jusqu'à la fin de la période payée, puis bascule en plan Atelier (gratuit) — tu gardes tes données et tes 5 automatisations.",
  },
  {
    q: "Y a-t-il une période d'essai sur le plan Pro ?",
    a: "Oui, 14 jours gratuits, sans carte bancaire requise. Tu testes toutes les fonctionnalités Pro. À la fin, soit tu passes en payant, soit tu redescends automatiquement en plan Atelier — pas de surprise.",
  },
  {
    q: "Vous êtes basés où ? Qui maintient le produit ?",
    a: "Akili est conçu et développé à Cotonou (Bénin), avec une équipe distribuée à Lagos et Paris. Le support est assuré en français aux heures de bureau Afrique de l'Ouest (UTC) — réponse moyenne sous 4 h.",
  },
];

function Item({ q, a, isOpen, onToggle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={cn(
        'border rounded-akili overflow-hidden transition-colors duration-200',
        isOpen
          ? 'bg-white border-akili-or shadow-akili-sm'
          : 'bg-white border-akili-line hover:border-akili-indigo-100'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display font-bold text-[16px] leading-[1.35] tracking-[-0.01em] text-akili-charbon flex-1">
          {q}
        </span>
        <span
          className={cn(
            'shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
            isOpen
              ? 'bg-akili-or text-akili-indigo rotate-180'
              : 'bg-akili-papyrus-deep text-akili-charbon-soft'
          )}
        >
          <CaretDown size={14} weight="bold" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 font-sans text-[14.5px] leading-[1.65] text-akili-charbon-soft">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-30 bg-akili-papyrus relative">
      <Container size="lg" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral inline-flex items-center gap-2">
            <Question size={14} weight="bold" /> Questions fréquentes
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Ce qu'on nous demande le plus.
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Sécurité, prix, comparaisons — les vraies questions, sans bullshit.
          </p>
        </motion.div>

        <div className="mt-14 max-w-3xl mx-auto flex flex-col gap-3">
          {ITEMS.map((item, i) => (
            <Item
              key={i}
              q={item.q}
              a={item.a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        {/* Bottom contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-akili bg-akili-indigo-50 border border-akili-indigo-100 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-akili-indigo text-akili-or flex items-center justify-center">
              <Mail size={18} weight="bold" />
            </span>
            <div>
              <p className="font-display font-bold text-sm text-akili-charbon">
                Une autre question ?
              </p>
              <p className="font-sans text-[13px] text-akili-charbon-soft">
                On répond en français, sous 4 h en moyenne.
              </p>
            </div>
          </div>
          <a
            href="mailto:hello@akili.app"
            className="font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors"
          >
            hello@akili.app →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
