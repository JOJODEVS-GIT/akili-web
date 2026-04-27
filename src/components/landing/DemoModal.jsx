/**
 * DemoModal — démo interactive du produit (alternative à une vidéo).
 * Joue une séquence de 4 scènes en boucle, chacune montre Akili "en action".
 * Plus crédible qu'une vidéo IA générique : c'est l'app qui se montre elle-même.
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, FileText, CheckCircle2, Loader2, ArrowRight, Hourglass,
  Workflow, PlayCircle,
} from 'lucide-react';

const SCENES = [
  { id: 0, label: '1. Décris ton besoin' },
  { id: 1, label: '2. Akili comprend' },
  { id: 2, label: '3. Lancement' },
  { id: 3, label: '4. Temps gagné' },
];

const SCENE_DURATION = 3500;

export function DemoModal({ isOpen, onClose }) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setScene(0);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      setScene((s) => (s + 1) % SCENES.length);
    }, SCENE_DURATION);
    return () => clearTimeout(t);
  }, [scene, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-akili-indigo-950/85 backdrop-blur-md"
      />
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="relative w-full max-w-4xl pointer-events-auto">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 sm:-top-12 sm:right-0 w-10 h-10 rounded-full bg-akili-coral text-white shadow-akili-coral hover:bg-akili-coral-700 transition-colors flex items-center justify-center"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

          <div className="bg-akili-indigo border border-akili-indigo-700 rounded-akili shadow-akili-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-akili-indigo-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-akili-coral opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-akili-coral" />
                </span>
                <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or">
                  Démo · {SCENES[scene].label}
                </span>
              </div>
              <span className="font-mono text-xs text-akili-indigo-100">
                {scene + 1} / {SCENES.length}
              </span>
            </div>

            {/* Scenes */}
            <div className="relative h-[420px] sm:h-[460px] bg-akili-indigo-950 overflow-hidden">
              <AnimatePresence mode="wait">
                {scene === 0 && <Scene0 key="0" />}
                {scene === 1 && <Scene1 key="1" />}
                {scene === 2 && <Scene2 key="2" />}
                {scene === 3 && <Scene3 key="3" />}
              </AnimatePresence>
            </div>

            {/* Progress bars */}
            <div className="px-6 py-4 border-t border-akili-indigo-700 flex gap-2">
              {SCENES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setScene(i)}
                  className="h-1 flex-1 rounded-full overflow-hidden bg-akili-indigo-700"
                  aria-label={`Aller à la scène ${i + 1}`}
                >
                  {i < scene && <span className="block h-full w-full bg-akili-or" />}
                  {i === scene && (
                    <motion.span
                      key={`prog-${scene}`}
                      className="block h-full bg-akili-or"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SCENE_DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const sceneAnim = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};

/* ━━━ Scène 0 — Description ━━━ */
function Scene0() {
  return (
    <motion.div {...sceneAnim} className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-akili p-6 shadow-akili-xl">
          <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold mb-3">
            Que veux-tu automatiser ?
          </div>
          <TypewriterText text="Génère une facture PDF chaque vente Stripe et envoie-la au client par email" />
          <div className="mt-4 pt-4 border-t border-akili-line flex items-center gap-2 text-xs text-akili-charbon-mute">
            <span className="relative inline-flex w-1.5 h-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-akili-coral opacity-75" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-akili-coral" />
            </span>
            Akili écoute...
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━ Scène 1 — Akili comprend ━━━ */
function Scene1() {
  const steps = [
    { Icon: PlayCircle,    label: 'Trigger',  detail: 'Nouvelle vente Stripe' },
    { Icon: FileText,      label: 'Action 1', detail: 'Générer le PDF' },
    { Icon: ArrowRight,    label: 'Action 2', detail: 'Envoyer par email' },
  ];

  return (
    <motion.div {...sceneAnim} className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-akili p-6 shadow-akili-xl">
          <div className="text-[11px] uppercase tracking-wider text-akili-coral font-bold mb-4">
            Akili a compris
          </div>
          <div className="flex items-stretch gap-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex-1 p-4 rounded-akili border-2 border-akili-line"
              >
                <div className="w-9 h-9 rounded-md bg-akili-papyrus-deep flex items-center justify-center text-akili-indigo mb-3">
                  <s.Icon size={16} />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-akili-charbon-mute font-bold">
                  {s.label}
                </div>
                <div className="font-display font-bold text-sm mt-1">{s.detail}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-4 text-[12px] text-akili-charbon-soft"
          >
            ✓ Workflow proposé en 0,8 seconde
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━ Scène 2 — Lancement ━━━ */
function Scene2() {
  const lines = [
    { delay: 0,    text: '$ akili run invoice-from-stripe', color: 'text-akili-papyrus' },
    { delay: 600,  text: '→ Lecture vente Stripe...', color: 'text-akili-or' },
    { delay: 1200, text: '→ Génération PDF...',         color: 'text-akili-or' },
    { delay: 1800, text: '→ Envoi email à client@xy.io...', color: 'text-akili-or' },
    { delay: 2400, text: '✓ Terminé en 2.4s',           color: 'text-akili-success' },
  ];

  return (
    <motion.div {...sceneAnim} className="absolute inset-0 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-akili-indigo-950 border border-akili-indigo-700 rounded-akili p-5 shadow-akili-xl">
          <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-akili-indigo-700">
            <span className="w-3 h-3 rounded-full bg-akili-coral" />
            <span className="w-3 h-3 rounded-full bg-akili-or" />
            <span className="w-3 h-3 rounded-full bg-akili-success" />
            <span className="ml-auto font-mono text-[11px] text-akili-charbon-mute">
              akili · live
            </span>
          </div>
          <div className="font-mono text-[13px] leading-relaxed min-h-[140px]">
            {lines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: l.delay / 1000, duration: 0.3 }}
                className={l.color}
              >
                {l.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ━━━ Scène 3 — Temps gagné ━━━ */
function Scene3() {
  return (
    <motion.div {...sceneAnim} className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="w-20 h-20 rounded-full bg-akili-or text-akili-charbon flex items-center justify-center mb-6 shadow-akili-or"
      >
        <CheckCircle2 size={40} strokeWidth={2.5} />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display font-extrabold text-3xl sm:text-4xl tracking-[-0.03em] text-akili-papyrus mb-3"
      >
        Tu viens de gagner <span className="text-akili-or">2 h 14</span>.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-akili-indigo-100 text-base max-w-md leading-relaxed"
      >
        Multiplie ça par 47 ventes ce mois.<br />
        <span className="text-akili-or font-display font-bold">105 heures retrouvées.</span>
      </motion.p>
    </motion.div>
  );
}

/* ━━━ Typewriter ━━━ */
function TypewriterText({ text }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    setShown('');
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      setShown(text.slice(0, ++i));
    }, 28);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="font-display font-bold text-xl text-akili-charbon leading-snug min-h-[80px]">
      {shown}
      <span className="inline-block w-0.5 h-5 bg-akili-coral animate-pulse ml-0.5 align-middle" />
    </p>
  );
}
