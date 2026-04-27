/**
 * Container — Wrapper centré avec max-width contrôlée.
 * Sizes : sm (672) / md (896) / lg (1152) / xl (1280) / full
 */
import { cn } from '@/lib/cn';

const SIZES = {
  sm:   'max-w-2xl',
  md:   'max-w-4xl',
  lg:   'max-w-6xl',
  xl:   'max-w-7xl',
  full: 'max-w-none',
};

export function Container({ size = 'lg', children, className, ...rest }) {
  return (
    <div
      className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', SIZES[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
