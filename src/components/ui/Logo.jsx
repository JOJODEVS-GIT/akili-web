/**
 * Logo Akili — trois blocs colorés (corail · or · indigo) + wordmark "Akili."
 * Variants : full / mark / mono — Sizes : sm / md / lg / xl
 */
import { cn } from '@/lib/cn';

const SIZES = {
  sm: { block: 'w-1.5 h-[22px]', text: 'text-lg',  gap: 'gap-2',   blockGap: 'gap-[3px]' },
  md: { block: 'w-[7px] h-7',    text: 'text-2xl', gap: 'gap-2.5', blockGap: 'gap-[3px]' },
  lg: { block: 'w-[9px] h-9',    text: 'text-3xl', gap: 'gap-3',   blockGap: 'gap-1' },
  xl: { block: 'w-3 h-[52px]',   text: 'text-5xl', gap: 'gap-4',   blockGap: 'gap-1' },
};

export function Logo({ variant = 'full', size = 'md', onDark = false, className }) {
  const s = SIZES[size];

  const blocks = variant === 'mono'
    ? ['bg-akili-charbon', 'bg-akili-charbon', 'bg-akili-charbon']
    : ['bg-akili-coral', 'bg-akili-or', onDark ? 'bg-akili-papyrus' : 'bg-akili-indigo'];

  const wordColor = onDark ? 'text-akili-papyrus' : 'text-akili-charbon';

  const Mark = (
    <span className={cn('inline-flex items-end', s.blockGap)}>
      {blocks.map((bg, i) => (
        <span key={i} className={cn('rounded-sm inline-block', s.block, bg)} />
      ))}
    </span>
  );

  if (variant === 'mark') {
    return <span className={cn('inline-flex', className)}>{Mark}</span>;
  }

  return (
    <span className={cn('inline-flex items-center', s.gap, className)}>
      {Mark}
      <span
        className={cn(
          'font-display font-extrabold leading-none tracking-[-0.04em]',
          s.text,
          wordColor
        )}
      >
        Akili<span className="text-akili-coral">.</span>
      </span>
    </span>
  );
}
