/**
 * Heatmap — calendrier d'activité style GitHub contributions.
 * 91 jours (3 mois) par défaut, intensité = nombre de runs.
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';

function generateMockRuns(days = 91) {
  // Génère un pattern réaliste : plus de runs en semaine, moins le weekend
  const out = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dow = d.getDay();
    const baseIntensity = (dow === 0 || dow === 6) ? Math.random() * 2 : 2 + Math.random() * 8;
    const count = Math.max(0, Math.floor(baseIntensity));
    out.push({ date: d, count });
  }
  return out;
}

const LEVELS = [
  { min: 0,  bg: 'bg-akili-papyrus-deep', label: '0' },
  { min: 1,  bg: 'bg-akili-coral-50',     label: '1-2' },
  { min: 3,  bg: 'bg-akili-coral-100',    label: '3-5' },
  { min: 6,  bg: 'bg-akili-coral-300',    label: '6-9' },
  { min: 10, bg: 'bg-akili-coral',        label: '10+' },
];

function levelFor(count) {
  let result = LEVELS[0];
  for (const l of LEVELS) if (count >= l.min) result = l;
  return result;
}

export function Heatmap({ runs = null }) {
  const data = useMemo(() => runs || generateMockRuns(91), [runs]);

  // Group by week (7 jours, avec ajustement first-day)
  const weeks = useMemo(() => {
    const out = [];
    let week = new Array(7).fill(null);

    // Décalage si le premier jour n'est pas un lundi (Mon=1, Sun=0)
    const firstDay = data[0].date.getDay();
    const shift = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < shift; i++) week[i] = { date: null, count: -1 };

    let dayIdx = shift;
    for (const d of data) {
      week[dayIdx] = d;
      dayIdx++;
      if (dayIdx === 7) {
        out.push(week);
        week = new Array(7).fill(null);
        dayIdx = 0;
      }
    }
    if (week.some(Boolean)) out.push(week);
    return out;
  }, [data]);

  const totalRuns = data.reduce((s, d) => s + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;
  const maxStreak = useMemo(() => {
    let cur = 0, max = 0;
    for (const d of data) {
      if (d.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0;
    }
    return max;
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Stats macro */}
      <div className="flex flex-wrap gap-6 text-sm">
        <Stat label="Exécutions (91 j)" value={totalRuns.toLocaleString('fr-FR')} />
        <Stat label="Jours actifs"       value={`${activeDays} / 91`} />
        <Stat label="Plus longue série"  value={`${maxStreak} jours`} accent="coral" />
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <Cell key={di} day={day} delay={(wi * 7 + di) * 0.005} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-2 text-[11px] text-akili-charbon-mute">
        <span>Moins</span>
        {LEVELS.map((l) => (
          <span key={l.min} className={`w-3 h-3 rounded-sm ${l.bg} border border-black/5`} />
        ))}
        <span>Plus</span>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold">
        {label}
      </div>
      <div className={`font-display font-extrabold text-2xl tracking-[-0.02em] mt-1 ${accent === 'coral' ? 'text-akili-coral' : 'text-akili-charbon'}`}>
        {value}
      </div>
    </div>
  );
}

function Cell({ day, delay }) {
  if (!day || day.count < 0) {
    return <span className="w-3 h-3" />;
  }
  const level = levelFor(day.count);
  const tooltip = day.count === 0
    ? `Aucune exécution le ${day.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}`
    : `${day.count} exécution${day.count > 1 ? 's' : ''} le ${day.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}`;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay }}
      title={tooltip}
      className={`w-3 h-3 rounded-sm ${level.bg} border border-black/5 hover:ring-2 hover:ring-akili-charbon/20 cursor-pointer transition-all`}
    />
  );
}
