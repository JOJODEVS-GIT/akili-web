/**
 * Client Supabase — initialisé seulement si les variables d'env sont fournies.
 * Pendant le hackathon, l'auth peut tourner en mock via AuthContext.
 *
 * Pour activer la vraie auth :
 *   1. Créer un projet Supabase
 *   2. Copier .env.example en .env.local
 *   3. Renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
 *   4. Remplacer les setTimeout des forms par les appels supabase.auth.*
 */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;

export const isSupabaseReady = () => Boolean(supabase);
