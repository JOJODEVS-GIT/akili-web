import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageSkeleton } from '@/components/ui/Skeleton';

/**
 * ProtectedRoute — wrapper pour les routes nécessitant une session.
 *
 * Attend que AuthContext ait fini de charger (important pour le retour
 * d'un OAuth callback : le hash #access_token est traité de manière async,
 * et rediriger trop tôt envoie l'utilisateur sur /login juste après login).
 *
 * Redirige vers /login en mémorisant la route demandée.
 */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
