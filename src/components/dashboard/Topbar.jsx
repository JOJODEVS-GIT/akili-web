import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List as Menu, MagnifyingGlass as Search, Bell, User, GearSix as Settings, SignOut as LogOut } from '@phosphor-icons/react';
import { Dropdown } from '@/components/ui/Dropdown';
import { NotificationsPanel } from './NotificationsPanel';
import { capitalize } from '@/lib/format';

export function Topbar({
  user,
  query = '',
  onQueryChange,
  onMenuOpen,
  onLogout,
  notifCount = 3,
}) {
  const initial = (user?.name || 'A').trim().charAt(0).toUpperCase();
  const displayName = capitalize(user?.name || 'Aïcha');
  const inputRef = useRef(null);
  const bellRef = useRef(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="h-16 border-b border-akili-line sticky top-0 z-20"
      style={{
        background: 'rgba(249,243,230,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Container aligné sur le contenu — même max-w + padding que le main */}
      <div className="h-full w-full max-w-[1600px] mx-auto flex items-center px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 gap-3 sm:gap-4 justify-end">
        {/* Hamburger mobile — pushed left */}
        <button
          onClick={onMenuOpen}
          aria-label="Ouvrir le menu"
          className="lg:hidden mr-auto w-9 h-9 rounded-akili text-akili-charbon-soft hover:bg-akili-papyrus-deep flex items-center justify-center"
        >
          <Menu size={18} />
        </button>

        {/* Search bar — width fixe, plus de flex-1 */}
        <div className="relative w-full max-w-[340px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-akili-charbon-mute pointer-events-none">
            <Search size={16} />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange?.(e.target.value)}
            placeholder="Chercher une automatisation..."
            className="w-full h-[38px] pl-9 pr-12 bg-white border border-akili-line rounded-akili font-sans text-[13px] text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50 transition-all duration-200"
          />
          <kbd className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 font-mono text-[10px] px-1.5 py-0.5 rounded bg-akili-papyrus-deep text-akili-charbon-mute font-medium pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            ref={bellRef}
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative shrink-0 w-[38px] h-[38px] bg-white border border-akili-line rounded-akili flex items-center justify-center cursor-pointer text-akili-charbon-soft hover:bg-akili-papyrus-warm transition-colors"
          >
            <Bell size={16} />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-akili-coral text-white text-[10px] font-bold ring-2 ring-akili-papyrus">
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            )}
          </button>
          <NotificationsPanel
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
            anchorRef={bellRef}
          />
        </div>

        {/* Avatar + dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2.5 hover:bg-akili-papyrus-deep px-2 py-1.5 rounded-akili transition-colors">
              <div className="w-9 h-9 rounded-full bg-akili-indigo text-akili-or flex items-center justify-center font-display font-extrabold text-sm">
                {initial}
              </div>
              <div className="hidden sm:flex flex-col leading-tight text-left">
                <span className="font-display font-bold text-[13px] text-akili-charbon">
                  {displayName}
                </span>
                <span className="font-sans text-[11px] text-akili-charbon-mute">
                  Plan Atelier
                </span>
              </div>
            </button>
          }
          items={[
            { Icon: User,     label: 'Mon profil',  onClick: () => navigate('/app/profile') },
            { Icon: Settings, label: 'Paramètres',  onClick: () => navigate('/app/settings') },
            { divider: true },
            { Icon: LogOut,   label: 'Déconnexion', onClick: onLogout, danger: true },
          ]}
        />
      </div>
    </div>
  );
}
