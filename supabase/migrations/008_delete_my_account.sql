-- ════════════════════════════════════════════════════════════════════
-- MIGRATION 008 — Fonction delete_my_account()
-- ────────────────────────────────────────────────────────────────────
-- Permet à un utilisateur authentifié de supprimer son propre compte
-- (auth.users + cascade sur toutes ses données via les FK ON DELETE CASCADE).
--
-- Sécurité :
--   - SECURITY DEFINER : la fonction tourne avec les droits du créateur
--     (admin Supabase) → peut DELETE dans auth.users
--   - Vérifie que auth.uid() est non null (user authentifié)
--   - L'user ne peut supprimer QUE son propre compte
--
-- À exécuter dans le SQL Editor de Supabase :
-- https://supabase.com/dashboard/project/xzhtkqjyjlxlyybvldrf/sql
-- ════════════════════════════════════════════════════════════════════

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  current_user_id uuid;
begin
  -- Récupère l'ID de l'user authentifié
  current_user_id := auth.uid();

  -- Si pas authentifié → erreur explicite
  if current_user_id is null then
    raise exception 'Tu dois être connecté pour supprimer ton compte.' using errcode = 'PT001';
  end if;

  -- Supprime le user de auth.users
  -- Cascade automatique sur :
  --   profiles, automations, automation_runs, connections,
  --   notifications, api_keys, webhooks, subscriptions
  -- (toutes ont un ON DELETE CASCADE sur user_id)
  delete from auth.users where id = current_user_id;
end;
$$;

-- Permission : tout user authentifié peut appeler cette fonction
grant execute on function public.delete_my_account() to authenticated;

-- Confirmation
comment on function public.delete_my_account() is
  'Permet à un user authentifié de supprimer son propre compte (auth + cascade BDD).';
