import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { GoogleButton } from './GoogleButton';
import { useAuth } from '@/contexts/AuthContext';

export function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e?.preventDefault?.();
    if (!form.email || !form.password) {
      setError("Cet email ou mot de passe ne semble pas correct.");
      return;
    }
    setError(null);
    setLoading(true);
    // Simulation auth — à remplacer par supabase.auth.signInWithPassword() en prod
    setTimeout(() => {
      setUser({ name: form.email.split('@')[0], email: form.email });
      navigate('/app');
    }, 700);
  };

  return (
    <>
      <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
        Connexion
      </span>
      <h1 className="font-display font-extrabold text-[40px] tracking-[-0.03em] leading-[1.05] mt-3">
        Heureux de te <span className="text-akili-coral">revoir</span>.
      </h1>
      <p className="font-sans text-[15px] text-akili-charbon-soft mt-3 leading-[1.55]">
        Reprends là où tu en étais.
      </p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <Input
          label="Email"
          required
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          placeholder="aicha@studio.io"
          autoComplete="email"
          autoFocus
          error={error}
        />

        <div>
          <Input
            label="Mot de passe"
            required
            type="password"
            value={form.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
            autoComplete="current-password"
          />
          <Link to="/forgot-password" className="block text-right mt-2 font-sans text-[13px] text-akili-indigo font-medium hover:text-akili-coral transition-colors">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth size="md" loading={loading}>
          {loading ? 'Un instant…' : 'Se connecter'}
        </Button>

        <div className="flex items-center gap-3 my-1 text-akili-charbon-mute text-xs">
          <span className="flex-1 h-px bg-akili-line" />
          ou
          <span className="flex-1 h-px bg-akili-line" />
        </div>

        <GoogleButton onClick={() => { setUser({ name: 'Aïcha' }); navigate('/app'); }} />
      </form>
    </>
  );
}
