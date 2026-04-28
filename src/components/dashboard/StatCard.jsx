import { TrendUp as TrendingUp } from '@phosphor-icons/react';
import { Card } from '@/components/ui/Card';
import { Sparkline } from './Sparkline';
import { cn } from '@/lib/cn';

const ACCENT = {
  coral:  { text: 'text-akili-coral',    spark: '#FF6B5C' },
  or:     { text: 'text-akili-or-700',   spark: '#C9A33D' },
  indigo: { text: 'text-akili-indigo',   spark: '#0E1A3E' },
};

/**
 * StatCard — carte de stat avec sparkline animée.
 * Cliquable optionnel pour drill-down sur la liste.
 */
export function StatCard({
  Icon,
  label,
  value,
  delta,
  accent = 'indigo',
  sparkData = [],
  onClick,
}) {
  const a = ACCENT[accent];
  const isInteractive = typeof onClick === 'function';

  return (
    <Card
      variant="flat"
      padding="md"
      className={cn(
        'transition-all duration-300',
        isInteractive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-akili-md'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-2.5 text-akili-charbon-mute">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`shrink-0 w-8 h-8 rounded-md bg-akili-papyrus-deep flex items-center justify-center ${a.text}`}>
            <Icon size={16} strokeWidth={2} />
          </span>
          <span className="font-sans text-[13px] text-akili-charbon-soft font-medium truncate">
            {label}
          </span>
        </div>
        {sparkData.length > 0 && (
          <div className="shrink-0 w-[84px]">
            <Sparkline data={sparkData} color={a.spark} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-3 mt-4 flex-wrap">
        <span className="font-display font-extrabold text-3xl sm:text-4xl tracking-[-0.03em] text-akili-charbon leading-none">
          {value}
        </span>
        {delta && (
          <span className="inline-flex items-center gap-1 font-mono text-xs text-akili-success font-medium">
            <TrendingUp size={12} strokeWidth={2.5} />
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
