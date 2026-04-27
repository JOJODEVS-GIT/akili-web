import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { capitalize } from '@/lib/format';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: capitalize(user?.name) || 'Aïcha',
    email: user?.email || 'aicha@studio.io',
    bio: 'Fondatrice studio de design à Cotonou — l\'automatisation pour un freelance, c\'est une question de survie.',
    city: 'Cotonou',
  });
  const [saving, setSaving] = useState(false);

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e?.preventDefault?.();
    setSaving(true);
    setTimeout(() => {
      setUser({ ...user, name: form.fullName.toLowerCase(), email: form.email });
      setSaving(false);
      toast({ type: 'success', title: 'Profil mis à jour', description: 'Tes infos sont sauvegardées.' });
    }, 600);
  };

  const initial = form.fullName.trim().charAt(0).toUpperCase();

  return (
    <DashboardLayout>
      <div>
        <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
          Mon profil
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2">
          Tes infos. <span className="text-akili-charbon-mute">Comme tu les veux.</span>
        </h1>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10">
        {/* Avatar card */}
        <Card variant="flat" padding="lg" className="self-start">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-akili-indigo text-akili-or flex items-center justify-center font-display font-extrabold text-4xl">
                {initial}
              </div>
              <button
                type="button"
                onClick={() => toast({ type: 'info', title: 'Bientôt disponible', description: 'L\'upload d\'avatar arrive avec la V2.' })}
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-akili-coral text-white border-4 border-white shadow-akili-sm hover:bg-akili-coral-700 transition-colors flex items-center justify-center"
                aria-label="Changer l'avatar"
              >
                <Camera size={14} />
              </button>
            </div>
            <h3 className="mt-5 font-display font-extrabold text-lg">{form.fullName}</h3>
            <p className="text-xs text-akili-charbon-mute mt-1">Plan Atelier · {form.city}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-akili-line space-y-2 text-xs">
            <Stat label="Membre depuis" value="Avril 2026" />
            <Stat label="Automatisations" value="5" />
            <Stat label="Heures gagnées" value="38 h" />
          </div>
        </Card>

        {/* Form card */}
        <form onSubmit={submit}>
          <Card variant="flat" padding="lg">
            <h2 className="font-display font-extrabold text-xl tracking-[-0.02em]">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <Input label="Nom complet" required value={form.fullName} onChange={update('fullName')} />
              <Input label="Email" type="email" required value={form.email} onChange={update('email')} />
              <Input label="Ville" value={form.city} onChange={update('city')} className="sm:col-span-2" />
            </div>

            <div className="mt-5">
              <label className="text-[13px] font-medium text-akili-charbon-soft mb-1.5 block">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => update('bio')(e.target.value)}
                rows={3}
                className="w-full bg-white border border-akili-line rounded-akili px-3.5 py-2.5 text-[15px] text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50 transition-all resize-none"
              />
            </div>

            <div className="mt-7 flex justify-end">
              <Button type="submit" variant="primary" loading={saving} iconLeft={<Save size={16} />}>
                {saving ? 'On sauvegarde...' : 'Enregistrer'}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-akili-charbon-mute">{label}</span>
      <span className="font-medium text-akili-charbon">{value}</span>
    </div>
  );
}
