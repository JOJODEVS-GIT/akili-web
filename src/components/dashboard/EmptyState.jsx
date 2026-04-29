/**
 * EmptyState — affichage quand l'user n'a pas encore d'automatisation.
 *
 * Pattern volé à Linear / Activepieces : au lieu d'un simple "Aucune
 * automatisation", on guide vers les 3 chemins possibles avec des
 * cards cliquables qui expliquent ce qui se passe ensuite.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkle as Sparkles, Plus, Lightning, Plug, BookOpen, ArrowRight,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

const QUICK_PATHS = [
  {
    Icon: Lightning,
    accent: 'coral',
    title: 'Démarrer avec un template',
    body: '20 templates prêts. Tu pioches, tu connectes, tu lances.',
    cta: 'Voir les templates',
    href: '/app/automations?tab=marketplace',
  },
  {
    Icon: Plug,
    accent: 'or',
    title: 'Connecter un outil',
    body: 'Branche Gmail, Stripe ou Slack en deux clics OAuth.',
    cta: 'Mes connexions',
    href: '/app/connections',
  },
  {
    Icon: BookOpen,
    accent: 'indigo',
    title: 'Lire la documentation',
    body: 'Guide pratique pour créer ta première automatisation.',
    cta: 'Voir la doc',
    href: '/app/docs',
  },
];

const ACCENTS = {
  coral:  { bg: 'bg-akili-coral-50',   text: 'text-akili-coral-700',  border: 'hover:border-akili-coral' },
  or:     { bg: 'bg-akili-or-50',      text: 'text-akili-or-900',     border: 'hover:border-akili-or' },
  indigo: { bg: 'bg-akili-indigo-50',  text: 'text-akili-indigo',     border: 'hover:border-akili-indigo' },
};

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function EmptyState({ onCreate }) {
  return (
    <div className="px-4 py-12 sm:py-16 max-w-3xl mx-auto">
      {/* Hero illustration + title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Halo derrière l'icône */}
          <div
            aria-hidden
            className="absolute inset-0 -m-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,107,92,0.18) 0%, rgba(255,107,92,0) 65%)',
            }}
          />
          <div className="relative w-20 h-20 rounded-3xl bg-akili-coral text-white flex items-center justify-center shadow-akili-coral animate-sparkle">
            <Sparkles size={36} weight="fill" />
          </div>
        </div>

        <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] text-akili-charbon">
          Ton premier souffle commence ici.
        </h3>
        <p className="font-sans text-base text-akili-charbon-soft mt-3 max-w-[480px] mx-auto leading-[1.55]">
          Trois chemins possibles pour démarrer. Pioche celui qui te parle, on s'occupe du reste.
        </p>

        {/* Primary CTA */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="md"
            variant="primary"
            shape="pill"
            onClick={onCreate}
            iconLeft={<Plus size={16} weight="bold" />}
          >
            Créer ma première automatisation
          </Button>
          <Link to="/app/docs" className="font-display font-bold text-sm text-akili-charbon-soft hover:text-akili-coral transition-colors">
            ou regarder la démo →
          </Link>
        </div>
      </motion.div>

      {/* 3 quick paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        {QUICK_PATHS.map((path, i) => {
          const a = ACCENTS[path.accent];
          return (
            <motion.div
              key={path.title}
              custom={i + 1}
              initial="hidden"
              animate="visible"
              variants={reveal}
            >
              <Link
                to={path.href}
                className={`group block p-5 bg-white border border-akili-line rounded-akili ${a.border} hover:shadow-akili-md hover:-translate-y-0.5 transition-all duration-300 h-full`}
              >
                <span className={`w-11 h-11 rounded-akili ${a.bg} ${a.text} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                  <path.Icon size={22} weight="duotone" />
                </span>
                <h4 className="font-display font-extrabold text-[15px] mt-4 tracking-tight text-akili-charbon">
                  {path.title}
                </h4>
                <p className="font-sans text-[13px] text-akili-charbon-soft mt-2 leading-[1.5]">
                  {path.body}
                </p>
                <div className={`mt-4 inline-flex items-center gap-1.5 font-display font-bold text-[12px] uppercase tracking-wider ${a.text} group-hover:gap-2.5 transition-all`}>
                  {path.cta}
                  <ArrowRight size={12} weight="bold" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Hint Cmd+K */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center font-sans text-[12px] text-akili-charbon-mute mt-10"
      >
        💡 Astuce : appuie sur{' '}
        <kbd className="font-mono px-1.5 py-0.5 bg-akili-papyrus-deep border border-akili-line rounded text-[11px] text-akili-charbon">
          ⌘K
        </kbd>{' '}
        à n'importe quel moment pour ouvrir la palette de commandes.
      </motion.p>
    </div>
  );
}
