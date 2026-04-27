import { Link, Navigate } from 'react-router-dom';
import { AuthShell } from '@/components/auth/AuthShell';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';
import { PageSkeleton } from '@/components/ui/Skeleton';

export default function SignupPage() {
  const { user, loading } = useAuth();

  if (loading) return <PageSkeleton />;
  if (user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      footer={
        <>
          Déjà un compte ?{' '}
          <Link to="/login" className="text-akili-coral font-semibold hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
