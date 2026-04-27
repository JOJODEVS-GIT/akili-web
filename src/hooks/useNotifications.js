/**
 * useNotifications — fetch + realtime + mark-as-read sur la table `notifications`.
 */
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useNotifications(limit = 20) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch initial
  useEffect(() => {
    if (!user?.id) {
      setItems([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (cancelled) return;
      setItems(data || []);
      setUnreadCount((data || []).filter((n) => !n.read_at).length);
      setLoading(false);
    })();

    // Realtime
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setItems((prev) => [payload.new, ...prev].slice(0, limit));
          setUnreadCount((c) => c + 1);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => {
          setItems((prev) => prev.map((n) => (n.id === payload.new.id ? payload.new : n)));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user?.id, limit]);

  const markAsRead = useCallback(async (id) => {
    await supabase.from('notifications').update({ read_at: new Date().toISOString() }).eq('id', id);
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .is('read_at', null);
    setItems((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: new Date().toISOString() })));
    setUnreadCount(0);
  }, [user?.id]);

  const dismiss = useCallback(async (id) => {
    await supabase.from('notifications').delete().eq('id', id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { items, unreadCount, loading, markAsRead, markAllAsRead, dismiss };
}
