/**
 * CookieBanner — bannière de consentement RGPD.
 * Apparaît au premier visit, persiste le choix dans localStorage.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X, GearSix as Settings } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useDisclosure } from '@/hooks/useDisclosure';

const STORAGE_KEY = 'akili.cookies.consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const settings = useDisclosure();
  const [prefs, setPrefs] = useState({
    essential: true,    // toujours actif, non modifiable
    preferences: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      } else {
        setPrefs(JSON.parse(stored));
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (config) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {}
    setPrefs(config);
    setVisible(false);
    settings.close();
  };

  const acceptAll = () => save({ essential: true, preferences: true, analytics: true, marketing: true });
  const rejectNonEssential = () => save({ essential: true, preferences: false, analytics: false, marketing: false });
  const saveCustom = () => save(prefs);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-label="Bannière cookies"
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-3xl"
          >
            {/* Card avec backdrop blur — pattern moderne (Activepieces / Stripe / Linear) */}
            <div
              className="rounded-full border border-akili-line shadow-akili-xl px-5 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Texte */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Cookie size={18} weight="duotone" className="shrink-0 text-akili-or-700" />
                <p className="text-[13px] text-akili-charbon-soft leading-snug">
                  On utilise <strong className="text-akili-charbon">quelques cookies essentiels</strong> pour faire tourner ton compte. Aucun tracker publicitaire.{' '}
                  <Link to="/legal/cookies" className="text-akili-coral font-semibold hover:underline whitespace-nowrap">
                    En savoir plus →
                  </Link>
                </p>
              </div>

              {/* Boutons compact, pill, alignés à droite */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={settings.open}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-display font-bold text-akili-charbon-soft hover:text-akili-charbon hover:bg-akili-papyrus-deep transition-all"
                >
                  <Settings size={12} weight="bold" />
                  Personnaliser
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-1.5 rounded-full text-[12px] font-display font-bold text-akili-charbon border border-akili-line hover:border-akili-charbon hover:bg-akili-papyrus-deep transition-all whitespace-nowrap"
                >
                  Tout refuser
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-1.5 rounded-full text-[12px] font-display font-bold text-white bg-akili-coral hover:bg-akili-coral-700 hover:shadow-akili-coral transition-all whitespace-nowrap"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal personnalisation */}
      <Modal
        isOpen={settings.isOpen}
        onClose={settings.close}
        title="Préférences cookies"
        description="Choisis précisément quels cookies tu autorises. Tu peux changer d'avis à tout moment."
        size="md"
      >
        <div className="space-y-3">
          <PrefRow
            title="Essentiels"
            help="Connexion, sécurité, persistance de session. Indispensables au fonctionnement."
            checked={true}
            disabled
          />
          <PrefRow
            title="Préférences"
            help="Mémorisation de tes choix (langue, thème, vue grille/liste)."
            checked={prefs.preferences}
            onChange={(v) => setPrefs({ ...prefs, preferences: v })}
          />
          <PrefRow
            title="Statistiques anonymisées"
            help="Métriques d'usage pour améliorer le produit. Aucune donnée personnelle."
            checked={prefs.analytics}
            onChange={(v) => setPrefs({ ...prefs, analytics: v })}
          />
          <PrefRow
            title="Marketing"
            help="On n'en utilise aucun. Cette option est là pour information."
            checked={prefs.marketing}
            onChange={(v) => setPrefs({ ...prefs, marketing: v })}
            disabled
          />
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="ghost" onClick={rejectNonEssential}>
            Refuser tout (essentiels uniquement)
          </Button>
          <Button variant="primary" onClick={saveCustom}>
            Enregistrer mes préférences
          </Button>
        </div>
      </Modal>
    </>
  );
}

function PrefRow({ title, help, checked, onChange, disabled }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-akili-line last:border-b-0">
      <div className="flex-1">
        <div className="font-display font-bold text-sm text-akili-charbon">{title}</div>
        <p className="text-xs text-akili-charbon-mute mt-0.5 leading-relaxed">{help}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
          checked ? 'bg-akili-coral' : 'bg-akili-papyrus-deep'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        role="switch"
        aria-checked={checked}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}
