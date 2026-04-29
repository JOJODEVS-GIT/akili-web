/**
 * Button — Composant CTA d'Akili
 * Variants : primary (corail) / secondary (indigo) / ghost / outline / or
 * Sizes    : sm / md / lg
 * Shape    : 'default' (rounded-akili 8px) / 'pill' (rounded-full)
 *
 * Tip : pour les CTAs landing/marketing, préférer shape="pill" (style
 * inspiré d'Activepieces). Par défaut on garde rounded-akili pour
 * compatibilité avec le dashboard et les forms.
 */
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const VARIANTS = {
  primary:
    'bg-akili-coral text-white hover:bg-akili-coral-700 shadow-akili-sm hover:shadow-akili-coral',
  secondary:
    'bg-akili-indigo text-akili-papyrus hover:bg-akili-indigo-700 shadow-akili-sm',
  ghost:
    'bg-transparent text-akili-charbon hover:bg-akili-papyrus-deep',
  outline:
    'bg-transparent text-akili-indigo border-2 border-akili-indigo hover:bg-akili-indigo-50',
  or:
    'bg-akili-or text-akili-charbon hover:bg-akili-or-700 shadow-akili-sm hover:shadow-akili-or',
};

const SIZES = {
  sm: 'h-9  px-4 text-sm  gap-2',
  md: 'h-11 px-6 text-[15px] gap-2',
  lg: 'h-14 px-8 text-[17px] gap-3',
};

const SHAPES = {
  default: 'rounded-akili',
  pill:    'rounded-full',
};

export function Button({
  variant = 'primary',
  size = 'md',
  shape = 'default',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  type = 'button',
  onClick,
  children,
  className,
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-display font-bold',
        'transition-all duration-200 ease-akili',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-akili-coral focus-visible:ring-offset-2',
        SHAPES[shape],
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {iconLeft && <span className="shrink-0 inline-flex items-center">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="shrink-0 inline-flex items-center">{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
}

function Spinner() {
  return (
    <motion.span
      className="block w-5 h-5 rounded-full border-2 border-current border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}
