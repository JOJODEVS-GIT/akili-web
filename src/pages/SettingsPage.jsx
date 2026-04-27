import { useState } from 'react';
import {
  Bell, Lock, Globe, CreditCard, Shield, Trash2, Moon,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/cn';

export default function SettingsPage() {
  const { toast } = useToast();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [notif, setNotif] = useState({ email: true, push: false, weeklyDigest: true });
  const [twoFA, setTwoFA] = useState(false);

  const handleDeleteAccount = async () => {
    const ok = await confirm({
      title: 'Supprimer ton compte ?',
      description: 'Toutes tes automatisations et tes données seront définitivement perdues. Cette action est irréversible.',
      confirmLabel: 'Oui, supprimer',
      cancelLabel: 'Annuler',
      danger: true,
    });
    if (ok) {
      toast({ type: 'success', title: 'Compte supprimé', description: 'À bientôt peut-être.' });
      setTimeout(() => { logout(); navigate('/'); }, 1200);
    }
  };

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
            help="Receive un mail quand une auto échoue ou termine."
            value={notif.email}
            onChange={(v) => setNotif({ ...notif, email: v })}
          />
          <Toggle
            label="Notifications push (navigateur)"
            help="Alertes en temps réel sur ton browser."
            value={notif.push}
            onChange={(v) => setNotif({ ...notif, push: v })}
          />
          <Toggle
            label="Digest hebdomadaire"
            help="Un récap chaque dimanche soir."
            value={notif.weeklyDigest}
            onChange={(v) => setNotif({ ...notif, weeklyDigest: v })}
          />
        </Section>

        {/* Sécurité */}
        <Section Icon={Lock} title="Sécurité" desc="Protège ton compte avec les bonnes pratiques.">
          <div className="flex items-start justify-between gap-4 py-3.5 border-b border-akili-line last:border-b-0">
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
              onClick={() => {
                setTwoFA(!twoFA);
                toast({
                  type: 'success',
                  title: twoFA ? '2FA désactivée' : '2FA activée',
                  description: twoFA ? 'À toi de voir, mais on conseille de la garder.' : 'Bien joué. Ton compte est plus sûr.',
                });
              }}
            >
              {twoFA ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
          <div className="flex items-start justify-between gap-4 py-3.5">
            <div className="flex-1">
              <div className="font-display font-bold text-sm">Mot de passe</div>
              <p className="text-xs text-akili-charbon-mute mt-1">
                Dernière modification il y a 3 mois. Pense à le changer régulièrement.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast({ type: 'info', title: 'Lien envoyé', description: 'Un email pour changer ton mot de passe est en route.' })}>
              Changer
            </Button>
          </div>
        </Section>

        {/* Préférences */}
        <Section Icon={Globe} title="Préférences" desc="Langue, fuseau, apparence.">
          <Row label="Langue" value="Français" onClick={() => toast({ type: 'info', title: 'Bientôt', description: 'Anglais et swahili arrivent en V2.' })} />
          <Row label="Fuseau horaire" value="Africa/Cotonou (UTC+1)" onClick={() => toast({ type: 'info', title: 'Bientôt' })} />
          <Row label="Format de date" value="DD MMMM YYYY" onClick={() => toast({ type: 'info', title: 'Bientôt' })} />
        </Section>

        {/* Facturation */}
        <Section Icon={CreditCard} title="Facturation" desc="Plan, factures, méthodes de paiement.">
          <div className="p-4 rounded-akili bg-akili-papyrus-warm border border-akili-line">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-display font-extrabold text-base">Plan Atelier</div>
                <p className="text-xs text-akili-charbon-mute mt-0.5">Gratuit · jusqu'à 5 automatisations</p>
              </div>
              <Button size="sm" variant="or" onClick={() => toast({ type: 'success', title: 'Bienvenue chez les Pros', description: '14 jours gratuits, on te facture après.' })}>
                Passer Pro
              </Button>
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

function Toggle({ label, help, value, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-akili-line last:border-b-0">
      <div className="flex-1">
        <div className="font-display font-bold text-sm">{label}</div>
        {help && <p className="text-xs text-akili-charbon-mute mt-0.5">{help}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          value ? 'bg-akili-coral' : 'bg-akili-papyrus-deep'
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
