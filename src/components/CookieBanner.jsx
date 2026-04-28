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
            className="fixed bottom-4 inset-x-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md z-[90] bg-white border border-akili-line rounded-akili shadow-akili-xl p-5"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-10 h-10 rounded-akili bg-akili-or-50 text-akili-or-700 flex items-center justify-center">
                <Cookie size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-extrabold text-base">Un mot sur les cookies</h3>
                <p className="text-sm text-akili-charbon-soft mt-1.5 leading-relaxed">
                  Akili utilise <strong>3 cookies essentiels</strong> pour faire tourner ton compte. Pas de tracker publicitaire, pas de partage avec des tiers.{' '}
                  <Link to="/legal/cookies" className="text-akili-coral font-semibold hover:underline">
                    En savoir plus
                  </Link>.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2">
              <Button size="sm" variant="primary" fullWidth onClick={acceptAll}>
                Tout accepter
              </Button>
              <Button size="sm" variant="outline" fullWidth onClick={rejectNonEssential}>
                Essentiels uniquement
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={settings.open}
                iconLeft={<Settings size={14} />}
              >
                Personnaliser
              </Button>
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
