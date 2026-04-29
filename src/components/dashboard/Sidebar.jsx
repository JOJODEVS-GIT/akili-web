/**
 * Sidebar — Navigation latérale du dashboard.
 *
 * PR #24 : redesign avec sections groupées + bouton Cmd+K + profile
 * compact en bas + icons duotone.
 */
import { AnimatePresence, motion } from 'framer-motion';
import {
  SquaresFour as LayoutDashboard, FlowArrow as Workflow,
  ClockCounterClockwise as History, Plugs as PlugZap, BookOpen,
  User as UserIcon, GearSix as Gear, SignOut as LogOut, X,
  MagnifyingGlass, Sparkle as Sparkles,
} from '@phosphor-icons/react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

// Sections groupées (pattern Linear / Activepieces)
const SECTIONS = [
  {
    title: 'Espace de travail',
    items: [
      { id: 'home',  Icon: LayoutDashboard, label: 'Tableau de bord' },
      { id: 'auto',  Icon: Workflow,        label: 'Automatisations' },
      { id: 'runs',  Icon: History,         label: 'Exécutions' },
    ],
  },
  {
    title: 'Outils',
    items: [
      { id: 'tools', Icon: PlugZap,         label: 'Connexions' },
      { id: 'docs',  Icon: BookOpen,        label: 'Documentation' },
    ],
  },
];

function SidebarItem({ id, Icon, label, isActive, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative w-full flex items-center gap-3 px-3 py-2 rounded-akili font-display font-bold text-sm text-left transition-all duration-200 ease-akili',
        isActive
          ? 'bg-akili-coral text-white shadow-akili-coral'
          : 'text-akili-charbon-soft hover:bg-akili-papyrus-deep hover:text-akili-charbon'
      )}
    >
      <Icon size={17} weight={isActive ? 'fill' : 'duotone'} />
      <span className="flex-1">{label}</span>
      {isActive && (
        <motion.span
          layoutId="sidebar-active-dot"
          className="w-1.5 h-1.5 rounded-full bg-akili-or"
        />
      )}
    </button>
  );
}

function SidebarContent({ active, onNav, onLogout, onClose, user }) {
  // Trigger Cmd+K programmatically
  const triggerCmdK = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  const userName = user?.name || 'Aïcha';
  const userEmail = user?.email || 'demo@akili.app';
  const initials = userName.trim().slice(0, 2).toUpperCase();

  return (
    <>
      {/* Logo + close mobile */}
      <div className="px-2 pt-2 pb-6 flex items-center justify-between">
        <Logo size="md" />
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="lg:hidden w-8 h-8 rounded-akili text-akili-charbon-soft hover:bg-akili-papyrus-deep flex items-center justify-center"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>

      {/* Cmd+K shortcut button */}
      <button
        onClick={triggerCmdK}
        className="mb-4 w-full flex items-center gap-2.5 px-3 py-2 rounded-akili bg-akili-papyrus-deep border border-akili-line text-akili-charbon-mute hover:border-akili-or hover:text-akili-charbon transition-all duration-200 group"
      >
        <MagnifyingGlass size={14} weight="bold" />
        <span className="flex-1 text-left text-[13px] font-sans">Recherche rapide</span>
        <kbd className="font-mono text-[10px] px-1.5 py-0.5 bg-white border border-akili-line rounded text-akili-charbon-mute group-hover:border-akili-or transition-all">
          ⌘K
        </kbd>
      </button>

      {/* Nav sections */}
      <nav className="flex flex-col flex-1 overflow-y-auto">
        {SECTIONS.map((section, sIdx) => (
          <div key={section.title} className={cn(sIdx > 0 && 'mt-6')}>
            <div className="px-3 mb-2 font-display font-bold text-[10px] uppercase tracking-[0.18em] text-akili-charbon-mute">
              {section.title}
            </div>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  {...item}
                  isActive={active === item.id}
                  onSelect={() => {
                    onNav?.(item.id);
                    onClose?.();
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Premium upsell card */}
      <div className="mt-4 p-4 rounded-akili bg-akili-indigo text-akili-papyrus relative overflow-hidden hover:shadow-akili-or hover:ring-2 hover:ring-akili-or/40 transition-all duration-300 cursor-pointer">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            right: -30, top: -30, width: 120, height: 120,
            background: 'radial-gradient(circle, rgba(242,201,76,0.25) 0%, rgba(242,201,76,0) 65%)',
          }}
        />
        <div className="relative flex items-center gap-2 mb-2">
          <Sparkles size={14} weight="fill" className="text-akili-or animate-sparkle" />
          <div className="font-display font-extrabold text-sm text-akili-or">
            Akili Premium
          </div>
        </div>
        <p className="relative font-sans text-xs text-akili-indigo-100 leading-[1.5]">
          Exécutions illimitées + 24h support.
        </p>
        <button className="relative mt-3 w-full h-8 bg-akili-or text-akili-charbon border-none rounded-full font-display font-bold text-xs cursor-pointer hover:bg-akili-or-700 transition-colors">
          Découvrir →
        </button>
      </div>

      {/* Profile compact en bas */}
      <div className="mt-3 pt-3 border-t border-akili-line">
        <div className="flex items-center gap-2.5 px-2">
          <span className="relative shrink-0">
            <span className="w-9 h-9 rounded-full bg-akili-indigo text-akili-or flex items-center justify-center font-display font-extrabold text-[13px]">
              {initials}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-akili-success border-2 border-white" aria-label="En ligne" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[13px] text-akili-charbon truncate">
              {userName}
            </div>
            <div className="font-sans text-[11px] text-akili-charbon-mute truncate">
              {userEmail}
            </div>
          </div>
          <button
            onClick={() => onNav?.('profile')}
            aria-label="Profil"
            className="shrink-0 w-7 h-7 rounded-md hover:bg-akili-papyrus-deep text-akili-charbon-mute hover:text-akili-charbon flex items-center justify-center transition-colors"
            title="Profil"
          >
            <Gear size={14} weight="duotone" />
          </button>
        </div>
        <button
          onClick={onLogout}
          className="mt-2 w-full flex items-center gap-2 px-2 py-1.5 bg-transparent border-none cursor-pointer font-sans text-[12px] text-akili-charbon-mute rounded-md hover:text-akili-error hover:bg-akili-coral-50 transition-all"
        >
          <LogOut size={13} weight="bold" /> Déconnexion
        </button>
      </div>
    </>
  );
}

/**
 * Sidebar — fixe sur desktop (≥lg), drawer mobile (<lg).
 */
export function Sidebar({ active, onNav, onLogout, mobileOpen, onMobileClose, user }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] shrink-0 bg-white border-r border-akili-line flex-col p-4 sticky top-0 h-screen">
        <SidebarContent active={active} onNav={onNav} onLogout={onLogout} user={user} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-akili-indigo/60 backdrop-blur-sm lg:hidden"
            />
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
                user={user}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
