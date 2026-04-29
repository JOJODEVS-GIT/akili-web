/**
 * DemoBanner — Bandeau qui s'affiche au-dessus du contenu dashboard
 * quand l'URL contient ?demo=true.
 *
 * Permet à un visiteur (jury, recruteur) d'explorer le dashboard sans
 * créer de compte. Les actions ne sont pas sauvegardées.
 */
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkle as Sparkles, X } from '@phosphor-icons/react';
import { useState } from 'react';

export function DemoBanner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const [dismissed, setDismissed] = useState(false);

  if (!isDemo || dismissed) return null;

  const exitDemo = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('demo');
    setSearchParams(next, { replace: true });
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-akili-or-50 border-b border-akili-or-100 px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap"
      >
        <span className="inline-flex items-center gap-2 font-display font-bold text-[12px] uppercase tracking-wider text-akili-or-900">
          <Sparkles size={14} weight="fill" className="animate-sparkle" />
          Mode démo
        </span>
        <span className="font-sans text-[13px] text-akili-charbon-soft text-center">
          Tu explores Akili avec des données simulées. Aucune action n'est sauvegardée.{' '}
          <Link to="/signup" className="font-display font-bold text-akili-coral hover:underline">
            Créer mon vrai compte →
          </Link>
        </span>
        <button
          onClick={exitDemo}
          aria-label="Quitter le mode démo"
          className="ml-2 w-6 h-6 rounded-md text-akili-charbon-mute hover:text-akili-charbon hover:bg-akili-or-100 flex items-center justify-center transition-colors"
        >
          <X size={14} weight="bold" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
