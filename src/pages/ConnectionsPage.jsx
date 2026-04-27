import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, AlertTriangle, Plus, KeyRound, Webhook, Loader2,
  Mail, FolderOpen, CreditCard, Github, MessageSquare,
  FileText, Database, ListTodo, Calendar, Cloud,
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useConnections } from '@/hooks/useConnections';
import { cn } from '@/lib/cn';

// Catalogue statique des intégrations supportées (metadata UI, pas en BDD).
const PROVIDERS = [
  { id: 'gmail',    name: 'Gmail',         Icon: Mail,         color: '#EA4335', desc: 'Lire, envoyer, trier des emails' },
  { id: 'drive',    name: 'Google Drive',  Icon: FolderOpen,   color: '#1FA463', desc: 'Stocker et organiser tes fichiers' },
  { id: 'stripe',   name: 'Stripe',        Icon: CreditCard,   color: '#635BFF', desc: 'Paiements, abonnements, factures' },
  { id: 'github',   name: 'GitHub',        Icon: Github,       color: '#171515', desc: 'Repos, issues, déploiements' },
  { id: 'slack',    name: 'Slack',         Icon: MessageSquare,color: '#4A154B', desc: 'Notifications, alertes équipe' },
  { id: 'notion',   name: 'Notion',        Icon: FileText,     color: '#000000', desc: 'Bases de données, docs, knowledge' },
  { id: 'calendar', name: 'Calendar',      Icon: Calendar,     color: '#4285F4', desc: 'Agenda, planification, rappels' },
  { id: 'sheets',   name: 'Sheets',        Icon: ListTodo,     color: '#1FA463', desc: 'Tableurs en lecture/écriture' },
  { id: 'discord',  name: 'Discord',       Icon: MessageSquare,color: '#5865F2', desc: 'Bots, alertes communautaires' },
  { id: 'postgres', name: 'PostgreSQL',    Icon: Database,     color: '#336791', desc: 'BDD relationnelle, backups' },
  { id: 's3',       name: 'AWS S3',        Icon: Cloud,        color: '#FF9900', desc: 'Stockage cloud, archives' },
  { id: 'webhook',  name: 'Webhook',       Icon: Webhook,      color: '#0E1A3E', desc: 'Reçois n\'importe quel événement HTTP' },
];

const STATUS_CONFIG = {
  connected: { label: 'Connectée', dot: 'bg-akili-success',      text: 'text-akili-success' },
  expired:   { label: 'Expirée',   dot: 'bg-akili-warning',      text: 'text-akili-warning' },
  revoked:   { label: 'Révoquée',  dot: 'bg-akili-error',        text: 'text-akili-error' },
  available: { label: 'Disponible',dot: 'bg-akili-charbon-mute', text: 'text-akili-charbon-mute' },
};

const TABS = [
  { id: 'all',        label: 'Tout' },
  { id: 'connected',  label: 'Connectées' },
  { id: 'available',  label: 'Disponibles' },
];

// Fusionne les providers du catalogue avec l'état BDD réel.
function buildIntegrations(connections) {
  return PROVIDERS.map((p) => {
    const conn = connections.find((c) => c.provider === p.id);
    if (!conn) {
      return { ...p, status: 'available', account: null, connectionId: null };
    }
    return {
      ...p,
      status: conn.status,
      account: conn.account_label,
      connectionId: conn.id,
    };
  });
}

