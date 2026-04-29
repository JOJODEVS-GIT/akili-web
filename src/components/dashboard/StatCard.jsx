/**
 * StatCard — carte de stat avec sparkline animée et count-up.
 *
 * Améliorations PR #23 :
 * - Count-up animation sur la valeur (0 → target en 1.2s)
 * - Delta visuel coloré (success vert, warning rouge si négatif)
 * - Sparkline dessinée progressivement à l'apparition
 */
import { useRef, useState, useEffect } from 'react';
import {
  TrendUp as TrendingUp,
  TrendDown as TrendingDown,
} from '@phosphor-icons/react';
import {
  motion, useInView, animate, useMotionValue,
} from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Sparkline } from './Sparkline';
import { cn } from '@/lib/cn';

const ACCENT = {
  coral:  { text: 'text-akili-coral',    spark: '#FF6B5C' },
  or:     { text: 'text-akili-or-700',   spark: '#C9A33D' },
  indigo: { text: 'text-akili-indigo',   spark: '#0E1A3E' },
};

// Parse value pour détecter si c'est un nombre animable, sinon retourne la string
function parseValueForCountUp(value) {
  if (typeof value === 'number') return { num: value, prefix: '', suffix: '' };
  if (typeof value !== 'string') return null;

  // Extract first number found (e.g., "47 h" → 47, "h" suffix)
  const match = value.match(/^(\D*?)([\d\s,.]+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const num = parseFloat(numStr.replace(/[\s,]/g, ''));
  if (isNaN(num)) return null;
  return { num, prefix, suffix };
}

function CountUpValue({ value, duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(value);

  const parsed = parseValueForCountUp(value);

  useEffect(() => {
    if (!inView || !parsed) {
      setDisplay(value);
      return;
    }
    const controls = animate(motionVal, parsed.num, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        // Format avec séparateurs FR
        const formatted = parsed.num >= 100
          ? Math.round(v).toLocaleString('fr-FR')
          : v.toFixed(parsed.num % 1 !== 0 ? 1 : 0);
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, motionVal, parsed]);

  // Si la valeur n'est pas animable (ex: "99.2%"), on l'affiche tel quel
  if (!parsed) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{display}</span>;
}

/**
 * StatCard — carte de stat avec sparkline animée.
 */
export function StatCard({
  Icon,
  label,
  value,
  delta,
  deltaDirection = 'up', // 'up' | 'down'
  accent = 'indigo',
  sparkData = [],
  onClick,
}) {
  const a = ACCENT[accent];
  const isInteractive = typeof onClick === 'function';
  const isPositive = deltaDirection === 'up';
  const DeltaIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card
        variant="flat"
        padding="md"
        className={cn(
          'transition-all duration-300',
          isInteractive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-akili-md hover:border-akili-or'
        )}
        onClick={onClick}
      >
        <div className="flex items-center justify-between gap-2.5 text-akili-charbon-mute">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className={`shrink-0 w-8 h-8 rounded-md bg-akili-papyrus-deep flex items-center justify-center ${a.text}`}>
              <Icon size={18} weight="duotone" />
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
            <CountUpValue value={value} />
          </span>
          {delta && (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-xs font-medium',
                isPositive
                  ? 'bg-akili-success/10 text-akili-success'
                  : 'bg-akili-error/10 text-akili-error'
              )}
            >
              <DeltaIcon size={12} weight="bold" />
              {delta}
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
