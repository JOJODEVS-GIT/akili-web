/**
 * useRuns — historique d'exécutions + agrégats + heatmap.
 *
 * Charge les ~50 derniers runs avec la jointure sur `automations` (nom, catégorie),
 * les statistiques temps réel, et 91 jours de heatmap via la vue `user_runs_per_day`.
 * Souscrit aux changements pour mise à jour live.
 *
 * Usage : const { runs, stats, heatmap, loading } = useRuns();
 */
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const RUNS_LIMIT = 50;
const HEATMAP_DAYS = 91;

function emptyStats() {
  return { total: 0, ok: 0, failed: 0, running: 0, successRate: 0, avgDurationSec: 0 };
}

function computeStats(runs) {
  const total = runs.length;
  const ok = runs.filter((r) => r.status === 'success').length;
  const failed = runs.filter((r) => r.status === 'failed').length;
  const running = runs.filter((r) => r.status === 'running').length;
  const completed = total - running;
  const successRate = completed ? Math.round((ok / completed) * 100) : 0;
  const durations = runs.filter((r) => r.duration_ms);
  const avgDurationSec = durations.length
    ? Math.round(durations.reduce((s, r) => s + r.duration_ms, 0) / durations.length / 1000)
    : 0;
  return { total, ok, failed, running, successRate, avgDurationSec };
}

// Construit 91 entrées de heatmap (date + count) en remplissant les jours sans runs avec 0.
function buildHeatmap(rowsByDay) {
  const out = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const map = new Map();
  for (const r of rowsByDay) {
    const key = new Date(r.day).toISOString().slice(0, 10);
    map.set(key, Number(r.runs_count));
  }
  for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: d, count: map.get(key) || 0 });
  }
  return out;
}

export function useRuns() {
  const { user } = useAuth();
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState(emptyStats());
  const [heatmap, setHeatmap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    if (!user?.id) return;
    const since = new Date(Date.now() - HEATMAP_DAYS * 24 * 3600 * 1000).toISOString();

    const [runsRes, heatRes, monthStatsRes] = await Promise.all([
      supabase
        .from('automation_runs')
        .select('id, status, duration_ms, started_at, finished_at, output, error_message, logs, trigger, automation:automations(id, name, category, template_id)')
        .order('started_at', { ascending: false })
        .limit(RUNS_LIMIT),
      supabase
        .from('user_runs_per_day')
        .select('day, runs_count')
        .gte('day', since)
        .order('day', { ascending: true }),
      supabase
        .from('automation_runs')
        .select('status, duration_ms')
        .gte('started_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()),
    ]);

    if (runsRes.error) setError(runsRes.error);

    setRuns(runsRes.data || []);
    setStats(computeStats(monthStatsRes.data || []));
    setHeatmap(buildHeatmap(heatRes.data || []));
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) {
      setRuns([]);
      setStats(emptyStats());
      setHeatmap([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchAll();

    // Realtime : un nouveau run ou un changement de statut → on rafraîchit tout.
    const channel = supabase
      .channel(`runs:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'automation_runs', filter: `user_id=eq.${user.id}` },
        () => fetchAll()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchAll]);

  return { runs, stats, heatmap, loading, error, refresh: fetchAll };
}
