import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle as CheckCircle2, XCircle, CircleNotch as Loader2, Pulse as Activity, Clock, TreeStructure as FolderTree, EnvelopeSimple as Mail, FileText, FlowArrow as Workflow, ChatCircle as MessageCircle, Rocket, Lightning as Zap } from '@phosphor-icons/react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Heatmap } from '@/components/dashboard/Heatmap';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useRuns } from '@/hooks/useRuns';
import { TEMPLATES } from '@/data/templates';
import { cn } from '@/lib/cn';

const STATUS_CONFIG = {
  success: { Icon: CheckCircle2, color: 'text-akili-success', bg: 'bg-emerald-50', label: 'Succès' },
  failed:  { Icon: XCircle,      color: 'text-akili-error',   bg: 'bg-red-50',     label: 'Échec'   },
  running: { Icon: Loader2,      color: 'text-akili-coral',   bg: 'bg-akili-coral-50', label: 'En cours' },
};

const CATEGORY_ICON = {
  files:         FolderTree,
  email:         Mail,
  invoicing:     FileText,
  calendar:      Workflow,
  communication: MessageCircle,
  devops:        Rocket,
  other:         Zap,
};

// Donne l'icône d'un run en fonction de son automation jointe.
function iconForRun(run) {
  if (!run.automation) return Zap;
  if (run.automation.template_id) {
    const t = TEMPLATES.find((x) => x.id === run.automation.template_id);
    if (t) return t.Icon;
  }
  return CATEGORY_ICON[run.automation.category] || Zap;
}

function automationName(run) {
  return run.automation?.name || 'Automatisation supprimée';
}

// Texte d'output condensé pour la liste.
function shortOutput(run) {
  if (run.status === 'failed') return run.error_message || 'Erreur inconnue';
  if (run.status === 'running') return null;
  if (run.output && typeof run.output === 'object') {
    if (run.output.processed) return `${run.output.processed} éléments traités`;
    return null;
  }
  return null;
}

