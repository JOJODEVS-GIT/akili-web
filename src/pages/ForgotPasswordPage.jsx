import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, EnvelopeSimpleOpen as MailCheck } from '@phosphor-icons/react';
import { AuthShell } from '@/components/auth/AuthShell';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { humanizeAuthError } from '@/lib/auth-errors';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!email.includes('@')) {
      setError("Cet email ne semble pas tout à fait juste.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error: err } = await resetPassword(email);
    setLoading(false);
    if (err) {
      setError(humanizeAuthError(err));
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      footer={
        <Link to="/login" className="text-akili-coral font-semibold hover:underline inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Retour à la connexion
        </Link>
      }
    >
      {sent ? (
        <>
          <div className="w-12 h-12 rounded-akili bg-akili-or-50 flex items-center justify-center text-akili-or-700 mb-4">
            <MailCheck size={24} />
          </div>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Email envoyé
          </span>
          <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
            Regarde ta boîte mail.
          </h1>
          <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
            Si <span className="text-akili-charbon font-medium">{email}</span> est lié à un compte Akili, tu vas recevoir un lien pour créer un nouveau mot de passe d'ici quelques minutes.
          </p>
          <p className="font-sans text-[13px] text-akili-charbon-mute mt-6">
            Pas reçu ? Vérifie tes spams, ou{' '}
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              className="text-akili-coral font-semibold hover:underline"
            >
              réessaie avec un autre email
            </button>.
          </p>
        </>
      ) : (
        <>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Mot de passe oublié
          </span>
          <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
            Pas de panique.{' '}
            <span
              className="bg-gradient-to-r from-akili-coral via-akili-or to-akili-coral bg-clip-text text-transparent animate-gradient-shift"
              style={{ backgroundSize: '200% 200%' }}
            >
              On répare ça.
            </span>
          </h1>
          <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
            Entre l'email de ton compte. On t'envoie un lien pour repartir.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <Input
              label="Email"
              required
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="aicha@studio.io"
              autoComplete="email"
              autoFocus
              error={error}
            />
            <Button type="submit" variant="primary" fullWidth size="md" shape="pill" loading={loading}>
              {loading ? 'On envoie ça...' : 'Recevoir le lien'}
            </Button>
          </form>
        </>
      )}
    </AuthShell>
  );
}
