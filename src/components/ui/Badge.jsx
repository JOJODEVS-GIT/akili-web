/**
 * Badge — Étiquette colorée d'Akili
 * Variants : indigo / or / coral / success / warning / error / neutral
 * Optionnel : dot (pastille colorée à gauche)
 */
import { cn } from '@/lib/cn';

const VARIANTS = {
  indigo:  'bg-akili-indigo-50 text-akili-indigo-700 ring-akili-indigo-100',
  or:      'bg-akili-or-50 text-akili-or-900 ring-akili-or-100',
  coral:   'bg-akili-coral-50 text-akili-coral-700 ring-akili-coral-100',
  success: 'bg-[#E7F5EE] text-[#1E6B43] ring-[#B3DDC4]',
  warning: 'bg-[#FBEEDD] text-[#8A5A1F] ring-[#F1D7AD]',
  error:   'bg-[#F8E0DD] text-[#8E2519] ring-[#EDB6AE]',
  neutral: 'bg-akili-papyrus-deep text-akili-charbon-soft ring-akili-line',
};

const DOT_COLORS = {
  indigo:  'bg-akili-indigo-700',
  or:      'bg-akili-or-900',
  coral:   'bg-akili-coral-700',
  success: 'bg-[#1E6B43]',
  warning: 'bg-[#8A5A1F]',
  error:   'bg-[#8E2519]',
  neutral: 'bg-akili-charbon-soft',
};

export function Badge({ variant = 'neutral', dot = false, children, className, ...rest }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium text-[11px] px-2 py-0.5 rounded-md ring-1 ring-inset whitespace-nowrap',
        VARIANTS[variant],
        className
      )}
      {...rest}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', DOT_COLORS[variant])} />}
      {children}
    </span>
  );
}
