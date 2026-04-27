import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GoogleButton } from './GoogleButton';
import { PasswordStrength } from './PasswordStrength';
import { useAuth } from '@/contexts/AuthContext';

export function SignupForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e?.preventDefault?.();
    const errs = {};
    if (!form.name.trim()) errs.name = "On a besoin de ton prénom pour t'accueillir.";
    if (!form.email.includes('@')) errs.email = "Cet email ne semble pas tout à fait juste.";
    if (form.password.length < 6) errs.password = "Six caractères minimum, pour ta tranquillité.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    // Simulation auth — à remplacer par supabase.auth.signUp() en prod
    setTimeout(() => {
      setUser({ name: form.name, email: form.email });
      navigate('/app');
    }, 700);
  };

  return (
    <>
      <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
        Inscription
      </span>
      <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
        Bienvenue. <span className="text-akili-coral">On commence&nbsp;?</span>
      </h1>
      <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
        Crée ton espace Akili. Pas de carte bancaire, pas de démo commerciale.
      </p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <Input
          label="Comment tu t'appelles"
          required
          value={form.name}
          onChange={update('name')}
          placeholder="Aïcha"
          autoComplete="given-name"
          autoFocus
          error={errors.name}
        />
        <Input
          label="Email"
          required
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder="aicha@studio.io"
          autoComplete="email"
          error={errors.email}
        />
        <div>
          <Input
            label="Mot de passe"
            required
            type="password"
            value={form.password}
            onChange={update('password')}
            autoComplete="new-password"
            helper="6 caractères minimum."
            error={errors.password}
          />
          <PasswordStrength password={form.password} />
        </div>

        <Button type="submit" variant="primary" fullWidth size="md" loading={loading} className="mt-2">
          {loading ? 'On prépare ton espace…' : 'Créer mon compte'}
        </Button>

        <div className="flex items-center gap-3 my-1 text-akili-charbon-mute text-xs">
          <span className="flex-1 h-px bg-akili-line" />
          ou
          <span className="flex-1 h-px bg-akili-line" />
        </div>

        <GoogleButton onClick={() => { setUser({ name: 'Aïcha' }); navigate('/app'); }} />

        <p className="font-sans text-xs text-akili-charbon-mute text-center mt-2">
          En continuant, tu acceptes nos <Link to="#cgu" className="text-akili-indigo hover:underline">conditions</Link> et notre <Link to="#privacy" className="text-akili-indigo hover:underline">politique de confidentialité</Link>.
        </p>
      </form>
    </>
  );
}
