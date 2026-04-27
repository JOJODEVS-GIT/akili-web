import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Activity, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Heatmap } from '@/components/dashboard/Heatmap';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TEMPLATES } from '@/data/templates';
import { cn } from '@/lib/cn';

const STATUS_CONFIG = {
  success: { Icon: CheckCircle2, color: 'text-akili-success', bg: 'bg-emerald-50', label: 'Succès' },
  failed:  { Icon: XCircle,      color: 'text-akili-error',   bg: 'bg-red-50',     label: 'Échec'   },
  running: { Icon: Loader2,      color: 'text-akili-coral',   bg: 'bg-akili-coral-50', label: 'En cours' },
};

function generateRuns(count = 25) {
  const out = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const t = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    const status = i === 0 ? 'running' : (Math.random() > 0.92 ? 'failed' : 'success');
    out.push({
      id: `r${i}`,
      automation: t,
      status,
      duration_ms: status === 'running' ? null : 8000 + Math.floor(Math.random() * 14000),
      timestamp: now - i * (60_000 + Math.random() * 1_800_000),
      output: status === 'success' ? `${Math.floor(Math.random() * 200) + 1} éléments traités` : status === 'failed' ? 'Connexion expirée — token à renouveler' : null,
    });
  }
  return out;
}

export default function RunsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [runs, setRuns] = useState(() => generateRuns(25));
  const [selectedRun, setSelectedRun] = useState(null);

  // Live feed simulé : un nouveau run apparaît toutes les 12s
  useEffect(() => {
    const i = setInterval(() => {
      const t = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      const newRun = {
        id: `r${Date.now()}`,
        automation: t,
        status: 'running',
        duration_ms: null,
        timestamp: Date.now(),
        output: null,
      };
      setRuns((prev) => [newRun, ...prev.slice(0, 49)]);

      // Le run "termine" après 2s
      setTimeout(() => {
        setRuns((prev) => prev.map((r) => r.id === newRun.id ? {
          ...r,
          status: Math.random() > 0.9 ? 'failed' : 'success',
          duration_ms: 8000 + Math.floor(Math.random() * 14000),
          output: 'Terminé en live',
        } : r));
      }, 2200);
    }, 12000);
    return () => clearInterval(i);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return runs.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (q && !r.automation.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [runs, query, statusFilter]);

  const stats = useMemo(() => {
    const total = runs.length;
    const ok = runs.filter((r) => r.status === 'success').length;
    const failed = runs.filter((r) => r.status === 'failed').length;
    const running = runs.filter((r) => r.status === 'running').length;
    const successRate = total ? Math.round((ok / Math.max(1, total - running)) * 100) : 0;
    const avgDuration = (() => {
      const completed = runs.filter((r) => r.duration_ms);
      if (!completed.length) return 0;
      return Math.round(completed.reduce((s, r) => s + r.duration_ms, 0) / completed.length / 1000);
    })();
    return { total, ok, failed, running, successRate, avgDuration };
  }, [runs]);

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
        <MacroStat label="Exécutions ce mois" value="1 284" delta="↑ 18 %" accent="indigo" />
        <MacroStat label="Taux de succès"     value={`${stats.successRate} %`} delta="stable" accent="success" />
        <MacroStat label="Durée moyenne"      value={`${stats.avgDuration}s`} accent="or" />
        <MacroStat label="Échecs (30 j)"      value={stats.failed} accent="error" />
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
        <Heatmap />
      </Card>

      {/* Live feed + history */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* History list */}
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
            <AnimatePresence initial={false}>
              {filtered.slice(0, 15).map((r) => (
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
                  <span className={`shrink-0 w-9 h-9 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-indigo`}>
                    <r.automation.Icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-[14px] truncate">
                      {r.automation.name}
                    </div>
                    <div className="font-mono text-[11px] text-akili-charbon-mute mt-0.5">
                      {timeAgo(r.timestamp)} {r.duration_ms ? `· ${(r.duration_ms / 1000).toFixed(1)}s` : ''}
                    </div>
                  </div>
                  {r.output && (
                    <span className="hidden md:inline text-xs text-akili-charbon-soft truncate max-w-[200px]">
                      {r.output}
                    </span>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
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
              {filtered.filter((r) => r.status === 'running').slice(0, 4).map((r) => (
                <motion.li
                  key={r.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <Loader2 size={12} className="animate-spin text-akili-coral shrink-0" />
                  <span className="font-display font-bold truncate">{r.automation.name}</span>
                </motion.li>
              ))}
              {filtered.filter((r) => r.status === 'running').length === 0 && (
                <li className="text-xs text-akili-charbon-mute italic flex items-center gap-2">
                  <Clock size={12} /> Aucune exécution en cours.
                </li>
              )}
            </AnimatePresence>
          </ul>
        </Card>
      </div>

      {/* Detail modal (simplifié) */}
      <AnimatePresence>
        {selectedRun && (
          <RunDetailDrawer run={selectedRun} onClose={() => setSelectedRun(null)} />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

function MacroStat({ label, value, delta, accent = 'indigo' }) {
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
      <div className={`font-display font-extrabold text-[28px] sm:text-3xl tracking-[-0.03em] mt-2 ${colors[accent]}`}>
        {value}
      </div>
      {delta && (
        <div className="font-mono text-xs text-akili-charbon-mute mt-1">{delta}</div>
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

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'à l\'instant';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}

function RunDetailDrawer({ run, onClose }) {
  const c = STATUS_CONFIG[run.status];
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
                {run.automation.name}
              </h2>
            </div>
            <button onClick={onClose} className="text-akili-charbon-mute hover:text-akili-charbon">
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <DetailRow label="Lancée">{timeAgo(run.timestamp)}</DetailRow>
          <DetailRow label="Durée">
            {run.duration_ms ? `${(run.duration_ms / 1000).toFixed(1)} secondes` : '— en cours'}
          </DetailRow>
          {run.output && <DetailRow label="Résultat">{run.output}</DetailRow>}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold mb-2">
              Logs
            </div>
            <pre className="bg-akili-indigo-950 text-akili-papyrus rounded-akili p-4 text-xs leading-relaxed font-mono overflow-x-auto">
{`[${new Date(run.timestamp).toISOString()}] start "${run.automation.name}"
[${new Date(run.timestamp + 800).toISOString()}] connecting integrations...
[${new Date(run.timestamp + 1600).toISOString()}] processing items...
${run.status === 'failed'
  ? `[${new Date(run.timestamp + 2200).toISOString()}] ✗ ${run.output || 'unknown error'}`
  : run.status === 'success'
    ? `[${new Date(run.timestamp + (run.duration_ms || 8000)).toISOString()}] ✓ done`
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
