import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Workflow, PlayCircle, Hourglass, RefreshCcw, Plus,
  FileText, Rocket, FolderTree, DatabaseBackup, UserPlus,
  Zap, MessageCircle, Mail, ArrowUpDown, Inbox,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AutomationRow } from '@/components/dashboard/AutomationRow';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { NewAutomationModal } from '@/components/dashboard/NewAutomationModal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton, StatCardSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { useAutomations } from '@/hooks/useAutomations';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { capitalize, formatDateCapitalized } from '@/lib/format';
import { cn } from '@/lib/cn';

// Map des icônes par category (depuis la table)
const CATEGORY_ICON = {
  files:         FolderTree,
  email:         Mail,
  invoicing:     FileText,
  calendar:      Workflow,
  communication: MessageCircle,
  devops:        Rocket,
  other:         Zap,
};

const FILTERS = [
  { id: 'all',       label: 'Tout',        match: () => true },
  { id: 'actif',     label: 'Actives',     match: (a) => a.status === 'actif',     dot: 'success' },
  { id: 'planifié',  label: 'Planifiées',  match: (a) => a.status === 'planifié',  dot: 'indigo'  },
  { id: 'brouillon', label: 'Brouillons',  match: (a) => a.status === 'brouillon' },
];

const FILTER_DOT = { success: 'bg-akili-success', indigo: 'bg-akili-indigo' };

const SORT_OPTIONS = {
  default: { label: 'Par défaut', cmp: (a, b) => new Date(b.created_at) - new Date(a.created_at) },
  name:    { label: 'Nom',        cmp: (a, b) => a.name.localeCompare(b.name) },
  recent:  { label: 'Récent',     cmp: (a, b) => new Date(b.last_run_at || 0) - new Date(a.last_run_at || 0) },
  savings: { label: 'Gain',       cmp: (a, b) => Number(b.estimated_savings_hours || 0) - Number(a.estimated_savings_hours || 0) },
};

export default function DashboardPage() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');

  const { user } = useAuth();
  const { items, loading: itemsLoading, create, remove, runNow, update } = useAutomations();
  const { stats, loading: statsLoading } = useDashboardStats();
  const newModal = useDisclosure();
  const { toast } = useToast();
  const confirm = useConfirm();

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter);
    const list = items.filter(f.match);
    const q = query.trim().toLowerCase();
    const searched = q
      ? list.filter((a) => (a.name || '').toLowerCase().includes(q) || (a.description || '').toLowerCase().includes(q))
      : list;
    return [...searched].sort(SORT_OPTIONS[sort].cmp);
  }, [filter, query, sort, items]);

  // Adapte pour AutomationRow (qui attend Icon, lastRun, savings)
  const adapted = useMemo(() => filtered.map((a) => ({
    ...a,
    Icon: CATEGORY_ICON[a.category] || Zap,
    desc: a.description || '',
    lastRun: a.last_run_at ? formatRelative(a.last_run_at) : '—',
    savings: a.estimated_savings_hours ? `${a.estimated_savings_hours} h/mois` : '— à mesurer',
  })), [filtered]);

  const handleAction = async (action, automation) => {
    if (action === 'delete') {
      const ok = await confirm({
        title: `Supprimer « ${automation.name} » ?`,
        description: 'Cette automatisation et tout son historique seront perdus. Cette action est définitive.',
        confirmLabel: 'Oui, supprimer',
        danger: true,
      });
      if (ok) {
        const { error } = await remove(automation.id);
        if (error) toast({ type: 'error', title: 'Échec de suppression', description: error.message });
        else toast({ type: 'success', title: 'Automatisation supprimée' });
      }
    } else if (action === 'run') {
      toast({ type: 'info', title: 'Lancement...', description: automation.name });
      await runNow(automation);
    } else if (action === 'edit') {
      toast({ type: 'info', title: 'Édition', description: 'Le modal d\'édition arrive en V2.' });
    } else if (action === 'pause') {
      const newStatus = automation.status === 'actif' ? 'pause' : 'actif';
      await update(automation.id, { status: newStatus });
      toast({ type: 'success', title: newStatus === 'actif' ? 'Réactivée' : 'Désactivée' });
    }
  };

  const handleCreate = async ({ template, name }) => {
    const { error } = await create({
      name,
      description: template.desc,
      template_id: template.id,
      category: template.category,
      status: 'brouillon',
      estimated_savings_hours: 0,
    });
    if (error) {
      toast({ type: 'error', title: 'Création échouée', description: error.message });
      return;
    }
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
        {statsLoading ? (
          <>
            <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              Icon={Workflow}
              label="Automatisations actives"
              value={stats.activeCount}
              accent="indigo"
              sparkData={stats.sparklines.automations}
              onClick={stats.activeCount > 0 ? () => setFilter('actif') : undefined}
            />
            <StatCard
              Icon={PlayCircle}
              label="Exécutions ce mois"
              value={stats.runsThisMonth.toLocaleString('fr-FR')}
              delta={stats.successRate ? `${stats.successRate}% succès` : null}
              accent="coral"
              sparkData={stats.sparklines.runs}
            />
            <StatCard
              Icon={Hourglass}
              label="Temps économisé"
              value={`${Math.round(stats.hoursSaved)} h`}
              accent="or"
              sparkData={stats.sparklines.saved}
            />
          </>
        )}
      </div>

      {/* Automations list */}
      <div className="mt-8 lg:mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4 mb-4">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-[-0.02em]">
            Tes automatisations
            {!itemsLoading && (
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
          {itemsLoading ? (
            <>
              <TableRowSkeleton /><TableRowSkeleton /><TableRowSkeleton />
            </>
          ) : (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {items.length === 0 ? (
                    <EmptyState onCreate={newModal.open} />
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
                    {adapted.map((a) => (
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
          )}
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

function formatRelative(timestamp) {
  const diff = (Date.now() - new Date(timestamp).getTime()) / 1000;
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}
