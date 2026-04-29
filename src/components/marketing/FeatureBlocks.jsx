/**
 * FeatureBlocks — 3 grands blocs alternés (gauche-droite) pour /produit.
 *
 * Pattern Activepieces : chaque feature a son sous-hero avec mockup
 * d'un côté, copy + bullet points + lien de l'autre. Alterné pour
 * créer du rythme visuel.
 */
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Lightning, FlowArrow, ShieldCheck } from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

const BLOCKS = [
  {
    eyebrow: '· FONCTIONNALITÉ #1 ·',
    title: 'Décris ce que tu veux,\nen français.',
    body: 'Pas de DSL bricolé, pas de JSON à apprendre. Tu écris la condition en français naturel : « si le montant Stripe est > 100 €, alors envoie un Slack au #ventes ». Akili comprend.',
    bullets: [
      'Conditions en français naturel',
      'Quick replies guidées dans le builder',
      'Prévisualisation live de la logique',
      'Templates pré-faits pour 80% des cas',
    ],
    Icon: Lightning,
    accent: 'coral',
    href: '/templates',
    linkLabel: 'Voir les templates',
    visualKind: 'language',
  },
  {
    eyebrow: '· FONCTIONNALITÉ #2 ·',
    title: 'Branche tes outils,\nen deux clics OAuth.',
    body: 'Aucun mot de passe à entrer. Aucun token API à gérer. Tu cliques « Connecter Gmail », tu valides chez Google, et c\'est branché. Pareil pour 21 autres outils.',
    bullets: [
      'OAuth officiel sur 21+ intégrations',
      'Révocation 1-clic depuis le dashboard',
      'Scopes minimaux demandés',
      'Wave, Orange Money, MTN MoMo en Q3 2026',
    ],
    Icon: FlowArrow,
    accent: 'or',
    href: '/integrations',
    linkLabel: 'Voir les 21 intégrations',
    visualKind: 'oauth',
  },
  {
    eyebrow: '· FONCTIONNALITÉ #3 ·',
    title: 'Lance, planifie,\noublie sereinement.',
    body: 'Tes automatisations tournent en arrière-plan. Si une exécution échoue, retry × 3 + notif. Si ça remarche, tu sais. Tout est tracé, exportable, auditable pendant 1 an.',
    bullets: [
      'Retry auto avec backoff exponentiel',
      'Notifs Slack/email sur échec',
      'Heatmap d\'activité 12 semaines',
      'Audit logs exportables CSV',
    ],
    Icon: ShieldCheck,
    accent: 'indigo',
    href: '/securite',
    linkLabel: 'Voir la page sécurité',
    visualKind: 'monitoring',
  },
];

