import { Link } from 'react-router-dom';
import { AuthShell } from '@/components/auth/AuthShell';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
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
