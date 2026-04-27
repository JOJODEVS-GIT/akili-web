/**
 * useAutomations — CRUD + realtime sur la table `automations`.
 *
 * Usage : const { items, loading, create, update, remove, runNow } = useAutomations();
 */
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useAutomations() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ━━━ Fetch initial ━━━
  useEffect(() => {
    if (!user?.id) {
      setItems([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('automations')
        .select('*')
        .order('created_at', { ascending: false });

      if (cancelled) return;
      if (error) setError(error);
      else setItems(data || []);
      setLoading(false);
    })();

    // ━━━ Realtime subscription ━━━
    const channel = supabase
      .channel(`automations:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'automations', filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setItems((prev) => [payload.new, ...prev.filter((i) => i.id !== payload.new.id)]);
          } else if (payload.eventType === 'UPDATE') {
            setItems((prev) => prev.map((i) => (i.id === payload.new.id ? payload.new : i)));
          } else if (payload.eventType === 'DELETE') {
            setItems((prev) => prev.filter((i) => i.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // ━━━ CRUD ━━━
  const create = useCallback(async (payload) => {
    if (!user?.id) return { error: new Error('Not authenticated') };
    const { data, error } = await supabase
      .from('automations')
      .insert({ ...payload, user_id: user.id })
      .select()
      .single();
    return { data, error };
  }, [user?.id]);

  const update = useCallback(async (id, patch) => {
    const { data, error } = await supabase
      .from('automations')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }, []);

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from('automations').delete().eq('id', id);
    return { error };
  }, []);

  const toggleFavorite = useCallback(async (id, value) => {
    return update(id, { is_favorite: value });
  }, [update]);

  // ━━━ Lancement simulé d'une automation ━━━
  // Crée un run "running", attend 2s, le marque "success".
  const runNow = useCallback(async (automation) => {
    if (!user?.id) return { error: new Error('Not authenticated') };

    const { data: run, error } = await supabase
      .from('automation_runs')
      .insert({
        automation_id: automation.id,
        user_id: user.id,
        status: 'running',
        trigger: 'manual',
      })
      .select()
      .single();

    if (error) return { error };

    // Simulation de l'exécution
    setTimeout(async () => {
      const isSuccess = Math.random() > 0.05;
      await supabase
        .from('automation_runs')
        .update({
          status: isSuccess ? 'success' : 'failed',
          duration_ms: 8000 + Math.floor(Math.random() * 14000),
          finished_at: new Date().toISOString(),
          output: isSuccess ? { processed: Math.floor(Math.random() * 200) + 1 } : null,
          error_message: isSuccess ? null : 'Connexion expirée — token à renouveler',
        })
        .eq('id', run.id);
    }, 2000);

    return { data: run };
  }, [user?.id]);

  return { items, loading, error, create, update, remove, toggleFavorite, runNow };
}
