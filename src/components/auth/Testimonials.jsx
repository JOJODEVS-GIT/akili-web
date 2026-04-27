/**
 * Testimonials — carousel de témoignages animé pour le panneau droit AuthShell.
 * Chaque témoignage s'affiche ~6.5s, fade out, suivant fade in.
 * Les utilisateurs peuvent naviguer manuellement via les indicateurs.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';

const TESTIMONIALS = [
  {
    quote: 'Akili m’a rendu mes',
    highlight: 'vendredis soir',
    end: '.',
    author: 'Aïcha D.',
    role: 'Fondatrice, studio de design à Cotonou',
  },
  {
    quote: 'Avant : 4 heures de copier-coller. Maintenant :',
    highlight: 'un café et c’est bon',
    end: '.',
    author: 'Marc K.',
    role: 'DevOps, Lagos',
  },
  {
    quote: 'Ma comptable pleure de joie chaque fin de mois.',
    highlight: '200 factures en 12 secondes',
    end: '.',
    author: 'Fatou D.',
    role: 'Directrice de PME, Dakar',
  },
  {
    quote: 'J’ai automatisé ma vie sans',
    highlight: 'écrire une ligne de code',
    end: '.',
    author: 'Eric M.',
    role: 'Chef de projet, Abidjan',
  },
  {
    quote: 'Akili tient ce qu’elle promet :',
    highlight: 'du temps que tu ne perds plus',
    end: '.',
    author: 'Linda R.',
    role: 'Freelance graphiste, Paris',
  },
  {
    quote: 'On déploie le vendredi à 18 h.',
    highlight: 'Akili veille pendant qu’on dort',
    end: '.',
    author: 'Yann L.',
    role: 'CTO, startup à Nairobi',
  },
];

const ROTATION_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, ROTATION_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  const current = TESTIMONIALS[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Container fixe pour éviter les sauts de layout entre quotes de longueurs différentes */}
      <div className="min-h-[280px] flex flex-col justify-end">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="m-0"
          >
            <p className="font-display font-extrabold text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] text-akili-papyrus text-balance">
              «&nbsp;{current.quote}{' '}
              <span className="text-akili-or">{current.highlight}</span>
              {current.end}&nbsp;»
            </p>
            <footer className="mt-6 font-sans text-sm text-akili-indigo-100">
              <span className="font-medium text-akili-papyrus">{current.author}</span>
              <span className="mx-1.5 text-akili-indigo-400">·</span>
              <span>{current.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Indicateurs cliquables */}
      <div
        role="tablist"
        aria-label="Témoignages"
        className="flex items-center gap-2 mt-8"
      >
        {TESTIMONIALS.map((_, i) => {
          const isActive = i === index;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isActive}
              aria-label={`Témoignage ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1 rounded-full overflow-hidden transition-all duration-500 ease-akili',
                isActive ? 'w-10 bg-akili-or/20' : 'w-5 bg-akili-papyrus/20 hover:bg-akili-papyrus/40'
              )}
            >
              {isActive && !paused && (
                <motion.span
                  key={`progress-${index}`}
                  className="block h-full bg-akili-or"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: ROTATION_MS / 1000, ease: 'linear' }}
                />
              )}
              {isActive && paused && (
                <span className="block h-full w-full bg-akili-or" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
