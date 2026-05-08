import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock } from '@phosphor-icons/react';
import { AuthShell } from '@/components/auth/AuthShell';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { humanizeAuthError } from '@/lib/auth-errors';

/**
 * ResetPasswordPage — page de saisie du nouveau mot de passe.
 *
 * Flow Supabase v2 :
 *   1. L'utilisateur clique le lien reçu par email
 *   2. Supabase ouvre cette page avec un access_token dans l'URL (#)
 *   3. supabase.auth.onAuthStateChange émet un event "PASSWORD_RECOVERY"
 *   4. On affiche le formulaire pour saisir le nouveau mot de passe
 *   5. Au submit, supabase.auth.updateUser({ password }) met à jour
 *   6. Redirection vers /app (l'utilisateur est désormais connecté)
 */
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Écoute l'event PASSWORD_RECOVERY de Supabase quand l'utilisateur
  // arrive sur cette page via le lien email.
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });

    // Au cas où l'event a déjà été émis avant le mount du composant
    // (rare, mais ça peut arriver si le hash est traité très vite)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription?.subscription?.unsubscribe?.();
  }, []);

  const submit = async (e) => {
    e?.preventDefault?.();
    const newErrors = {};

    if (password.length < 6) {
      newErrors.password = 'Six caractères minimum, pour ta tranquillité.';
    }
    if (password !== confirm) {
      newErrors.confirm = 'Les deux mots de passe doivent être identiques.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setErrors({ password: humanizeAuthError(error) });
      return;
    }

    // Succès — on affiche un flash puis on redirige
    setSuccess(true);
    setTimeout(() => navigate('/app', { replace: true }), 1500);
  };

  // ━━━ État 1 : lien encore en cours de validation ━━━
  if (!ready && !success) {
    return (
      <AuthShell
        footer={
          <Link to="/login" className="text-akili-coral font-semibold hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Retour à la connexion
          </Link>
        }
      >
        <div className="w-12 h-12 rounded-akili bg-akili-papyrus-deep flex items-center justify-center text-akili-charbon-mute mb-4">
          <Lock size={24} />
        </div>
        <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
          Vérification en cours
        </span>
        <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
          On vérifie ton lien.
        </h1>
        <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
          Si tu es arrivé ici sans cliquer sur un lien email récent, ça ne marchera pas.{' '}
          <Link to="/forgot-password" className="text-akili-coral font-semibold hover:underline">
            Demande un nouveau lien.
          </Link>
        </p>
      </AuthShell>
    );
  }

  // ━━━ État 3 : succès ━━━
  if (success) {
    return (
      <AuthShell>
        <div className="w-12 h-12 rounded-akili bg-akili-or-50 flex items-center justify-center text-akili-or-700 mb-4">
          <CheckCircle size={24} weight="fill" />
        </div>
        <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
          Mot de passe mis à jour
        </span>
        <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
          Voilà, c'est fait.
        </h1>
        <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
          On t'envoie sur ton espace Akili dans un instant…
        </p>
      </AuthShell>
    );
  }

  // ━━━ État 2 : formulaire de saisie ━━━
  return (
    <AuthShell
      footer={
        <Link to="/login" className="text-akili-coral font-semibold hover:underline inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Retour à la connexion
        </Link>
      }
    >
      <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
        Réinitialisation
      </span>
      <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
        Nouveau{' '}
        <span
          className="bg-gradient-to-r from-akili-coral via-akili-or to-akili-coral bg-clip-text text-transparent animate-gradient-shift"
          style={{ backgroundSize: '200% 200%' }}
        >
          mot de passe.
        </span>
      </h1>
      <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
        Choisis un mot de passe solide. Six caractères minimum.
      </p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <Input
          label="Nouveau mot de passe"
          required
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="new-password"
          autoFocus
          error={errors.password}
        />

        <PasswordStrength password={password} />

        <Input
          label="Confirme le mot de passe"
          required
          type="password"
          value={confirm}
          onChange={setConfirm}
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.confirm}
        />

        <Button type="submit" variant="primary" fullWidth size="md" shape="pill" loading={loading}>
          {loading ? 'Mise à jour…' : 'Confirmer le mot de passe'}
        </Button>
      </form>
    </AuthShell>
  );
}
