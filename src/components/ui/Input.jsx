/**
 * Input — Champ de saisie Akili
 * États : default / focus (indigo) / error (brique sahel) / disabled
 * Erreurs HUMAINES jamais alarmistes.
 */
import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

export function Input({
  label,
  type = 'text',
  value = '',
  onChange,
  placeholder,
  error,
  helper,
  required,
  disabled,
  iconLeft,
  iconRight,
  autoComplete,
  className,
  ...rest
}) {
  const id = useId();
  const [focus, setFocus] = useState(false);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className="text-[13px] font-medium text-akili-charbon-soft">
          {label}
          {required && <span className="text-akili-coral ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-akili-charbon-mute pointer-events-none flex items-center">
            {iconLeft}
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value, e)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helper ? `${id}-helper` : undefined}
          className={cn(
            'w-full h-11 bg-white border rounded-akili px-3.5 text-[15px]',
            'text-akili-charbon placeholder:text-akili-charbon-mute',
            'transition-all duration-200 ease-akili outline-none',
            iconLeft && 'pl-10',
            iconRight && 'pr-10',
            error
              ? 'border-akili-error'
              : focus
              ? 'border-akili-indigo'
              : 'border-akili-line',
            focus && !error && 'ring-4 ring-akili-indigo-50',
            focus && error && 'ring-4 ring-akili-coral-50',
            disabled && 'opacity-60 cursor-not-allowed bg-akili-papyrus-deep'
          )}
          {...rest}
        />

        {iconRight && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-akili-charbon-mute pointer-events-none flex items-center">
            {iconRight}
          </span>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-akili-error font-medium">
          {error}
        </p>
      )}
      {!error && helper && (
        <p id={`${id}-helper`} className="text-xs text-akili-charbon-mute">
          {helper}
        </p>
      )}
    </div>
  );
}
