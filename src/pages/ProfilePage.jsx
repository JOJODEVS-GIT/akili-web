import { useEffect, useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { useAutomations } from '@/hooks/useAutomations';
import { useDashboardStats } from '@/hooks/useDashboardStats';

const PLAN_LABEL = { atelier: 'Atelier', pro: 'Pro', team: 'Team' };

function formatMemberSince(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    .replace(/^\w/, (c) => c.toUpperCase());
}

export default function ProfilePage() {
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const { items: automations } = useAutomations();
  const { stats } = useDashboardStats();

  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    city: '',
  });
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Sync le form quand le profile arrive.
  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name || '',
      bio: profile.bio || '',
      city: profile.city || '',
    });
    setDirty(false);
  }, [profile]);

  const update = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  };

  const submit = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    const { error } = await updateProfile({
      full_name: form.full_name.trim() || null,
      bio: form.bio.trim() || null,
      city: form.city.trim() || null,
    });
    setSaving(false);
    if (error) {
      toast({ type: 'error', title: 'Échec de la sauvegarde', description: error.message });
      return;
    }
    setDirty(false);
    toast({ type: 'success', title: 'Profil mis à jour', description: 'Tes infos sont sauvegardées.' });
  };

  const displayName = (form.full_name || profile?.full_name || user?.email || '').trim();
  const initial = displayName.charAt(0).toUpperCase() || '?';
  const planLabel = PLAN_LABEL[profile?.plan] || 'Atelier';
  const memberSince = formatMemberSince(profile?.created_at);

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
            <h3 className="mt-5 font-display font-extrabold text-lg break-all">
              {displayName || 'Sans nom'}
            </h3>
            <p className="text-xs text-akili-charbon-mute mt-1">
              Plan {planLabel}{form.city ? ` · ${form.city}` : ''}
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-akili-line space-y-2 text-xs">
            <Stat label="Membre depuis" value={memberSince} />
            <Stat label="Automatisations" value={automations.length} />
            <Stat label="Heures gagnées" value={`${Math.round(stats.hoursSaved)} h`} />
          </div>
        </Card>

        {/* Form card */}
        <form onSubmit={submit}>
          <Card variant="flat" padding="lg">
            <h2 className="font-display font-extrabold text-xl tracking-[-0.02em]">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <Input
                label="Nom complet"
                required
                value={form.full_name}
                onChange={update('full_name')}
                disabled={authLoading}
              />
              <Input
                label="Email"
                type="email"
                value={user?.email || ''}
                disabled
                helper="L'email se change depuis Paramètres → Sécurité."
              />
              <Input
                label="Ville"
                value={form.city}
                onChange={update('city')}
                className="sm:col-span-2"
                disabled={authLoading}
              />
            </div>

            <div className="mt-5">
              <label className="text-[13px] font-medium text-akili-charbon-soft mb-1.5 block">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => update('bio')(e.target.value)}
                rows={3}
                disabled={authLoading}
                placeholder="Quelques mots sur toi — ce que tu fais, où tu bosses..."
                className="w-full bg-white border border-akili-line rounded-akili px-3.5 py-2.5 text-[15px] text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50 transition-all resize-none disabled:bg-akili-papyrus-deep/40 disabled:text-akili-charbon-mute"
              />
            </div>

            <div className="mt-7 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                disabled={!dirty || saving}
                iconLeft={<Save size={16} />}
              >
                {saving ? 'On sauvegarde...' : dirty ? 'Enregistrer' : 'À jour'}
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
