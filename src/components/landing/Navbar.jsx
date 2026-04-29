/**
 * Navbar — barre de navigation principale avec dropdowns Activepieces-style.
 *
 * 3 zones :
 *  - Logo gauche
 *  - Nav centrale avec 2 dropdowns (Produit · Comparaisons) + 2 liens flat (Tarifs · Manifesto)
 *  - CTAs droite (Se connecter + Commencer)
 *
 * Mobile : burger qui ouvre un drawer plein-écran avec la nav verticale.
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaretDown, List, X,
  Lightning, FlowArrow, Cube, ShieldCheck,
  Receipt, FlowArrow as Comparison,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const PRODUCT_DROPDOWN = [
  {
    label: 'Tour produit',
    description: 'Mockup complet du dashboard et features',
    href: '/produit',
    Icon: Cube,
    accent: 'coral',
  },
  {
    label: 'Templates',
    description: '20 automatisations prêtes à l\'emploi',
    href: '/templates',
    Icon: Lightning,
    accent: 'or',
  },
  {
    label: 'Intégrations',
    description: '21 outils connectés via OAuth officiel',
    href: '/integrations',
    Icon: FlowArrow,
    accent: 'indigo',
  },
  {
    label: 'Sécurité',
    description: 'Chiffrement, RGPD, audit complet',
    href: '/securite',
    Icon: ShieldCheck,
    accent: 'success',
  },
];

const COMPARISONS_DROPDOWN = [
  {
    label: 'Akili vs Zapier',
    description: 'L\'alternative française au standard US',
    href: '/comparaisons/zapier',
    Icon: Receipt,
    accent: 'coral',
  },
];

const ACCENTS = {
  coral:   { bg: 'bg-akili-coral-50',   text: 'text-akili-coral-700' },
  or:      { bg: 'bg-akili-or-50',      text: 'text-akili-or-900' },
  indigo:  { bg: 'bg-akili-indigo-50',  text: 'text-akili-indigo' },
  success: { bg: 'bg-akili-papyrus-deep', text: 'text-akili-success' },
};

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Ferme au click extérieur
  useEffect(() => {
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-sm font-medium text-akili-charbon-soft hover:text-akili-coral transition-colors duration-200"
      >
        {label}
        <CaretDown
          size={12}
          weight="bold"
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white rounded-akili shadow-akili-xl border border-akili-line p-2 z-50"
          >
            <div className="grid grid-cols-1 gap-1">
              {items.map((item) => {
                const accent = ACCENTS[item.accent];
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 p-3 rounded-akili hover:bg-akili-papyrus-deep transition-colors group"
                  >
                    <span className={cn(
                      'w-10 h-10 rounded-akili flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105',
                      accent.bg, accent.text
                    )}>
                      <item.Icon size={20} weight="duotone" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[14px] text-akili-charbon group-hover:text-akili-coral transition-colors">
                        {item.label}
                      </div>
                      <div className="font-sans text-[12px] text-akili-charbon-mute leading-tight mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Ferme le drawer au changement de route
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-akili-line"
        style={{
          background: 'rgba(249, 243, 230, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <Container size="xl" className="flex items-center justify-between h-18 py-4">
          <Link to="/" className="cursor-pointer no-underline">
            <Logo size="md" />
          </Link>

          {/* Nav desktop avec dropdowns */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavDropdown label="Produit" items={PRODUCT_DROPDOWN} />
            <NavDropdown label="Comparaisons" items={COMPARISONS_DROPDOWN} />
            <Link
              to="/manifesto"
              className="text-sm font-medium text-akili-charbon-soft hover:text-akili-coral transition-colors duration-200"
            >
              Manifesto
            </Link>
            <a
              href="/#tarifs"
              className="text-sm font-medium text-akili-charbon-soft hover:text-akili-coral transition-colors duration-200"
            >
              Tarifs
            </a>
          </nav>

          {/* CTAs droite */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Se connecter</Button>
            </Link>
            <Link to="/signup" className="hidden sm:block">
              <Button variant="primary" size="sm" shape="pill">Commencer</Button>
            </Link>

            {/* Burger mobile */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 -mr-2 text-akili-charbon hover:text-akili-coral transition-colors"
              aria-label="Ouvrir le menu"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </Container>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-akili-indigo/40 z-40"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-xs bg-akili-papyrus z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-akili-line">
                <Logo size="md" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 -mr-2 text-akili-charbon hover:text-akili-coral transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
                <div className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-akili-charbon-mute mb-2 px-3">
                  Produit
                </div>
                {PRODUCT_DROPDOWN.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-akili hover:bg-akili-papyrus-deep transition-colors"
                  >
                    <span className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center',
                      ACCENTS[item.accent].bg,
                      ACCENTS[item.accent].text
                    )}>
                      <item.Icon size={16} weight="duotone" />
                    </span>
                    <span className="font-display font-bold text-sm">{item.label}</span>
                  </Link>
                ))}

                <div className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-akili-charbon-mute mb-2 mt-6 px-3">
                  Comparaisons
                </div>
                {COMPARISONS_DROPDOWN.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-akili hover:bg-akili-papyrus-deep transition-colors"
                  >
                    <span className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center',
                      ACCENTS[item.accent].bg,
                      ACCENTS[item.accent].text
                    )}>
                      <item.Icon size={16} weight="duotone" />
                    </span>
                    <span className="font-display font-bold text-sm">{item.label}</span>
                  </Link>
                ))}

                <div className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-akili-charbon-mute mb-2 mt-6 px-3">
                  Plus
                </div>
                <Link
                  to="/manifesto"
                  className="block px-3 py-2.5 rounded-akili hover:bg-akili-papyrus-deep transition-colors font-display font-bold text-sm"
                >
                  Manifesto
                </Link>
                <a
                  href="/#tarifs"
                  className="block px-3 py-2.5 rounded-akili hover:bg-akili-papyrus-deep transition-colors font-display font-bold text-sm"
                >
                  Tarifs
                </a>
              </nav>

              {/* Drawer footer CTAs */}
              <div className="px-5 py-4 border-t border-akili-line space-y-2">
                <Link to="/login" className="block">
                  <Button variant="outline" size="md" fullWidth shape="pill">Se connecter</Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button variant="primary" size="md" fullWidth shape="pill">Commencer</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
