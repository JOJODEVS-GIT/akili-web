/**
 * useConnections — gestion des intégrations OAuth de l'utilisateur.
 *
 * Charge les connexions depuis Supabase + souscrit aux changements live.
 * Expose connect / disconnect (sans vraie OAuth en V1, juste insert/delete BDD).
 *
 * Usage : const { items, loading, connect, disconnect } = useConnections();
 */
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useConnections() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        .from('connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (cancelled) return;
      if (error) setError(error);
      else setItems(data || []);
      setLoading(false);
    })();

    const channel = supabase
      .channel(`connections:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'connections', filter: `user_id=eq.${user.id}` },
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

  const connect = useCallback(async ({ provider, accountLabel }) => {
    if (!user?.id) return { error: new Error('Not authenticated') };
    const { data, error } = await supabase
      .from('connections')
      .insert({
        user_id: user.id,
        provider,
        account_label: accountLabel,
        status: 'connected',
        last_used_at: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  }, [user?.id]);

  const disconnect = useCallback(async (id) => {
    const { error } = await supabase.from('connections').delete().eq('id', id);
    return { error };
  }, []);

  return { items, loading, error, connect, disconnect };
}
