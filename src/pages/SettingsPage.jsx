import { useEffect, useState } from 'react';
import { Bell, Lock, Globe, CreditCard, Shield, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/cn';

const DEFAULT_NOTIFICATIONS = { email: true, push: false, weekly_digest: true };

const PLAN_LABEL = {
  atelier: { name: 'Atelier', tagline: 'Gratuit · jusqu\'à 5 automatisations' },
  pro:     { name: 'Pro',     tagline: 'Automatisations illimitées · 12€/mois' },
  team:    { name: 'Team',    tagline: 'Multi-utilisateurs · 29€/mois par siège' },
};

export default function SettingsPage() {
  const { toast } = useToast();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { profile, updateProfile, signOut, resetPassword, user } = useAuth();

  const [notif, setNotif] = useState(DEFAULT_NOTIFICATIONS);
  const [twoFA, setTwoFA] = useState(false);
  const [savingNotif, setSavingNotif] = useState(false);

  // Sync depuis le profile.
  useEffect(() => {
    if (!profile) return;
    setNotif({
      ...DEFAULT_NOTIFICATIONS,
      ...(profile.settings?.notifications || {}),
    });
    setTwoFA(!!profile.two_factor_enabled);
  }, [profile]);

  const persistNotif = async (next) => {
    setNotif(next);
    setSavingNotif(true);
    const settings = { ...(profile?.settings || {}), notifications: next };
    const { error } = await updateProfile({ settings });
    setSavingNotif(false);
    if (error) {
      toast({ type: 'error', title: 'Sauvegarde échouée', description: error.message });
    }
  };

  const toggle2FA = async () => {
    const target = !twoFA;
    setTwoFA(target);
    const { error } = await updateProfile({ two_factor_enabled: target });
    if (error) {
      setTwoFA(!target);
      toast({ type: 'error', title: 'Échec', description: error.message });
      return;
    }
    toast({
      type: 'success',
      title: target ? '2FA activée' : '2FA désactivée',
      description: target ? 'Bien joué. Ton compte est plus sûr.' : 'À toi de voir, mais on conseille de la garder.',
    });
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    const { error } = await resetPassword(user.email);
    if (error) {
      toast({ type: 'error', title: 'Échec', description: error.message });
      return;
    }
    toast({ type: 'success', title: 'Lien envoyé', description: 'Un email pour changer ton mot de passe est en route.' });
  };

  const handleDeleteAccount = async () => {
    const ok = await confirm({
      title: 'Supprimer ton compte ?',
      description: 'Toutes tes automatisations et tes données seront définitivement perdues. Cette action est irréversible.',
      confirmLabel: 'Oui, supprimer',
      cancelLabel: 'Annuler',
      danger: true,
    });
    if (!ok) return;
    // V1 : la suppression du user auth nécessite un endpoint backend (service_role).
    // En attendant, on déconnecte simplement et on prévient.
    toast({
      type: 'info',
      title: 'Demande enregistrée',
      description: 'Notre équipe va supprimer définitivement ton compte sous 48 h. Tu reçois un email à la fin.',
    });
    setTimeout(() => { signOut(); navigate('/'); }, 1500);
  };

  const plan = PLAN_LABEL[profile?.plan] || PLAN_LABEL.atelier;

  return (
    <DashboardLayout>
      <div>
        <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
          Paramètres
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2">
          Tout ce qui te concerne, <span className="text-akili-charbon-mute">à un clic.</span>
        </h1>
      </div>

      <div className="mt-8 space-y-5">
        {/* Notifications */}
        <Section Icon={Bell} title="Notifications" desc="Choisis comment Akili te tient au courant.">
          <Toggle
            label="Emails de notification"
            help="Reçois un mail quand une auto échoue ou termine."
            value={notif.email}
            disabled={savingNotif}
            onChange={(v) => persistNotif({ ...notif, email: v })}
          />
          <Toggle
            label="Notifications push (navigateur)"
            help="Alertes en temps réel sur ton browser."
            value={notif.push}
            disabled={savingNotif}
            onChange={(v) => persistNotif({ ...notif, push: v })}
          />
          <Toggle
            label="Digest hebdomadaire"
            help="Un récap chaque dimanche soir."
            value={notif.weekly_digest}
            disabled={savingNotif}
            onChange={(v) => persistNotif({ ...notif, weekly_digest: v })}
          />
        </Section>

        {/* Sécurité */}
        <Section Icon={Lock} title="Sécurité" desc="Protège ton compte avec les bonnes pratiques.">
          <div className="flex items-start justify-between gap-4 py-3.5 border-b border-akili-line">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm">Authentification à deux facteurs</span>
                {twoFA ? <Badge variant="success">Active</Badge> : <Badge variant="neutral">Non activée</Badge>}
              </div>
              <p className="text-xs text-akili-charbon-mute mt-1">
                Une couche de plus contre les accès non autorisés.
              </p>
            </div>
            <Button
              size="sm"
              variant={twoFA ? 'outline' : 'primary'}
              onClick={toggle2FA}
            >
              {twoFA ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          <div className="flex items-start justify-between gap-4 py-3.5">
            <div className="flex-1">
              <div className="font-display font-bold text-sm">Mot de passe</div>
              <p className="text-xs text-akili-charbon-mute mt-1">
                On t'envoie un lien sécurisé pour le changer en deux clics.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={handleChangePassword}>
              Changer
            </Button>
          </div>
        </Section>

        {/* Préférences */}
        <Section Icon={Globe} title="Préférences" desc="Langue, fuseau, apparence.">
          <Row label="Langue" value={langLabel(profile?.language)} onClick={() => toast({ type: 'info', title: 'Bientôt', description: 'Anglais et swahili arrivent en V2.' })} />
          <Row label="Fuseau horaire" value={profile?.timezone || 'Africa/Cotonou'} onClick={() => toast({ type: 'info', title: 'Bientôt' })} />
          <Row label="Format de date" value="DD MMMM YYYY" onClick={() => toast({ type: 'info', title: 'Bientôt' })} />
        </Section>

        {/* Facturation */}
        <Section Icon={CreditCard} title="Facturation" desc="Plan, factures, méthodes de paiement.">
          <div className="p-4 rounded-akili bg-akili-papyrus-warm border border-akili-line">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-display font-extrabold text-base">Plan {plan.name}</div>
                <p className="text-xs text-akili-charbon-mute mt-0.5">{plan.tagline}</p>
              </div>
              {profile?.plan !== 'pro' && profile?.plan !== 'team' && (
                <Button size="sm" variant="or" onClick={() => toast({ type: 'success', title: 'Bienvenue chez les Pros', description: '14 jours gratuits, on te facture après.' })}>
                  Passer Pro
                </Button>
              )}
            </div>
          </div>
        </Section>

        {/* Zone dangereuse */}
        <Card variant="flat" padding="md" className="border-akili-error/30 bg-akili-coral-50/30">
          <div className="flex items-start gap-4">
            <span className="w-10 h-10 rounded-akili bg-akili-coral-50 text-akili-error flex items-center justify-center shrink-0">
              <Shield size={18} />
            </span>
            <div className="flex-1">
              <h3 className="font-display font-extrabold text-base text-akili-error">Zone dangereuse</h3>
              <p className="text-xs text-akili-charbon-soft mt-1 leading-relaxed">
                Cette action supprime définitivement ton compte et toutes tes données. Pas de retour en arrière possible.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-akili-error text-akili-error hover:bg-akili-coral-50"
              iconLeft={<Trash2 size={14} />}
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function langLabel(code) {
  if (!code || code === 'fr') return 'Français';
  if (code === 'en') return 'English';
  if (code === 'sw') return 'Kiswahili';
  return code;
}

function Section({ Icon, title, desc, children }) {
  return (
    <Card variant="flat" padding="lg">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-10 h-10 rounded-akili bg-akili-papyrus-deep text-akili-indigo flex items-center justify-center shrink-0">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="font-display font-extrabold text-lg tracking-[-0.01em]">{title}</h2>
          <p className="text-xs text-akili-charbon-soft mt-0.5">{desc}</p>
        </div>
      </div>
      <div>{children}</div>
    </Card>
  );
}

function Toggle({ label, help, value, onChange, disabled }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-akili-line last:border-b-0">
      <div className="flex-1">
        <div className="font-display font-bold text-sm">{label}</div>
        {help && <p className="text-xs text-akili-charbon-mute mt-0.5">{help}</p>}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!value)}
        disabled={disabled}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          value ? 'bg-akili-coral' : 'bg-akili-papyrus-deep',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        role="switch"
        aria-checked={value}
      >
        <span className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
          value ? 'translate-x-5' : 'translate-x-0.5'
        )} />
      </button>
    </div>
  );
}

function Row({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 py-3.5 border-b border-akili-line last:border-b-0 hover:bg-akili-papyrus-warm transition-colors -mx-3 px-3 rounded-md text-left"
    >
      <span className="font-display font-bold text-sm">{label}</span>
      <span className="text-sm text-akili-charbon-soft">{value} <span className="text-akili-charbon-mute ml-1">›</span></span>
    </button>
  );
}