export default function ConnectionsPage() {
  const { user } = useAuth();
  const { items: connections, loading, connect, disconnect } = useConnections();
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const apiKeysModal = useDisclosure();
  const { toast } = useToast();
  const confirm = useConfirm();

  const integrations = useMemo(() => buildIntegrations(connections), [connections]);

  const handleConnect = async (int) => {
    setBusy(true);
    toast({ type: 'info', title: 'Connexion en cours...', description: `OAuth avec ${int.name}.` });
    // V1 : pas de vraie OAuth — on simule la connexion en insérant directement.
    const accountLabel = user?.email || `compte_${int.id}`;
    const { error } = await connect({ provider: int.id, accountLabel });
    setBusy(false);
    if (error) {
      toast({ type: 'error', title: 'Connexion échouée', description: error.message });
      return;
    }
    toast({ type: 'success', title: `${int.name} connecté`, description: 'Tu peux maintenant l\'utiliser dans tes automatisations.' });
    setSelected(null);
  };

  const handleDisconnect = async (int) => {
    if (!int.connectionId) return;
    const ok = await confirm({
      title: `Déconnecter ${int.name} ?`,
      description: 'Tu pourras la reconnecter à tout moment.',
      confirmLabel: 'Déconnecter',
      danger: true,
    });
    if (!ok) return;
    setBusy(true);
    const { error } = await disconnect(int.connectionId);
    setBusy(false);
    if (error) {
      toast({ type: 'error', title: 'Échec', description: error.message });
      return;
    }
    toast({ type: 'success', title: `${int.name} déconnecté` });
    setSelected(null);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return integrations.filter((i) => {
      if (tab === 'connected' && i.status !== 'connected' && i.status !== 'expired') return false;
      if (tab === 'available' && i.status !== 'available') return false;
      if (q && !`${i.name} ${i.desc}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, tab, integrations]);

  const connectedCount = integrations.filter((i) => i.status === 'connected').length;
  const expiredCount = integrations.filter((i) => i.status === 'expired').length;
  const availableCount = integrations.filter((i) => i.status === 'available').length;

  return (
    <DashboardLayout query={query} onQueryChange={setQuery}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Connexions
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2 text-balance">
            Branche tes outils, <span className="text-akili-charbon-mute">Akili s'occupe du reste.</span>
          </h1>
        </div>
        <Button variant="outline" iconLeft={<KeyRound size={16} />} onClick={apiKeysModal.open}>
          Clés API &amp; webhooks
        </Button>
      </div>

      {/* Stats inline */}
      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <InlineStat label="Connectées" value={connectedCount} total={PROVIDERS.length} accent="success" />
        <InlineStat label="Expirées" value={expiredCount} accent="warning" />
        <InlineStat label="Disponibles" value={availableCount} />
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1.5 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-3 py-1 rounded-pill text-xs font-medium ring-1 ring-inset transition-all',
              tab === t.id
                ? 'bg-akili-charbon text-akili-papyrus ring-akili-charbon'
                : 'bg-white text-akili-charbon-soft ring-akili-line hover:bg-akili-papyrus-deep'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <Card variant="flat" padding="lg" className="mt-5 flex items-center justify-center gap-3 text-akili-charbon-mute">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">On charge tes connexions...</span>
        </Card>
      ) : (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((int, i) => (
            <motion.div
              key={int.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <IntegrationCard integration={int} onClick={() => setSelected(int)} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        description={selected?.desc}
        size="md"
      >
        {selected && (
          <IntegrationDetail
            integration={selected}
            busy={busy}
            onClose={() => setSelected(null)}
            onConnect={() => handleConnect(selected)}
            onDisconnect={() => handleDisconnect(selected)}
          />
        )}
      </Modal>

      {/* API Keys modal */}
      <Modal
        isOpen={apiKeysModal.isOpen}
        onClose={apiKeysModal.close}
        title="Clés API & webhooks"
        description="Génère des clés pour appeler Akili depuis tes propres scripts, ou reçois des événements custom."
        size="md"
      >
        <ApiKeysContent />
      </Modal>
    </DashboardLayout>
  );
}

function InlineStat({ label, value, total, accent }) {
  const colors = {
    success: 'text-akili-success',
    warning: 'text-akili-warning',
  };
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold">
        {label}
      </div>
      <div className={cn('font-display font-extrabold text-2xl mt-1', accent && colors[accent])}>
        {value}
        {total !== undefined && (
          <span className="text-akili-charbon-mute font-mono text-base font-medium"> / {total}</span>
        )}
      </div>
    </div>
  );
}

function IntegrationCard({ integration, onClick }) {
  const { Icon, name, desc, status, account, color } = integration;
  const sc = STATUS_CONFIG[status] || STATUS_CONFIG.available;
  const isAvailable = status === 'available';

  return (
    <Card
      variant="flat"
      padding="md"
      interactive
      className="h-full flex flex-col group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-akili flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={22} strokeWidth={2} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn('w-1.5 h-1.5 rounded-full', sc.dot)} />
          <span className={cn('text-[11px] font-medium', sc.text)}>
            {sc.label}
          </span>
        </div>
      </div>

      <h3 className="font-display font-extrabold text-base tracking-[-0.01em]">
        {name}
      </h3>
      <p className="font-sans text-xs text-akili-charbon-soft mt-1 leading-[1.55] flex-1">
        {desc}
      </p>

      <div className="mt-4 pt-4 border-t border-akili-line flex items-center justify-between text-[11px]">
        {account ? (
          <span className="text-akili-charbon-mute truncate max-w-[180px]">
            {account}
          </span>
        ) : (
          <span className="text-akili-charbon-mute">Pas encore connectée</span>
        )}
      </div>

      <Button
        size="sm"
        variant={isAvailable ? 'primary' : 'outline'}
        fullWidth
        className="mt-3"
        iconLeft={isAvailable ? <Plus size={14} /> : null}
      >
        {isAvailable ? 'Connecter' : status === 'expired' ? 'Reconnecter' : 'Gérer'}
      </Button>
    </Card>
  );
}

function IntegrationDetail({ integration, busy, onClose, onConnect, onDisconnect }) {
  const { name, status, account, color, Icon } = integration;
  const sc = STATUS_CONFIG[status] || STATUS_CONFIG.available;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-akili flex items-center justify-center"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={26} strokeWidth={2} />
        </div>
        <div>
          <Badge variant={status === 'connected' ? 'success' : status === 'expired' ? 'warning' : 'neutral'} dot>
            {sc.label}
          </Badge>
          {account && (
            <div className="text-sm text-akili-charbon-soft mt-1.5">
              Compte : <span className="font-medium text-akili-charbon">{account}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-akili-charbon-mute font-bold mb-2">
          Permissions accordées
        </div>
        <ul className="text-sm space-y-1.5">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-akili-success" />
            Lecture des données
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-akili-success" />
            Écriture (création / modification)
          </li>
          <li className="flex items-center gap-2 text-akili-charbon-mute">
            <AlertTriangle size={14} />
            Suppression non autorisée par défaut
          </li>
        </ul>
      </div>

      <div className="flex justify-between gap-3 pt-4 border-t border-akili-line">
        {status === 'available' ? (
          <Button variant="primary" iconLeft={<Plus size={16} />} fullWidth loading={busy} onClick={onConnect}>
            Connecter {name}
          </Button>
        ) : (
          <>
            <Button variant="ghost" onClick={onClose}>Fermer</Button>
            <Button
              variant="outline"
              className="text-akili-error border-akili-error hover:bg-akili-coral-50"
              loading={busy}
              onClick={onDisconnect}
            >
              Déconnecter
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function ApiKeysContent() {
  const { toast } = useToast();
  const webhookUrl = 'https://api.akili.app/webhooks/in/aicha-9f12c4b8';

  const copy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({ type: 'success', title: 'Copié', description: `${label} copié dans ton presse-papier.` });
    });
  };

  const regenerate = () => {
    toast({ type: 'success', title: 'Clé régénérée', description: 'L\'ancienne clé est désormais invalide.' });
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-sm">Clé API personnelle</span>
          <Button size="sm" variant="ghost" onClick={regenerate}>Régénérer</Button>
        </div>
        <div className="font-mono text-xs bg-akili-papyrus-warm border border-akili-line rounded-akili p-3 text-akili-charbon select-all">
          akili_sk_•••••••••••••••••••••••••••••••a4f9
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-sm">Webhook entrant</span>
          <Button size="sm" variant="ghost" onClick={() => copy(webhookUrl, 'URL webhook')}>Copier</Button>
        </div>
        <div className="font-mono text-xs bg-akili-papyrus-warm border border-akili-line rounded-akili p-3 text-akili-charbon select-all break-all">
          {webhookUrl}
        </div>
        <p className="text-xs text-akili-charbon-mute mt-2">
          POST n'importe quel JSON sur cette URL pour déclencher une automatisation custom.
        </p>
      </div>
    </div>
  );
}
