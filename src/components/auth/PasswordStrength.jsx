/**
 * PasswordStrength — barre de progression + label de la force du mot de passe.
 * Score sur 5 critères : longueur, minuscule, majuscule, chiffre, spécial.
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

function scorePassword(pwd = '') {
  if (!pwd) return { score: 0, label: '', color: '', tips: [] };
  const tests = [
    { regex: /.{8,}/,      label: '8 caractères minimum' },
    { regex: /[a-z]/,      label: 'une minuscule' },
    { regex: /[A-Z]/,      label: 'une majuscule' },
    { regex: /[0-9]/,      label: 'un chiffre' },
    { regex: /[^A-Za-z0-9]/, label: 'un caractère spécial' },
  ];
  const passed = tests.filter((t) => t.regex.test(pwd)).length;
  const tips = tests.filter((t) => !t.regex.test(pwd)).map((t) => t.label);

  const labels = ['', 'Très faible', 'Faible', 'Correct', 'Bon', 'Excellent'];
  const colors = ['', 'bg-akili-error', 'bg-akili-warning', 'bg-akili-or', 'bg-akili-or', 'bg-akili-success'];
  const textColors = ['', 'text-akili-error', 'text-akili-warning', 'text-akili-or-700', 'text-akili-or-700', 'text-akili-success'];

  return { score: passed, label: labels[passed], color: colors[passed], textColor: textColors[passed], tips };
}

export function PasswordStrength({ password }) {
  const { score, label, color, textColor, tips } = useMemo(() => scorePassword(password), [password]);

  if (!password) return null;

  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{
              backgroundColor: i <= score
                ? `var(--tw-color-${color.replace('bg-', '')})` // fallback in case
                : '',
            }}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i <= score ? color : 'bg-akili-papyrus-deep'
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span className={cn('font-medium', textColor)}>{label}</span>
        {tips.length > 0 && (
          <span className="text-akili-charbon-mute truncate">
            Manque : {tips.slice(0, 2).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
}