export default function RunsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRun, setSelectedRun] = useState(null);

  const { runs, stats, heatmap, loading } = useRuns();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return runs.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (q && !automationName(r).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [runs, query, statusFilter]);

  return (
    <DashboardLayout query={query} onQueryChange={setQuery}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Exécutions
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2 text-balance">
            Tout ce qu'Akili a fait <span className="text-akili-charbon-mute">pour toi.</span>
          </h1>
        </div>
      </div>

      {/* Macro stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <MacroStat label="Exécutions (30 j)" value={stats.total.toLocaleString('fr-FR')} accent="indigo" loading={loading} />
        <MacroStat label="Taux de succès"     value={`${stats.successRate} %`} accent="success" loading={loading} />
        <MacroStat label="Durée moyenne"      value={`${stats.avgDurationSec}s`} accent="or" loading={loading} />
        <MacroStat label="Échecs (30 j)"      value={stats.failed} accent="error" loading={loading} />
      </div>

      {/* Heatmap */}
      <Card variant="flat" padding="lg" className="mt-8">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-display font-extrabold text-xl tracking-[-0.02em]">
              Activité — 3 derniers mois
            </h2>
            <p className="text-sm text-akili-charbon-soft mt-1">
              Chaque carré, c'est un jour. Plus c'est foncé, plus tu as gagné de temps.
            </p>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <Heatmap runs={heatmap} />
        )}
      </Card>

      {/* History + live feed */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-display font-extrabold text-xl tracking-[-0.02em]">
              Historique
              <span className="ml-2 text-akili-charbon-mute font-mono text-base font-medium">
                ({filtered.length})
              </span>
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all',     label: 'Tout' },
                { id: 'success', label: 'Succès',   dot: 'bg-akili-success' },
                { id: 'failed',  label: 'Échecs',   dot: 'bg-akili-error' },
                { id: 'running', label: 'En cours', dot: 'bg-akili-coral'  },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium ring-1 ring-inset transition-all',
                    statusFilter === f.id
                      ? 'bg-akili-charbon text-akili-papyrus ring-akili-charbon'
                      : 'bg-white text-akili-charbon-soft ring-akili-line hover:bg-akili-papyrus-deep'
                  )}
                >
                  {f.dot && <span className={cn('w-1.5 h-1.5 rounded-full', f.dot)} />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <Card variant="flat" padding="md" className="!p-0 overflow-hidden">
            {loading ? (
              <div className="px-5 py-12 text-center text-sm text-akili-charbon-mute flex items-center justify-center gap-2">
                <Loader2 size={14} className="animate-spin" /> On charge l'historique...
              </div>
            ) : filtered.length === 0 ? (
              <EmptyHistory />
            ) : (
              <AnimatePresence initial={false}>
                {filtered.slice(0, 15).map((r) => {
                  const Icon = iconForRun(r);
                  const out = shortOutput(r);
                  const ts = new Date(r.started_at).getTime();
                  return (
                    <motion.button
                      key={r.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedRun(r)}
                      className="w-full text-left flex items-center gap-3 px-5 py-3.5 border-b border-akili-line last:border-b-0 hover:bg-akili-papyrus-warm transition-colors"
                    >
                      <RunStatusIcon status={r.status} />
                      <span className="shrink-0 w-9 h-9 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-indigo">
                        <Icon size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-[14px] truncate">
                          {automationName(r)}
                        </div>
                        <div className="font-mono text-[11px] text-akili-charbon-mute mt-0.5">
                          {timeAgo(ts)} {r.duration_ms ? `· ${(r.duration_ms / 1000).toFixed(1)}s` : ''}
                        </div>
                      </div>
                      {out && (
                        <span className="hidden md:inline text-xs text-akili-charbon-soft truncate max-w-[200px]">
                          {out}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            )}
          </Card>
        </div>

        {/* Live feed */}
        <Card variant="flat" padding="md" className="self-start">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-akili-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-akili-coral" />
            </span>
            <h3 className="font-display font-extrabold text-sm tracking-[-0.01em]">
              Live feed
            </h3>
            <Activity size={14} className="text-akili-charbon-mute ml-auto" />
          </div>
          <p className="text-[11px] text-akili-charbon-soft mb-3">
            Toutes les nouvelles exécutions arrivent ici en temps réel.
          </p>
          <ul className="space-y-2.5">
            <AnimatePresence initial={false}>
              {runs.filter((r) => r.status === 'running').slice(0, 4).map((r) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <Loader2 size={12} className="animate-spin text-akili-coral shrink-0" />
                  <span className="font-display font-bold truncate">{automationName(r)}</span>
                </motion.li>
              ))}
              {runs.filter((r) => r.status === 'running').length === 0 && (
                <li className="text-xs text-akili-charbon-mute italic flex items-center gap-2">
                  <Clock size={12} /> Aucune exécution en cours.
                </li>
              )}
            </AnimatePresence>
          </ul>
        </Card>
      </div>

      <AnimatePresence>
        {selectedRun && (
          <RunDetailDrawer run={selectedRun} onClose={() => setSelectedRun(null)} />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function MacroStat({ label, value, accent = 'indigo', loading }) {
  const colors = {
    indigo:  'text-akili-indigo',
    coral:   'text-akili-coral',
    or:      'text-akili-or-700',
    success: 'text-akili-success',
    error:   'text-akili-error',
  };
  return (
    <Card variant="flat" padding="md">
      <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold">
        {label}
      </div>
      {loading ? (
        <Skeleton className="h-8 w-20 mt-2" />
      ) : (
        <div className={`font-display font-extrabold text-[28px] sm:text-3xl tracking-[-0.03em] mt-2 ${colors[accent]}`}>
          {value}
        </div>
      )}
    </Card>
  );
}

function RunStatusIcon({ status }) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`shrink-0 w-7 h-7 rounded-akili ${c.bg} flex items-center justify-center ${c.color}`}>
      <c.Icon size={14} className={status === 'running' ? 'animate-spin' : ''} />
    </span>
  );
}

function EmptyHistory() {
  return (
    <div className="px-8 py-12 text-center flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-akili-papyrus-deep flex items-center justify-center text-akili-charbon-soft">
        <Activity size={24} strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-extrabold text-xl tracking-[-0.02em]">
        Aucune exécution pour l'instant.
      </h3>
      <p className="font-sans text-sm text-akili-charbon-soft max-w-[360px] leading-[1.55]">
        Lance une de tes automatisations et tu la verras apparaître ici en temps réel.
      </p>
    </div>
  );
}

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}

function RunDetailDrawer({ run, onClose }) {
  const c = STATUS_CONFIG[run.status];
  const ts = new Date(run.started_at).getTime();
  const out = shortOutput(run);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-akili-indigo/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-white shadow-akili-xl overflow-y-auto"
      >
        <div className="p-6 border-b border-akili-line">
          <div className="flex items-center gap-3">
            <RunStatusIcon status={run.status} />
            <div className="flex-1">
              <Badge variant={run.status === 'success' ? 'success' : run.status === 'failed' ? 'error' : 'coral'}>
                {c.label}
              </Badge>
              <h2 className="font-display font-extrabold text-xl tracking-[-0.02em] mt-2">
                {automationName(run)}
              </h2>
            </div>
            <button onClick={onClose} className="text-akili-charbon-mute hover:text-akili-charbon" aria-label="Fermer">
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <DetailRow label="Lancée">{timeAgo(ts)}</DetailRow>
          <DetailRow label="Durée">
            {run.duration_ms ? `${(run.duration_ms / 1000).toFixed(1)} secondes` : '— en cours'}
          </DetailRow>
          <DetailRow label="Déclenchée par">{run.trigger || 'manual'}</DetailRow>
          {out && <DetailRow label="Résultat">{out}</DetailRow>}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold mb-2">
              Logs
            </div>
            <pre className="bg-akili-indigo-950 text-akili-papyrus rounded-akili p-4 text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre-wrap">
{run.logs || `[${new Date(ts).toISOString()}] start "${automationName(run)}"
[${new Date(ts + 800).toISOString()}] connecting integrations...
[${new Date(ts + 1600).toISOString()}] processing items...
${run.status === 'failed'
  ? `[${new Date(ts + 2200).toISOString()}] ✗ ${run.error_message || 'unknown error'}`
  : run.status === 'success'
    ? `[${new Date(ts + (run.duration_ms || 8000)).toISOString()}] ✓ done`
    : `[${new Date().toISOString()}] running...`}`}
            </pre>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function DetailRow({ label, children }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold">
        {label}
      </div>
      <div className="text-sm text-akili-charbon mt-1">{children}</div>
    </div>
  );
}
