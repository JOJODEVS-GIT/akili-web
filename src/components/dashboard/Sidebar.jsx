import { AnimatePresence, motion } from 'framer-motion';
import { SquaresFour as LayoutDashboard, FlowArrow as Workflow, ClockCounterClockwise as History, Plugs as PlugZap, BookOpen, SignOut as LogOut, X } from '@phosphor-icons/react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

const ITEMS = [
  { id: 'home',  Icon: LayoutDashboard, label: 'Tableau de bord', enabled: true },
  { id: 'auto',  Icon: Workflow,        label: 'Automatisations', enabled: true },
  { id: 'runs',  Icon: History,         label: 'Exécutions',      enabled: true },
  { id: 'tools', Icon: PlugZap,         label: 'Connexions',      enabled: true },
  { id: 'docs',  Icon: BookOpen,        label: 'Documentation',   enabled: true },
];

function SidebarContent({ active, onNav, onLogout, onClose }) {
  return (
    <>
      <div className="px-2 pt-2 pb-6 flex items-center justify-between">
        <Logo size="md" />
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="lg:hidden w-8 h-8 rounded-akili text-akili-charbon-soft hover:bg-akili-papyrus-deep flex items-center justify-center"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        {ITEMS.map(({ id, Icon, label, enabled }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => {
                if (enabled) {
                  onNav?.(id);
                  onClose?.();
                }
              }}
              disabled={!enabled}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-2.5 rounded-akili font-sans text-sm font-medium text-left transition-all duration-200 ease-akili',
                'border-l-2 border-transparent',
                isActive
                  ? 'bg-akili-indigo-50 text-akili-indigo border-l-akili-coral'
                  : enabled
                    ? 'text-akili-charbon-soft hover:bg-akili-papyrus-deep hover:border-l-akili-coral/40'
                    : 'text-akili-charbon-mute cursor-not-allowed opacity-60'
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="flex-1">{label}</span>
              {!enabled && (
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-akili-papyrus-deep text-akili-charbon-mute font-bold">
                  Bientôt
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 rounded-akili bg-akili-indigo text-akili-papyrus mt-3 hover:shadow-akili-or hover:ring-2 hover:ring-akili-or/40 transition-all duration-300 cursor-pointer">
        <div className="font-display font-extrabold text-sm text-akili-or">
          Akili Premium
        </div>
        <p className="font-sans text-xs text-akili-indigo-100 mt-1 leading-[1.5]">
          Exécutions illimitées + 24h support.
        </p>
        <button className="mt-2.5 w-full h-8 bg-akili-or text-akili-charbon border-none rounded-md font-display font-bold text-xs cursor-pointer hover:bg-akili-or-700 transition-colors">
          Découvrir
        </button>
      </div>

      <button
        onClick={onLogout}
        className="mt-3 flex items-center gap-2.5 px-3 py-2.5 bg-transparent border-none cursor-pointer font-sans text-[13px] text-akili-charbon-mute rounded-md hover:text-akili-charbon hover:bg-akili-papyrus-deep transition-all"
      >
        <LogOut size={16} /> Déconnexion
      </button>
    </>
  );
}

/**
 * Sidebar — fixe sur desktop (≥lg), drawer mobile (<lg).
 * Contrôlée par mobileOpen / onMobileClose en mobile.
 */
export function Sidebar({ active, onNav, onLogout, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[248px] shrink-0 bg-white border-r border-akili-line flex-col p-4 sticky top-0 h-screen">
        <SidebarContent active={active} onNav={onNav} onLogout={onLogout} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-akili-indigo/60 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 left-0 z-50 w-[280px] h-screen bg-white border-r border-akili-line flex flex-col p-4 lg:hidden"
            >
              <SidebarContent
                active={active}
                onNav={onNav}
                onLogout={onLogout}
                onClose={onMobileClose}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
