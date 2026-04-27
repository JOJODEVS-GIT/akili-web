/**
 * Card — Surface contenue d'Akili
 * Variants : flat / elevated / outlined / indigo
 * Padding  : sm (16px) / md (24px) / lg (32px)
 */
import { cn } from '@/lib/cn';

const VARIANTS = {
  flat:     'bg-white border border-akili-line',
  elevated: 'bg-white shadow-akili-md border border-akili-line/50',
  outlined: 'bg-transparent border-2 border-akili-line',
  indigo:   'bg-akili-indigo text-akili-papyrus border border-akili-indigo-700',
};

const PADDINGS = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'flat',
  padding = 'md',
  interactive = false,
  children,
  className,
  ...rest
}) {
  return (
    <div
      className={cn(
        'rounded-akili transition-all duration-200 ease-akili',
        VARIANTS[variant],
        PADDINGS[padding],
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-akili-lg',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
