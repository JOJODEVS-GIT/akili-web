/**
 * DashboardLayout — shell partagé pour toutes les pages /app/*
 * Gère sidebar (mobile drawer + desktop fixed) + topbar + zone content.
 */
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { useAuth } from '@/contexts/AuthContext';
import { useDisclosure } from '@/hooks/useDisclosure';

const ROUTES = {
  home:     '/app',
  auto:     '/app/automations',
  runs:     '/app/runs',
  tools:    '/app/connections',
  docs:     '/app/docs',
  profile:  '/app/profile',
  settings: '/app/settings',
};

const PATH_TO_ID = {
  '/app':              'home',
  '/app/automations':  'auto',
  '/app/runs':         'runs',
  '/app/connections':  'tools',
  '/app/docs':         'docs',
  '/app/profile':      'profile',
  '/app/settings':     'settings',
};

export function DashboardLayout({ children, query, onQueryChange }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebar = useDisclosure();

  const active = PATH_TO_ID[location.pathname] || 'home';

  const handleLogout = () => { logout(); navigate('/'); };
  const handleNav = (id) => {
    if (ROUTES[id]) navigate(ROUTES[id]);
  };

  return (
    <div className="flex min-h-screen w-full bg-akili-papyrus">
      <Sidebar
        active={active}
        onNav={handleNav}
        onLogout={handleLogout}
        mobileOpen={sidebar.isOpen}
        onMobileClose={sidebar.close}
        user={user}
      />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar
          user={user}
          query={query}
          onQueryChange={onQueryChange}
          onMenuOpen={sidebar.open}
          onLogout={handleLogout}
        />

        <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-6 lg:py-8">
          {children}
        </div>
      </main>

      {/* Palette de commandes globale (Cmd+K) — disponible sur toutes les pages /app/* */}
      <CommandPalette />
    </div>
  );
}
