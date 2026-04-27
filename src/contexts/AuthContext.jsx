/**
 * AuthContext — état d'authentification global Supabase.
 *
 * Gère la session via Supabase Auth + écoute les changements (login/logout/refresh).
 * Charge automatiquement le profile lié à l'utilisateur connecté.
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '@/lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mode mock fallback si Supabase pas configuré (au cas où)
  const useMock = !isSupabaseReady();

  // ━━━ Mode Supabase ━━━
  useEffect(() => {
    if (useMock) {
      setLoading(false);
      return;
    }

    // 1. Récupère la session courante
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // 2. Écoute les changements
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription?.subscription?.unsubscribe?.();
  }, [useMock]);

  // ━━━ Charge le profile quand la session change ━━━
  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      return;
    }

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!cancelled && !error) setProfile(data);
    })();

    return () => { cancelled = true; };
  }, [session?.user?.id]);

  // ━━━ Méthodes d'auth ━━━
  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }, []);

  const signUp = useCallback(async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { data, error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/app` },
    });
    return { data, error };
  }, []);

  const resetPassword = useCallback(async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    return { data, error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  // ━━━ Helpers ━━━
  const updateProfile = useCallback(async (patch) => {
    if (!session?.user) return { error: new Error('No session') };
    const { data, error } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', session.user.id)
      .select()
      .single();
    if (!error) setProfile(data);
    return { data, error };
  }, [session?.user?.id]);

  // Pour rétro-compat avec le code legacy qui utilise `user.name`
  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
        avatar_url: profile?.avatar_url,
        plan: profile?.plan || 'atelier',
        ...session.user,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        // état
        user,
        session,
        profile,
        loading,
        // actions
        signIn,
        signUp,
        signInWithGoogle,
        resetPassword,
        signOut,
        updateProfile,
        // alias compat legacy
        setUser: () => console.warn('setUser deprecated — use signIn/signUp instead'),
        logout: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>');
  return ctx;
}
