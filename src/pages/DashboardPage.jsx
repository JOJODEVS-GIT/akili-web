import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Workflow, PlayCircle, Hourglass, RefreshCcw, Plus,
  FileText, Rocket, FolderTree, DatabaseBackup, UserPlus,
  ArrowUpDown, Inbox,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AutomationRow } from '@/components/dashboard/AutomationRow';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { NewAutomationModal } from '@/components/dashboard/NewAutomationModal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { capitalize, formatDateCapitalized } from '@/lib/format';
import { cn } from '@/lib/cn';

const SAMPLE = [
  { id: 1, name: 'Factures mensuelles → PDF', desc: 'Stripe → Drive → Email · planifié',    Icon: FileText,       status: 'actif',     lastRun: 'il y a 2 h',         lastRunMs: 2 * 3600,     savings: '12 h/mois',    savingsHrs: 12 },
  { id: 2, name: 'Déploiement vendredi 18h',  desc: 'GitHub → SSH → Slack',                  Icon: Rocket,         status: 'planifié',  lastRun: 'demain 18:00',       lastRunMs: 86400,        savings: '4 h/sem',       savingsHrs: 16 },
  { id: 3, name: 'Tri uploads Drive',          desc: 'Drive watch → renommage → classement', Icon: FolderTree,     status: 'actif',     lastRun: 'il y a 14 min',      lastRunMs: 14 * 60,      savings: '6 h/mois',      savingsHrs: 6 },
  { id: 4, name: 'Backup base Postgres',       desc: 'pg_dump → S3 → checksum',              Icon: DatabaseBackup, status: 'actif',     lastRun: 'cette nuit 03:00',   lastRunMs: 12 * 3600,    savings: '— sécurité',   savingsHrs: 0 },
  { id: 5, name: 'Onboarding nouveau client',  desc: 'HubSpot → Notion → Slack',             Icon: UserPlus,       status: 'brouillon', lastRun: '—',                  lastRunMs: Infinity,     savings: '~3 h/client',   savingsHrs: 3 },
];

const FILTERS = [
  { id: 'all',       label: 'Tout',        match: () => true },
  { id: 'actif',     label: 'Actives',     match: (a) => a.status === 'actif',     dot: 'success' },
  { id: 'planifié',  label: 'Planifiées',  match: (a) => a.status === 'planifié',  dot: 'indigo'  },
  { id: 'brouillon', label: 'Brouillons',  match: (a) => a.status === 'brouillon' },
];

const FILTER_DOT = { success: 'bg-akili-success', indigo: 'bg-akili-indigo' };

const SPARK = {
  automations: [3, 5, 4, 7, 8, 10, 11, 12],
  runs:        [180, 220, 260, 310, 380, 540, 880, 1284],
  saved:       [12, 16, 18, 22, 26, 30, 34, 38],
};

const SORT_OPTIONS = {
  default: { label: 'Par défaut', cmp: (a, b) => a.id - b.id },
  name:    { label: 'Nom',        cmp: (a, b) => a.name.localeCompare(b.name) },
  recent:  { label: 'Récent',     cmp: (a, b) => a.lastRunMs - b.lastRunMs },
  savings: { label: 'Gain',       cmp: (a, b) => b.savingsHrs - a.savingsHrs },
};

