/**
 * Prose — composants typographiques pour pages légales / About / etc.
 * Style cohérent avec la charte Akili : pas de Tailwind Typography plugin nécessaire.
 */
import { cn } from '@/lib/cn';

export function H2({ children, id, className }) {
  return (
    <h2
      id={id}
      className={cn(
        'font-display font-extrabold text-[28px] sm:text-3xl tracking-[-0.02em] mt-12 mb-4 text-balance',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, id, className }) {
  return (
    <h3
      id={id}
      className={cn(
        'font-display font-extrabold text-xl tracking-[-0.01em] mt-8 mb-3',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function P({ children, className }) {
  return (
    <p className={cn('font-sans text-base leading-relaxed text-akili-charbon-soft mb-4', className)}>
      {children}
    </p>
  );
}

export function UL({ children, className }) {
  return (
    <ul className={cn('list-disc pl-6 space-y-2 mb-4 font-sans text-base leading-relaxed text-akili-charbon-soft marker:text-akili-coral', className)}>
      {children}
    </ul>
  );
}

export function LI({ children }) {
  return <li>{children}</li>;
}

export function Strong({ children }) {
  return <strong className="font-semibold text-akili-charbon">{children}</strong>;
}

export function Note({ title, children, accent = 'indigo' }) {
  const styles = {
    indigo: 'border-l-akili-indigo bg-akili-indigo-50',
    coral:  'border-l-akili-coral bg-akili-coral-50',
    or:     'border-l-akili-or bg-akili-or-50',
  };
  return (
    <div className={cn('border-l-4 px-5 py-4 my-6 rounded-r-akili', styles[accent])}>
      {title && (
        <div className="font-display font-bold text-sm text-akili-charbon mb-1.5">
          {title}
        </div>
      )}
      <div className="font-sans text-sm text-akili-charbon-soft leading-relaxed">
        {children}
      </div>
    </div>
  );
}
