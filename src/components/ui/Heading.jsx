/**
 * Heading — Titre Akili (Cabinet Grotesk Extrabold)
 * Sépare le niveau sémantique du niveau visuel.
 */
import { cn } from '@/lib/cn';

const SIZES = {
  xs:    'text-xl',
  sm:    'text-2xl',
  md:    'text-3xl',
  lg:    'text-[40px] leading-[48px]',
  xl:    'text-[56px] leading-[60px]',
  '2xl': 'text-[72px] leading-[76px]',
  '3xl': 'text-[96px] leading-[96px]',
};

const COLORS = {
  charbon: 'text-akili-charbon',
  indigo:  'text-akili-indigo',
  papyrus: 'text-akili-papyrus',
  coral:   'text-akili-coral',
};

export function Heading({
  level = 2,
  size = 'lg',
  color = 'charbon',
  balance = false,
  children,
  className,
  ...rest
}) {
  const Tag = `h${level}`;
  return (
    <Tag
      className={cn(
        'font-display font-extrabold tracking-[-0.03em]',
        SIZES[size],
        COLORS[color],
        balance && 'text-balance',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
