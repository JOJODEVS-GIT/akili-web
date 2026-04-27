import { LegalLayout } from '@/components/legal/LegalLayout';
import { Badge } from '@/components/ui/Badge';

const RELEASES = [
  {
    version: '1.0.0',
    date: '27 avril 2026',
    tagline: 'Premier lancement public',
    items: [
      { type: 'feature', text: 'Lancement de la landing page, dashboard, marketplace de templates, page d\'exécutions avec heatmap' },
      { type: 'feature', text: '20 templates d\'automatisation prêts à installer (Fichiers, Email, Facturation, DevOps...)' },
      { type: 'feature', text: 'Connexions OAuth : Gmail, Drive, Stripe, GitHub, Slack, Notion' },
      { type: 'feature', text: 'Heatmap d\'activité 91 jours · Live feed temps réel · Stats détaillées' },
    ],
  },
  {
    version: '0.9.0-beta',
    date: '15 avril 2026',
    tagline: 'Beta privée',
    items: [
      { type: 'feature', text: 'Authentification email + Google OAuth' },
      { type: 'feature', text: 'Création / édition / suppression d\'automatisations' },
      { type: 'fix',     text: 'Correction du bug de session sur Safari iOS' },
    ],
  },
  {
    version: '0.5.0-alpha',
    date: '1er avril 2026',
    tagline: 'Première démo publique',
    items: [
      { type: 'feature', text: 'Première version du moteur d\'exécution (5 templates)' },
      { type: 'feature', text: 'API REST + webhooks entrants' },
    ],
  },
];

const TYPE_BADGE = {
  feature: { variant: 'success', label: 'Nouveau' },
  fix:     { variant: 'warning', label: 'Fix' },
  improve: { variant: 'indigo',  label: 'Amélioration' },
  break:   { variant: 'error',   label: 'Breaking' },
};

export default function ChangelogPage() {
  return (
    <LegalLayout
      eyebrow="Changelog"
      title="Tout ce qui change, semaine après semaine."
    >
      <p className="font-sans text-base leading-relaxed text-akili-charbon-soft mb-12 max-w-2xl">
        Les nouveautés, améliorations et corrections d'Akili. On documente honnêtement, y compris les bugs qu'on a fixés.
      </p>

      <div className="space-y-12">
        {RELEASES.map((r) => (
          <article key={r.version} className="relative">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] text-akili-charbon">
                v{r.version}
              </h2>
              <span className="font-mono text-xs text-akili-charbon-mute">{r.date}</span>
            </div>
            <p className="text-akili-coral font-display font-bold text-sm uppercase tracking-wider mb-5">
              {r.tagline}
            </p>
            <ul className="space-y-3">
              {r.items.map((item, idx) => {
                const badge = TYPE_BADGE[item.type];
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <Badge variant={badge.variant} className="shrink-0 mt-0.5">
                      {badge.label}
                    </Badge>
                    <span className="text-sm text-akili-charbon-soft leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </LegalLayout>
  );
}
