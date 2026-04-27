import { Link, Navigate } from 'react-router-dom';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { PageSkeleton } from '@/components/ui/Skeleton';

export default function LoginPage() {
  const { user, loading } = useAuth();

  // Si l'utilisateur est déjà connecté (cas typique : retour d'OAuth Google),
  // on l'envoie directement dans l'app au lieu de réafficher le formulaire.
  if (loading) return <PageSkeleton />;
  if (user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      footer={
        <>
          Pas encore de compte ?{' '}
          <Link to="/signup" className="text-akili-coral font-semibold hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