export default function DashboardPage() {
  const [empty, setEmpty] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [items, setItems] = useState(SAMPLE);
  const { user } = useAuth();
  const newModal = useDisclosure();
  const { toast } = useToast();
  const confirm = useConfirm();

  const filtered = useMemo(() => {
    if (empty) return [];
    const f = FILTERS.find((x) => x.id === filter);
    const list = items.filter(f.match);
    const q = query.trim().toLowerCase();
    const searched = q
      ? list.filter((a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
      : list;
    return [...searched].sort(SORT_OPTIONS[sort].cmp);
  }, [empty, filter, query, sort, items]);

  const handleAction = async (action, automation) => {
    if (action === 'delete') {
      const ok = await confirm({
        title: `Supprimer « ${automation.name} » ?`,
        description: 'Cette automatisation et tout son historique seront perdus. Cette action est définitive.',
        confirmLabel: 'Oui, supprimer',
        danger: true,
      });
      if (ok) {
        setItems((prev) => prev.filter((x) => x.id !== automation.id));
        toast({ type: 'success', title: 'Automatisation supprimée' });
      }
    } else if (action === 'run') {
      toast({ type: 'info', title: 'Lancement...', description: automation.name });
      setTimeout(() => {
        toast({ type: 'success', title: 'Terminé en 12,4 s', description: '47 éléments traités · 4 h 20 économisées' });
      }, 2000);
    } else if (action === 'edit') {
      toast({ type: 'info', title: 'Édition', description: 'Le modal d\'édition arrive en V2.' });
    } else if (action === 'pause') {
      setItems((prev) => prev.map((x) => x.id === automation.id ? { ...x, status: x.status === 'actif' ? 'brouillon' : 'actif' } : x));
      toast({ type: 'success', title: automation.status === 'actif' ? 'Automatisation désactivée' : 'Automatisation réactivée' });
    }
  };

  const handleCreate = ({ template, name }) => {
    const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
    setItems((prev) => [
      ...prev,
      {
        id: newId,
        name,
        desc: template.desc,
        Icon: template.Icon,
        status: 'brouillon',
        lastRun: '—',
        lastRunMs: Infinity,
        savings: '— à mesurer',
        savingsHrs: 0,
      },
    ]);
    setEmpty(false);
    setFilter('all');
    toast({ type: 'success', title: 'Automatisation créée', description: `« ${name} » est prête à tourner.` });
  };

  return (
    <DashboardLayout query={query} onQueryChange={setQuery}>
      {/* Welcome banner */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            {formatDateCapitalized()}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2 text-balance">
            Bonjour {capitalize(user?.name) || 'Aïcha'}.{' '}
            <span className="text-akili-charbon-mute">Heureux de te revoir.</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={() => setEmpty(!empty)}
            iconLeft={<RefreshCcw size={16} />}
            fullWidth
            className="sm:w-auto"
          >
            {empty ? 'Charger des exemples' : 'Vider la liste'}
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeft={<Plus size={16} />}
            onClick={newModal.open}
            fullWidth
            className="sm:w-auto"
          >
            Nouvelle automatisation
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-8">
        <StatCard
          Icon={Workflow}
          label="Automatisations actives"
          value={empty ? '0' : items.filter((a) => a.status === 'actif').length}
          delta={empty ? null : '2 ce mois'}
          accent="indigo"
          sparkData={empty ? [] : SPARK.automations}
          onClick={empty ? undefined : () => setFilter('actif')}
        />
        <StatCard
          Icon={PlayCircle}
          label="Exécutions ce mois"
          value={empty ? '—' : '1 284'}
          delta={empty ? null : '18 %'}
          accent="coral"
          sparkData={empty ? [] : SPARK.runs}
        />
        <StatCard
          Icon={Hourglass}
          label="Temps économisé"
          value={empty ? '—' : '38 h 12'}
          delta={empty ? null : '6 h vs avril'}
          accent="or"
          sparkData={empty ? [] : SPARK.saved}
        />
      </div>

      {/* Automations list */}
      <div className="mt-8 lg:mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 mb-4">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-[-0.02em]">
            Tes automatisations
            {!empty && (
              <span className="ml-2 text-akili-charbon-mute font-mono text-base font-medium">
                ({filtered.length})
              </span>
            )}
          </h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {FILTERS.map((f) => {
                const isActive = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium ring-1 ring-inset transition-all duration-200',
                      isActive
                        ? 'bg-akili-charbon text-akili-papyrus ring-akili-charbon shadow-akili-sm'
                        : 'bg-white text-akili-charbon-soft ring-akili-line hover:bg-akili-papyrus-deep'
                    )}
                  >
                    {f.dot && <span className={cn('w-1.5 h-1.5 rounded-full', FILTER_DOT[f.dot])} />}
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-akili-line rounded-pill pl-7 pr-3 py-1 text-xs font-medium text-akili-charbon-soft cursor-pointer hover:bg-akili-papyrus-deep transition-colors"
              >
                {Object.entries(SORT_OPTIONS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <ArrowUpDown size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-akili-charbon-mute pointer-events-none" />
            </div>
          </div>
        </div>

        <Card variant="flat" padding="md" className="!p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {empty ? (
                  <EmptyState onCreate={() => { setEmpty(false); setFilter('all'); }} />
                ) : (
                  <EmptyFilter onReset={() => { setFilter('all'); setQuery(''); }} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="hidden md:grid grid-cols-[40px_1fr_140px_140px_140px_36px] items-center gap-4 px-5 py-3 bg-akili-papyrus-warm border-b border-akili-line font-display font-bold text-[11px] tracking-[0.08em] uppercase text-akili-charbon-mute">
                  <span></span>
                  <span>Nom</span>
                  <span>Statut</span>
                  <span>Dernière exécution</span>
                  <span>Gain</span>
                  <span></span>
                </div>
                <AnimatePresence initial={false}>
                  {filtered.map((a) => (
                    <motion.div
                      key={a.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AutomationRow automation={a} onAction={handleAction} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <NewAutomationModal
        isOpen={newModal.isOpen}
        onClose={newModal.close}
        onCreate={handleCreate}
      />
    </DashboardLayout>
  );
}

function EmptyFilter({ onReset }) {
  return (
    <div className="px-8 py-12 text-center flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-akili-papyrus-deep flex items-center justify-center text-akili-charbon-soft">
        <Inbox size={24} strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-extrabold text-xl tracking-[-0.02em]">
        Aucune automatisation par ici.
      </h3>
      <p className="font-sans text-sm text-akili-charbon-soft max-w-[360px] leading-[1.55]">
        Aucune ne correspond à ce filtre ou à cette recherche. Essaie un autre filtre, ou repars de zéro.
      </p>
      <Button size="sm" variant="ghost" onClick={onReset}>
        Réinitialiser
      </Button>
    </div>
  );
}
