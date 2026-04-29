/**
 * WelcomeModal — Modal de bienvenue affiché 1 fois après le premier login.
 *
 * Présente les 4 zones clés du dashboard avec illustrations + ce que
 * l'utilisateur peut y faire. Inspiré de Linear / Notion onboarding.
 *
 * Persistance via localStorage clé "akili.welcome.dismissed.v1" pour
 * ne s'afficher qu'une seule fois par browser.
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowRight, ArrowLeft, FlowArrow, Plug, ChartBar,
  Sparkle as Sparkles, MagnifyingGlass,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'akili.welcome.dismissed.v1';

const STEPS = [
  {
    eyebrow: '· Bienvenue ·',
    title: 'Bienvenue sur Akili,',
    accent: 'la sagesse au travail.',
    body: 'Tu as 4 zones clés à connaître pour tirer le maximum d\'Akili. Trois minutes pour faire le tour ?',
    Icon: Sparkles,
    iconBg: 'bg-akili-coral text-white shadow-akili-coral',
  },
  {
    eyebrow: '① Automatisations',
    title: 'Crée des flux qui tournent',
    accent: 'pendant que tu dors.',
    body: 'C\'est le cœur du produit. Tu décris une tâche répétitive en français, Akili l\'exécute automatiquement. Pioche un template ou pars de zéro.',
    Icon: FlowArrow,
    iconBg: 'bg-akili-or-50 text-akili-or-700',
    cta: { label: 'Voir les templates', href: '/app/automations' },
  },
  {
    eyebrow: '② Connexions',
    title: 'Branche tes outils',
    accent: 'en deux clics OAuth.',
    body: '21 outils supportés : Gmail, Stripe, Slack, Notion, GitHub… Tu valides chez le provider, c\'est branché. Pas de mot de passe à taper.',
    Icon: Plug,
    iconBg: 'bg-akili-indigo-50 text-akili-indigo',
    cta: { label: 'Voir mes connexions', href: '/app/connections' },
  },
  {
    eyebrow: '③ Exécutions',
    title: 'Suis ce qui tourne',
    accent: 'avec heatmap + logs.',
    body: 'Toutes les exécutions sont tracées 1 an. Heatmap d\'activité, taux de succès, alertes en cas d\'échec. Tu sais toujours où tu en es.',
    Icon: ChartBar,
    iconBg: 'bg-akili-coral-50 text-akili-coral-700',
    cta: { label: 'Voir mes runs', href: '/app/runs' },
  },
  {
    eyebrow: '④ Astuce pro',
    title: 'Garde-le en tête :',
    accent: '⌘K ouvre tout.',
    body: 'À tout moment, appuie sur Cmd+K (Mac) ou Ctrl+K (Linux/Windows) pour la palette de recherche rapide. Pages, actions, templates — tout est à un raccourci.',
    Icon: MagnifyingGlass,
    iconBg: 'bg-akili-or text-akili-indigo shadow-akili-or',
  },
];

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  // Affichage : 1 fois par browser, après un petit delay pour ne pas noyer le user
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
      const t = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(t);
    } catch {
      // localStorage indisponible — on n'affiche pas (privacy mode strict)
    }
  }, []);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {/* ignore */}
    setOpen(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else close();
  };

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-akili-indigo/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg bg-white rounded-akili shadow-akili-xl overflow-hidden"
            role="dialog"
            aria-label="Bienvenue sur Akili"
          >
            {/* Top : close + step indicator */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-akili-line">
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === step
                        ? 'w-6 bg-akili-coral'
                        : i < step
                          ? 'w-2 bg-akili-coral/40'
                          : 'w-2 bg-akili-line'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={close}
                aria-label="Fermer"
                className="w-8 h-8 rounded-md text-akili-charbon-mute hover:text-akili-charbon hover:bg-akili-papyrus-deep flex items-center justify-center transition-colors"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="px-8 py-10 text-center"
              >
                <div className="flex justify-center mb-6">
                  <span className={`w-16 h-16 rounded-2xl ${currentStep.iconBg} flex items-center justify-center`}>
                    <currentStep.Icon size={28} weight="duotone" />
                  </span>
                </div>

                <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
                  {currentStep.eyebrow}
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-[28px] tracking-[-0.02em] leading-tight mt-3 text-balance">
                  {currentStep.title}
                  <br />
                  <span className="text-akili-coral">{currentStep.accent}</span>
                </h2>
                <p className="font-sans text-[14.5px] text-akili-charbon-soft mt-4 leading-[1.55] max-w-[400px] mx-auto">
                  {currentStep.body}
                </p>

                {currentStep.cta && (
                  <Link
                    to={currentStep.cta.href}
                    onClick={close}
                    className="inline-flex items-center gap-1.5 mt-5 font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-all hover:gap-2.5"
                  >
                    {currentStep.cta.label}
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer nav */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-akili-line bg-akili-papyrus-deep">
              <button
                onClick={prev}
                disabled={isFirst}
                className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-akili-charbon-soft hover:text-akili-charbon disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-2"
              >
                <ArrowLeft size={14} weight="bold" />
                Retour
              </button>

              <span className="font-sans text-[12px] text-akili-charbon-mute">
                {step + 1} / {STEPS.length}
              </span>

              <Button
                size="sm"
                variant="primary"
                shape="pill"
                onClick={next}
                iconRight={!isLast ? <ArrowRight size={14} /> : undefined}
              >
                {isLast ? 'C\'est parti' : 'Suivant'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
