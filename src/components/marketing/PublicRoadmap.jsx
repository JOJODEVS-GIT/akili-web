/**
 * PublicRoadmap — Roadmap publique transparente pour /manifesto.
 *
 * Pattern volé à Linear/Activepieces : on partage ce qui est livré,
 * en cours, et ce qui arrive. Crédibilise le projet et invite la
 * communauté à donner son avis.
 */
import { motion } from 'framer-motion';
import { CheckCircle, CircleNotch, Circle } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';

const MILESTONES = [
  {
    status: 'done',
    quarter: 'Q1 2026',
    title: 'Fondations',
    items: [
      'Landing publique (15 sections au lancement, simplifiée à 7 + spokes)',
      'Auth Supabase (email + Google OAuth)',
      'Dashboard avec 7 sous-pages, données en realtime',
      '21 intégrations OAuth (Gmail, Drive, Stripe, Slack, Notion, GitHub…)',
      '20 templates prêts à l\'emploi',
    ],
  },
  {
    status: 'in-progress',
    quarter: 'Q2 2026',
    title: 'Architecture multi-pages',
    items: [
      'Spokes pages (/produit, /templates, /integrations, /securite, /comparaisons)',
      'Pages auto-générées par template + intégration (SEO)',
      'Chatbot support brandé maison (sans Crisp)',
      'Performance : bundle splitté, preconnect, lazy loading',
    ],
  },
  {
    status: 'planned',
    quarter: 'Q3 2026',
    title: 'Intégrations africaines',
    items: [
      'Wave (envois & réceptions Sénégal, Côte d\'Ivoire)',
      'Orange Money (paiements mobiles UEMOA)',
      'MTN Mobile Money (Afrique de l\'Ouest)',
      'Support en wolof, swahili, anglais',
    ],
  },
  {
    status: 'planned',
    quarter: 'Q4 2026',
    title: 'Workflow & gouvernance',
    items: [
      'Éditeur visuel de workflows (drag & drop)',
      'Espaces équipes avec permissions granulaires',
      'SSO entreprise + SCIM provisioning',
      'Audit logs exportables CSV',
    ],
  },
];

const STATUS_META = {
  done:        { Icon: CheckCircle,   color: 'text-akili-success',  bg: 'bg-akili-success/10', label: 'Livré' },
  'in-progress': { Icon: CircleNotch, color: 'text-akili-coral',    bg: 'bg-akili-coral-50',   label: 'En cours' },
  planned:     { Icon: Circle,        color: 'text-akili-charbon-mute', bg: 'bg-akili-papyrus-deep', label: 'Prévu' },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function PublicRoadmap() {
  return (
    <section id="roadmap" className="py-22 bg-akili-papyrus-warm">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            · Roadmap publique ·
          </span>
          <h2 className="font-display font-extrabold text-[40px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Ce qu'on a livré,
            <span className="block text-akili-coral">ce qui arrive.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Pas de roadmap secret. On partage où on en est, ce qu'on construit,
            et ce qui arrive — pour que tu saches à quoi t'attendre.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {MILESTONES.map((m, i) => {
            const meta = STATUS_META[m.status];
            return (
              <motion.div
                key={m.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={reveal}
                className="bg-white rounded-akili border border-akili-line p-6 lg:p-8 hover:shadow-akili-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-display font-bold text-[11px] uppercase tracking-wider text-akili-charbon-mute">
                      {m.quarter}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl tracking-[-0.02em] mt-1">
                      {m.title}
                    </h3>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${meta.bg} ${meta.color} text-[11px] font-display font-bold uppercase tracking-wider`}>
                    <meta.Icon size={12} weight={m.status === 'in-progress' ? 'bold' : 'fill'} />
                    {meta.label}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {m.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-akili-charbon-soft leading-[1.5]">
                      <span className={`shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${meta.color === 'text-akili-success' ? 'bg-akili-success' : meta.color === 'text-akili-coral' ? 'bg-akili-coral' : 'bg-akili-charbon-mute'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center font-sans text-sm text-akili-charbon-mute mt-10">
          Une suggestion sur la roadmap ?{' '}
          <a href="mailto:hello@akili.app?subject=Suggestion%20roadmap%20Akili" className="text-akili-coral hover:underline font-semibold">
            Envoie-nous un mot →
          </a>
        </p>
      </Container>
    </section>
  );
}
