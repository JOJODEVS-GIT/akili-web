/**
 * HeroTerminal — Mockup produit affiché à droite du Hero.
 * Montre Akili en action via un terminal stylisé qui se "tape" tout seul.
 */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { type: 'cmd',    text: '$ akili run invoice-monthly' },
  { type: 'info',   text: '→ Lecture de 47 entrées Stripe...' },
  { type: 'info',   text: '→ Génération des PDF...' },
  { type: 'info',   text: '→ Envoi des 47 emails...' },
  { type: 'ok',     text: '✓ Terminé en 12.4s · 4 h 20 économisées' },
];

const COLORS = {
  cmd:  'text-akili-papyrus',
  info: 'text-akili-or',
  ok:   'text-akili-success',
};

export function HeroTerminal() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) {
      const reset = setTimeout(() => setVisible(0), 4000);
      return () => clearTimeout(reset);
    }
    const next = setTimeout(() => setVisible((v) => v + 1), 700);
    return () => clearTimeout(next);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="hidden lg:block relative"
    >
      {/* Carte automatisation flottante en haut-droite (decorative) */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 4 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute -top-6 -right-4 z-10 bg-white rounded-akili p-4 shadow-akili-lg border border-akili-line w-[240px]"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-coral">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[13px] text-akili-charbon truncate">
              Factures → PDF
            </div>
            <div className="text-[11px] text-akili-charbon-mute">il y a 2 h</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-akili-success" />
          <span className="text-akili-success font-medium">actif</span>
          <span className="ml-auto font-mono text-akili-charbon-soft">12 h/mois</span>
        </div>
      </motion.div>

      {/* Terminal principal */}
      <div className="relative bg-akili-indigo-950 border border-akili-indigo-700 rounded-akili p-6 shadow-akili-xl backdrop-blur">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 mb-5 pb-4 border-b border-akili-indigo-700">
          <span className="w-3 h-3 rounded-full bg-akili-coral" />
          <span className="w-3 h-3 rounded-full bg-akili-or" />
          <span className="w-3 h-3 rounded-full bg-akili-success" />
          <span className="ml-auto font-mono text-[11px] text-akili-charbon-mute">
            akili · ~/projects
          </span>
        </div>

        {/* Lines */}
        <div className="font-mono text-[13px] leading-relaxed min-h-[148px]">
          {LINES.slice(0, visible).map((line, i) => (
            <motion.div
              key={`${visible}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={COLORS[line.type]}
            >
              {line.text}
            </motion.div>
          ))}
          {visible < LINES.length && (
            <span className="inline-block w-2 h-4 bg-akili-papyrus animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      </div>

      {/* Stat flottante en bas-gauche (decorative) */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute -bottom-6 -left-6 bg-akili-or text-akili-charbon rounded-akili px-5 py-3 shadow-akili-or"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-2xl tracking-[-0.02em]">
            +38h
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider opacity-80">
            ce mois
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
