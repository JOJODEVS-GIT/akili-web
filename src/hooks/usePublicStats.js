/**
 * usePublicStats — agrégats publics affichés sur le hero.
 *
 * Stratégie :
 *  1. Tente de fetch les vraies données via une RPC Supabase publique
 *     (`get_public_stats`) — à créer côté BDD pour exposer des counts
 *     agrégés au rôle anon sans casser la RLS.
 *  2. Tombe sur les valeurs marketing par défaut si l'RPC n'existe pas
 *     encore ou échoue (build offline, beta privée, etc.).
 *  3. Renvoie un état `live` indiquant si les données sont réelles —
 *     utile pour ajouter un dot vert "LIVE" si on veut.
 *
 * RPC SQL à créer en Supabase quand le produit est en prod :
 *
 *   create or replace function get_public_stats()
 *   returns json language sql security definer as $$
 *     select json_build_object(
 *       'active',   (select count(*) from automations where status = 'active'),
 *       'hours',    (select coalesce(sum(hours_saved), 0)::int from automation_runs
 *                    where created_at > now() - interval '30 days'),
 *       'setupSec', 60
 *     );
 *   $$;
 *   grant execute on function get_public_stats() to anon;
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const FALLBACK = { active: 2800, hours: 40, setupSec: 60 };

export function usePublicStats() {
  const [stats, setStats] = useState(FALLBACK);
  const [live, setLive]   = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.rpc('get_public_stats');
        if (cancelled || error || !data) return;
        setStats({
          active:   data.active   ?? FALLBACK.active,
          hours:    data.hours    ?? FALLBACK.hours,
          setupSec: data.setupSec ?? FALLBACK.setupSec,
        });
        setLive(true);
      } catch {
        // RPC absente ou erreur réseau → on garde les valeurs marketing
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { stats, live };
}
