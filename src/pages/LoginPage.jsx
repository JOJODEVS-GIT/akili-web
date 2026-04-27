import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
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
