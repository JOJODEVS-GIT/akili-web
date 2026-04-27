/**
 * AuthContext — état d'authentification global (mock pour le hackathon).
 *
 * Persistance via sessionStorage. À remplacer par Supabase Auth quand le
 * backend est en place : `supabase.auth.getSession()`, `signIn`, `signOut`.
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'akili.user';

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const setUser = useCallback((u) => setUserState(u), []);
  const logout = useCallback(() => setUserState(null), []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>');
  return ctx;
}