const ACCENTS = {
  coral:  { bg: 'bg-akili-coral-50',   text: 'text-akili-coral-700',  link: 'text-akili-coral hover:text-akili-coral-700' },
  or:     { bg: 'bg-akili-or-50',      text: 'text-akili-or-900',     link: 'text-akili-or-900 hover:text-akili-or-700' },
  indigo: { bg: 'bg-akili-indigo-50',  text: 'text-akili-indigo',     link: 'text-akili-indigo hover:text-akili-indigo-700' },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

// Mini-mockups visuels par feature (HTML/Tailwind, pas d'image externe)
function FeatureVisual({ kind, accent }) {
  const a = ACCENTS[accent];

  if (kind === 'language') {
    return (
      <div className="bg-white rounded-akili shadow-akili-md border border-akili-line p-5 lg:p-6">
        <div className="text-[10px] font-display font-bold uppercase tracking-wider text-akili-charbon-mute mb-3">
          Builder Akili
        </div>
        <div className="space-y-2.5 text-[13px] font-mono">
          <div className="flex items-start gap-2 p-2 rounded-md bg-akili-papyrus-deep">
            <span className="text-akili-coral font-bold">si</span>
            <span className="text-akili-charbon">montant Stripe</span>
            <span className="text-akili-or-700 font-bold">{'>'}</span>
            <span className="text-akili-charbon">100 €</span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-md bg-akili-papyrus-deep">
            <span className="text-akili-coral font-bold">alors</span>
            <span className="text-akili-charbon">envoie Slack</span>
            <span className="text-akili-or-700">→</span>
            <span className="text-akili-indigo font-bold">#ventes</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-akili-line">
            <span className="font-sans text-[11px] text-akili-success font-bold inline-flex items-center gap-1">
              <CheckCircle size={11} weight="fill" /> Logique valide
            </span>
            <span className="font-sans text-[11px] text-akili-charbon-mute">Tester →</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'oauth') {
    const apps = [
      { name: 'Gmail',    color: '#EA4335', state: 'Connecté' },
      { name: 'Stripe',   color: '#635BFF', state: 'Connecté' },
      { name: 'Slack',    color: '#4A154B', state: 'Connecté' },
      { name: 'Notion',   color: '#000000', state: 'À connecter' },
    ];
    return (
      <div className="bg-white rounded-akili shadow-akili-md border border-akili-line p-5 lg:p-6">
        <div className="text-[10px] font-display font-bold uppercase tracking-wider text-akili-charbon-mute mb-3">
          Tes connexions
        </div>
        <div className="space-y-2">
          {apps.map((app) => (
            <div key={app.name} className="flex items-center justify-between p-2.5 rounded-md hover:bg-akili-papyrus-deep transition-colors">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-display font-extrabold text-white"
                  style={{ background: app.color }}
                >
                  {app.name[0]}
                </span>
                <span className="font-sans text-[13px] text-akili-charbon font-medium">{app.name}</span>
              </div>
              <span className={cn(
                'inline-flex items-center gap-1 text-[10px] font-display font-bold uppercase tracking-wider',
                app.state === 'Connecté' ? 'text-akili-success' : 'text-akili-charbon-mute'
              )}>
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full',
                  app.state === 'Connecté' ? 'bg-akili-success' : 'bg-akili-charbon-mute'
                )} />
                {app.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // monitoring
  return (
    <div className="bg-white rounded-akili shadow-akili-md border border-akili-line p-5 lg:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-display font-bold uppercase tracking-wider text-akili-charbon-mute">
          Activité 12 semaines
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-akili-success font-bold">
          <CheckCircle size={9} weight="fill" />
          99.2% uptime
        </span>
      </div>
      {/* Heatmap mini */}
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 84 }).map((_, i) => {
          const seed = (i * 31) % 11;
          const intensities = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
          const colors = [
            'bg-akili-papyrus-deep',
            'bg-akili-or-100',
            'bg-akili-or-300',
            'bg-akili-or',
            'bg-akili-or-700',
          ];
          return <div key={i} className={`aspect-square rounded-sm ${colors[intensities[seed]]}`} />;
        })}
      </div>
      <div className="flex items-center justify-between mt-3 font-mono text-[9px] text-akili-charbon-mute">
        <span>Moins</span>
        <div className="flex gap-0.5">
          {['bg-akili-papyrus-deep', 'bg-akili-or-100', 'bg-akili-or-300', 'bg-akili-or', 'bg-akili-or-700'].map((c, i) => (
            <div key={i} className={`w-2 h-2 rounded-sm ${c}`} />
          ))}
        </div>
        <span>Plus</span>
      </div>
    </div>
  );
}

export function FeatureBlocks() {
  return (
    <section className="py-22 bg-akili-papyrus-warm">
      <Container size="xl">
        <div className="space-y-22 lg:space-y-30">
          {BLOCKS.map((block, i) => {
            const accent = ACCENTS[block.accent];
            const reverse = i % 2 === 1;

            return (
              <motion.div
                key={block.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={reveal}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                  reverse && 'lg:[&>*:first-child]:order-2'
                )}
              >
                {/* Texte */}
                <div>
                  <span className={cn(
                    'inline-flex items-center gap-2 font-display font-bold text-xs tracking-[0.18em] uppercase',
                    accent.text
                  )}>
                    <block.Icon size={14} weight="duotone" />
                    {block.eyebrow}
                  </span>
                  <h3 className="font-display font-extrabold text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance whitespace-pre-line">
                    {block.title}
                  </h3>
                  <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
                    {block.body}
                  </p>

                  <ul className="mt-7 space-y-2.5">
                    {block.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[14px] text-akili-charbon-soft leading-[1.5]">
                        <CheckCircle size={16} weight="fill" className={cn('shrink-0 mt-0.5', accent.text)} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={block.href}
                    className={cn(
                      'inline-flex items-center gap-1.5 mt-7 font-display font-bold text-sm transition-all hover:gap-2.5',
                      accent.link
                    )}
                  >
                    {block.linkLabel}
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>

                {/* Visuel */}
                <FeatureVisual kind={block.visualKind} accent={block.accent} />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
