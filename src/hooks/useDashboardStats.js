/**
 * useDashboardStats — agrégats temps réel pour le Dashboard.
 * Compte des automatisations, total runs ce mois, heures économisées.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useDashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeCount: 0,
    runsThisMonth: 0,
    successRate: 0,
    hoursSaved: 0,
    delta: { activeCount: 0, runsThisMonth: 0, hoursSaved: 0 },
    sparklines: { automations: [], runs: [], saved: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const refresh = async () => {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const [autosRes, runsCountRes, runsAllRes, automationsAllRes] = await Promise.all([
        supabase.from('automations').select('id, status, estimated_savings_hours'),
        supabase
          .from('automation_runs')
          .select('id', { count: 'exact', head: true })
          .gte('started_at', startOfMonth.toISOString()),
        supabase
          .from('automation_runs')
          .select('status, started_at, duration_ms')
          .gte('started_at', new Date(Date.now() - 90 * 24 * 3600 * 1000).toISOString())
          .order('started_at', { ascending: true }),
        supabase
          .from('automations')
          .select('id, created_at, estimated_savings_hours'),
      ]);

      if (cancelled) return;

      const autos = autosRes.data || [];
      const runs = runsAllRes.data || [];
      const allAutos = automationsAllRes.data || [];

      const activeCount = autos.filter((a) => a.status === 'actif').length;
      const runsThisMonth = runsCountRes.count || 0;
      const successCount = runs.filter((r) => r.status === 'success').length;
      const totalCompleted = runs.filter((r) => r.status !== 'running').length;
      const successRate = totalCompleted ? Math.round((successCount / totalCompleted) * 100) : 0;
      const hoursSaved = autos.reduce((s, a) => s + Number(a.estimated_savings_hours || 0), 0);

      // Sparklines : groupé par semaine sur 8 dernières semaines
      const weeks = Array.from({ length: 8 }, () => ({ runs: 0, automations: 0, saved: 0 }));
      const now = Date.now();
      runs.forEach((r) => {
        const w = Math.floor((now - new Date(r.started_at).getTime()) / (7 * 24 * 3600 * 1000));
        if (w < 8) weeks[7 - w].runs++;
      });
      allAutos.forEach((a) => {
        const w = Math.floor((now - new Date(a.created_at).getTime()) / (7 * 24 * 3600 * 1000));
        if (w < 8) {
          for (let i = 7 - w; i < 8; i++) {
            weeks[i].automations++;
            weeks[i].saved += Number(a.estimated_savings_hours || 0);
          }
        }
      });

      setStats({
        activeCount,
        runsThisMonth,
        successRate,
        hoursSaved,
        delta: { activeCount: 0, runsThisMonth: 0, hoursSaved: 0 },
        sparklines: {
          automations: weeks.map((w) => w.automations),
          runs: weeks.map((w) => w.runs),
          saved: weeks.map((w) => w.saved),
        },
      });
      setLoading(false);
    };

    refresh();

    // Subscription aux changements
    const channel = supabase
      .channel(`stats:${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automations',     filter: `user_id=eq.${user.id}` }, refresh)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'automation_runs', filter: `user_id=eq.${user.id}` }, refresh)
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  return { stats, loading };
}
