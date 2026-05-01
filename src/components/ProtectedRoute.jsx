import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageSkeleton } from '@/components/ui/Skeleton';

/**
 * ProtectedRoute — wrapper pour les routes nécessitant une session.
 *
 * Attend que AuthContext ait fini de charger (important pour le retour
 * d'un OAuth callback : le hash #access_token est traité de manière async,
 * et rediriger trop tôt envoie l'utilisateur sur /login juste après login).
 *
 * Bypass `?demo=true` : permet aux jurys, recruteurs et visiteurs de
 * naviguer dans le dashboard avec des données fictives sans inscription.
 * Le DemoBanner affiche un bandeau indiquant le contexte.
 *
 * Redirige vers /login en mémorisant la route demandée.
 */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isDemoMode = searchParams.get('demo') === 'true';

  if (loading) return <PageSkeleton />;
  if (!user && !isDemoMode) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
