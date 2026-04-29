/**
 * CommandPalette — Palette de commandes Cmd+K (Linear / Raycast / Vercel-style).
 *
 * Ouverture : Cmd+K (Mac) ou Ctrl+K (Windows/Linux).
 * Fermeture : Esc, click backdrop, ou sélection d'un item.
 * Navigation clavier : flèches haut/bas + Enter.
 *
 * Catégories :
 *  - Pages (navigation rapide)
 *  - Templates (lance un template)
 *  - Aide / Documentation
 */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass, ArrowRight, House, FlowArrow, ChartBar, Plug,
  BookOpen, User, Gear, SignOut, Lightning, Question, Sparkle,
} from '@phosphor-icons/react';
import { useAuth } from '@/contexts/AuthContext';
import { TEMPLATES } from '@/data/templates';
import { cn } from '@/lib/cn';

// Items globaux (pages dashboard + actions)
function buildCommandItems(navigate, signOut) {
  return [
    // ━━━ PAGES ━━━
    { id: 'page-home',     group: 'Pages', label: 'Tableau de bord',  description: 'Vue d\'ensemble', Icon: House,     onSelect: () => navigate('/app') },
    { id: 'page-auto',     group: 'Pages', label: 'Automatisations',  description: 'Toutes mes autos', Icon: FlowArrow, onSelect: () => navigate('/app/automations') },
    { id: 'page-runs',     group: 'Pages', label: 'Exécutions',       description: 'Historique + heatmap', Icon: ChartBar, onSelect: () => navigate('/app/runs') },
    { id: 'page-conn',     group: 'Pages', label: 'Connexions',       description: 'Outils branchés', Icon: Plug,      onSelect: () => navigate('/app/connections') },
    { id: 'page-docs',     group: 'Pages', label: 'Documentation',    description: 'Guides et API', Icon: BookOpen,  onSelect: () => navigate('/app/docs') },
    { id: 'page-profile',  group: 'Pages', label: 'Mon profil',       description: 'Identité, avatar', Icon: User,    onSelect: () => navigate('/app/profile') },
    { id: 'page-settings', group: 'Pages', label: 'Paramètres',       description: 'Préférences, notifs', Icon: Gear,  onSelect: () => navigate('/app/settings') },

    // ━━━ ACTIONS ━━━
    { id: 'action-new',    group: 'Actions', label: 'Nouvelle automatisation', description: 'Créer en partant de zéro', Icon: Sparkle, onSelect: () => navigate('/app/automations?new=true') },
    { id: 'action-marketplace', group: 'Actions', label: 'Parcourir la marketplace', description: '20 templates prêts', Icon: Lightning, onSelect: () => navigate('/app/automations?tab=marketplace') },
    { id: 'action-help',   group: 'Aide',     label: 'Contacter l\'équipe',     description: 'hello@akili.app, sous 4 h', Icon: Question, onSelect: () => { window.location.href = 'mailto:hello@akili.app?subject=Question%20Akili'; } },
    { id: 'action-logout', group: 'Compte',   label: 'Se déconnecter',           description: 'Quitter l\'app', Icon: SignOut, onSelect: () => signOut() },
  ];
}

// Templates rapides (top 5 à montrer)
const TOP_TEMPLATES = ['t01', 't09', 't12', 't18', 't20'];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  // Listener Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  // Focus input quand ouvre
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
    if (!open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  // Items filtrés
  const items = useMemo(() => buildCommandItems(navigate, signOut), [navigate, signOut]);

  const templateItems = useMemo(() => {
    return TOP_TEMPLATES.map((id) => {
      const t = TEMPLATES.find((x) => x.id === id);
      if (!t) return null;
      return {
        id: `template-${id}`,
        group: 'Templates populaires',
        label: t.name,
        description: t.desc,
        Icon: t.Icon,
        onSelect: () => navigate(`/templates/${id}`),
      };
    }).filter(Boolean);
  }, [navigate]);

  const allItems = [...items, ...templateItems];

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        (it.description && it.description.toLowerCase().includes(q)) ||
        it.group.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Group by category for display
  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((it) => {
      if (!map[it.group]) map[it.group] = [];
      map[it.group].push(it);
    });
    return map;
  }, [filtered]);

  // Reset active index on filter change
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Keyboard nav
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[activeIdx];
      if (item) {
        item.onSelect();
        setOpen(false);
      }
    }
  };

  const handleSelect = (item) => {
    item.onSelect();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-akili-indigo/40 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101] w-[calc(100%-2rem)] max-w-xl bg-white rounded-akili shadow-akili-xl border border-akili-line overflow-hidden"
            role="dialog"
            aria-label="Palette de commandes"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-akili-line">
              <MagnifyingGlass size={18} className="text-akili-charbon-mute shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Cherche une page, une action, un template…"
                className="flex-1 outline-none font-sans text-[15px] text-akili-charbon placeholder:text-akili-charbon-mute bg-transparent"
              />
              <kbd className="hidden sm:inline-flex shrink-0 font-mono px-1.5 py-0.5 bg-akili-papyrus-deep border border-akili-line rounded text-[11px] text-akili-charbon-mute">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="font-display font-bold text-akili-charbon-mute">
                    Aucun résultat pour "{query}"
                  </p>
                  <p className="font-sans text-[13px] text-akili-charbon-mute mt-2">
                    Essaie des mots-clés comme "automatisation", "stripe", "factures".
                  </p>
                </div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group} className="mb-2">
                    <div className="px-5 py-1.5 font-display font-bold text-[10px] uppercase tracking-[0.18em] text-akili-charbon-mute">
                      {group}
                    </div>
                    {groupItems.map((item) => {
                      const idx = filtered.indexOf(item);
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => handleSelect(item)}
                          className={cn(
                            'w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors',
                            isActive ? 'bg-akili-coral-50' : 'hover:bg-akili-papyrus-deep'
                          )}
                        >
                          <span className={cn(
                            'shrink-0 w-9 h-9 rounded-md flex items-center justify-center transition-colors',
                            isActive ? 'bg-akili-coral text-white' : 'bg-akili-papyrus-deep text-akili-charbon-soft'
                          )}>
                            <item.Icon size={16} weight="duotone" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              'font-display font-bold text-[14px] truncate',
                              isActive ? 'text-akili-charbon' : 'text-akili-charbon'
                            )}>
                              {item.label}
                            </div>
                            <div className="font-sans text-[12px] text-akili-charbon-mute truncate">
                              {item.description}
                            </div>
                          </div>
                          {isActive && (
                            <ArrowRight size={14} weight="bold" className="text-akili-coral shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center justify-between px-5 py-3 bg-akili-papyrus-deep border-t border-akili-line">
              <div className="flex items-center gap-3 font-sans text-[11px] text-akili-charbon-mute">
                <span className="inline-flex items-center gap-1">
                  <kbd className="font-mono px-1 py-0.5 bg-white border border-akili-line rounded text-[10px]">↑↓</kbd>
                  Naviguer
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="font-mono px-1 py-0.5 bg-white border border-akili-line rounded text-[10px]">↵</kbd>
                  Sélectionner
                </span>
              </div>
              <span className="font-sans text-[11px] text-akili-charbon-mute">
                Akili · {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
