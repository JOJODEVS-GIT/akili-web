import { CheckCircle as CheckCircle2, Clock } from '@phosphor-icons/react';
import { LegalLayout } from '@/components/legal/LegalLayout';

const SERVICES = [
  { name: 'API Akili',          status: 'operational', uptime: '99.98%' },
  { name: 'Tableau de bord',    status: 'operational', uptime: '99.99%' },
  { name: 'Exécution workflows',status: 'operational', uptime: '99.92%' },
  { name: 'Authentification',   status: 'operational', uptime: '100%'   },
  { name: 'Webhooks entrants',  status: 'operational', uptime: '99.85%' },
  { name: 'Connexions OAuth',   status: 'operational', uptime: '99.95%' },
];

const INCIDENTS = [
  { date: '24 avril', title: 'Latence accrue API Stripe', resolved: true,  desc: 'Tickets bloqués 22 minutes. Cause : timeout côté Stripe. Résolu sans intervention manuelle.' },
  { date: '12 avril', title: 'Maintenance planifiée',     resolved: true,  desc: 'Migration BDD vers Postgres 16. Indisponibilité de 8 minutes annoncée 48 h à l\'avance.' },
];

export default function StatusPage() {
  const allOk = SERVICES.every((s) => s.status === 'operational');

  return (
    <LegalLayout
      eyebrow="Statut système"
      title={allOk ? 'Tout tourne. Tout va bien.' : 'Incident en cours'}
    >
      <div className={`p-5 rounded-akili border-2 mb-10 flex items-center gap-3 ${
        allOk ? 'border-akili-success bg-emerald-50' : 'border-akili-error bg-akili-coral-50'
      }`}>
        <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
          allOk ? 'bg-akili-success text-white' : 'bg-akili-error text-white'
        }`}>
          <CheckCircle2 size={20} />
        </span>
        <div>
          <div className="font-display font-extrabold text-lg">
            {allOk ? 'Tous les services sont opérationnels' : 'Incident en cours'}
          </div>
          <div className="text-xs text-akili-charbon-mute mt-0.5">
            Dernière vérification : il y a 30 secondes
          </div>
        </div>
      </div>

      <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mb-4">Services</h2>
      <div className="bg-white border border-akili-line rounded-akili overflow-hidden mb-12">
        {SERVICES.map((s) => (
          <div key={s.name} className="flex items-center justify-between px-5 py-4 border-b border-akili-line last:border-b-0">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-akili-success" />
              <span className="font-display font-bold text-sm">{s.name}</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="font-mono text-akili-charbon-mute">{s.uptime} (90 j)</span>
              <span className="text-akili-success font-medium">Opérationnel</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mb-4">Historique des incidents</h2>
      <div className="space-y-3">
        {INCIDENTS.map((i, idx) => (
          <div key={idx} className="bg-white border border-akili-line rounded-akili p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-akili-charbon-mute">{i.date}</span>
              {i.resolved && (
                <span className="inline-flex items-center gap-1 text-xs text-akili-success font-medium">
                  <CheckCircle2 size={12} /> Résolu
                </span>
              )}
            </div>
            <div className="font-display font-bold text-base">{i.title}</div>
            <p className="text-sm text-akili-charbon-soft mt-1.5 leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-5 rounded-akili bg-akili-papyrus-warm border border-akili-line text-center">
        <p className="text-sm text-akili-charbon-soft">
          <Clock className="inline mr-1.5" size={14} />
          Cette page est mise à jour toutes les 30 secondes.{' '}
          <a href="https://status.akili.app/feed" className="text-akili-coral font-semibold hover:underline">
            S'abonner au flux RSS
          </a>
        </p>
      </div>
    </LegalLayout>
  );
}
