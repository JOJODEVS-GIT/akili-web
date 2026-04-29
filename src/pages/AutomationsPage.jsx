import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SquaresFour as LayoutGrid, List, Plus, Sparkle as Sparkles, Funnel as Filter, CircleNotch as Loader2, Tray as Inbox, TreeStructure as FolderTree, EnvelopeSimple as MailIcon, FileText as FileTextIcon, FlowArrow as Workflow, ChatCircle as MessageCircle, Rocket, Lightning as Zap } from '@phosphor-icons/react';
import {
  SiGmail, SiGoogledrive, SiStripe, SiSlack, SiNotion, SiGithub, SiDiscord,
  SiGooglecalendar, SiGooglesheets, SiPostgresql, SiX,
  SiVercel, SiToggl,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NewAutomationModal } from '@/components/dashboard/NewAutomationModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/components/ui/Toast';
import { useAutomations } from '@/hooks/useAutomations';
import { TEMPLATES, CATEGORIES } from '@/data/templates';
import { cn } from '@/lib/cn';

// Map provider id → vrai logo officiel + couleur de marque
const INTEGRATION_LOGOS = {
  gmail:    { Icon: SiGmail,            color: '#EA4335' },
  drive:    { Icon: SiGoogledrive,      color: '#1FA463' },
  stripe:   { Icon: SiStripe,           color: '#635BFF' },
  slack:    { Icon: SiSlack,            color: '#4A154B' },
  notion:   { Icon: SiNotion,           color: '#000000' },
  github:   { Icon: SiGithub,           color: '#171515' },
  discord:  { Icon: SiDiscord,          color: '#5865F2' },
  calendar: { Icon: SiGooglecalendar,   color: '#4285F4' },
  sheets:   { Icon: SiGooglesheets,     color: '#1FA463' },
  postgres: { Icon: SiPostgresql,       color: '#336791' },
  s3:       { Icon: FaAws,              color: '#FF9900' },
  twitter:  { Icon: SiX,                color: '#000000' },
  vercel:   { Icon: SiVercel,           color: '#000000' },
  toggl:    { Icon: SiToggl,            color: '#E57CD8' },
};

function IntegrationLogo({ id, size = 14 }) {
  const meta = INTEGRATION_LOGOS[id];
  if (!meta) {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-akili-papyrus-deep text-[8px] uppercase font-bold tracking-wider text-akili-charbon-soft">
        {id.slice(0, 2)}
      </span>
    );
  }
  const { Icon, color } = meta;
  return (
    <span
      title={id}
      className="inline-flex items-center justify-center w-5 h-5 rounded-sm"
      style={{ background: `${color}15`, color }}
    >
      <Icon size={size} />
    </span>
  );
}

const TABS = [
  { id: 'mine',     label: 'Mes automatisations' },
  { id: 'templates', label: 'Marketplace' },
];

// Map des icônes par category (pour les automations qui n'ont pas de template_id)
const CATEGORY_ICON = {
  files:         FolderTree,
  email:         MailIcon,
  invoicing:     FileTextIcon,
  calendar:      Workflow,
  communication: MessageCircle,
  devops:        Rocket,
  other:         Zap,
};

// Adapte une automation Supabase au format attendu par TemplateCard/Row.
function adaptAutomation(a) {
  // Si l'automation vient d'un template, on retrouve ses metadata (Icon, integrations, savings).
  const template = a.template_id ? TEMPLATES.find((t) => t.id === a.template_id) : null;
  return {
    id: a.id,
    Icon: template?.Icon || CATEGORY_ICON[a.category] || Zap,
    category: a.category || 'other',
    name: a.name,
    desc: a.description || template?.desc || '',
    integrations: template?.integrations || [],
    savings: a.estimated_savings_hours
      ? `${a.estimated_savings_hours} h/mois`
      : (template?.savings || '— à mesurer'),
    status: a.status,
  };
}

export default function AutomationsPage() {
  const [tab, setTab] = useState('mine');
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const newModal = useDisclosure();
  const { toast } = useToast();
  const { items, loading, create } = useAutomations();
  const [installing, setInstalling] = useState(null);

  const handleInstall = async (template) => {
    setInstalling(template.id);
    const { error } = await create({
      template_id: template.id,
      name: template.name,
      description: template.desc,
      category: template.category,
      status: 'brouillon',
      estimated_savings_hours: 0,
    });
    setInstalling(null);
    if (error) {
      toast({ type: 'error', title: 'Installation échouée', description: error.message });
      return;
    }
    toast({
      type: 'success',
      title: 'Template installé',
      description: `« ${template.name} » est dans tes automatisations.`,
    });
    setTab('mine');
  };

  const handleConfigure = (item) => {
    toast({
      type: 'info',
      title: 'Configuration',
      description: `Modal de config pour « ${item.name} » — bientôt en V2.`,
    });
  };

  const handleCreate = async ({ template, name }) => {
    const { error } = await create({
      template_id: template.id,
      name,
      description: template.desc,
      category: template.category,
      status: 'brouillon',
      estimated_savings_hours: 0,
    });
    if (error) {
      toast({ type: 'error', title: 'Création échouée', description: error.message });
      return;
    }
    setTab('mine');
    toast({ type: 'success', title: 'Automatisation créée', description: `« ${name} » est prête à tourner.` });
  };

  // Source items selon l'onglet
  const sourceItems = useMemo(() => {
    if (tab === 'templates') return TEMPLATES;
    return items.map(adaptAutomation);
  }, [tab, items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sourceItems.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (q && !`${t.name} ${t.desc}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sourceItems, query, category]);

  const isMine = tab === 'mine';
  const isLoadingMine = isMine && loading;

  return (
    <DashboardLayout query={query} onQueryChange={setQuery}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            Automatisations
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2 text-balance">
            Tout ce qui tourne <span className="text-akili-charbon-mute">à ta place.</span>
          </h1>
        </div>
        <Button variant="primary" shape="pill" iconLeft={<Plus size={16} />} onClick={newModal.open}>
          Nouvelle automatisation
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-akili-line">
        {TABS.map((t) => {
          const isActive = tab === t.id;
          const count = t.id === 'templates' ? TEMPLATES.length : items.length;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'relative px-4 py-3 -mb-px font-display font-bold text-sm transition-colors',
                isActive
                  ? 'text-akili-charbon border-b-2 border-akili-coral'
                  : 'text-akili-charbon-mute border-b-2 border-transparent hover:text-akili-charbon'
              )}
            >
              {t.label}
              {!isLoadingMine && (
                <Badge variant={t.id === 'templates' ? 'or' : 'neutral'} className="ml-2">
                  {count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-akili-charbon-mute font-bold">
            <Filter size={12} /> Catégorie
          </span>
          <FilterPill active={category === 'all'} onClick={() => setCategory('all')}>
            Tout
          </FilterPill>
          {Object.values(CATEGORIES).map((c) => (
            <FilterPill key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </FilterPill>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-white border border-akili-line rounded-akili p-0.5">
          <button
            onClick={() => setView('grid')}
            aria-label="Vue grille"
            className={cn(
              'w-8 h-8 rounded flex items-center justify-center transition-colors',
              view === 'grid' ? 'bg-akili-papyrus-deep text-akili-charbon' : 'text-akili-charbon-mute hover:bg-akili-papyrus-deep/50'
            )}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="Vue liste"
            className={cn(
              'w-8 h-8 rounded flex items-center justify-center transition-colors',
              view === 'list' ? 'bg-akili-papyrus-deep text-akili-charbon' : 'text-akili-charbon-mute hover:bg-akili-papyrus-deep/50'
            )}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Items */}
      {isLoadingMine ? (
        <Card variant="flat" padding="lg" className="mt-5 flex items-center justify-center gap-3 text-akili-charbon-mute">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">On charge tes automatisations...</span>
        </Card>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
            >
              <TemplateCard
                template={t}
                isInstalled={isMine}
                isInstalling={installing === t.id}
                onAction={isMine ? handleConfigure : handleInstall}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <Card variant="flat" padding="md" className="!p-0 overflow-hidden mt-5">
          {filtered.map((t) => (
            <TemplateRow
              key={t.id}
              template={t}
              isInstalled={isMine}
              isInstalling={installing === t.id}
              onAction={isMine ? handleConfigure : handleInstall}
            />
          ))}
        </Card>
      )}

      {!isLoadingMine && filtered.length === 0 && (
        <Card variant="flat" padding="lg" className="mt-5 text-center">
          {isMine && items.length === 0 ? (
            <>
              <Inbox size={28} className="mx-auto text-akili-charbon-mute" />
              <p className="mt-3 font-display font-bold">Aucune automatisation pour l'instant.</p>
              <p className="text-xs text-akili-charbon-soft mt-1">
                Pioche un template dans la marketplace ou crée la tienne.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button size="sm" variant="primary" onClick={() => setTab('templates')}>
                  Voir la marketplace
                </Button>
                <Button size="sm" variant="outline" onClick={newModal.open}>
                  Créer
                </Button>
              </div>
            </>
          ) : (
            <>
              <Sparkles size={28} className="mx-auto text-akili-charbon-mute" />
              <p className="mt-3 font-display font-bold">Aucun résultat pour ce filtre.</p>
            </>
          )}
        </Card>
      )}

      <NewAutomationModal
        isOpen={newModal.isOpen}
        onClose={newModal.close}
        onCreate={handleCreate}
      />
    </DashboardLayout>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-pill text-[11px] font-medium ring-1 ring-inset transition-all duration-200',
        active
          ? 'bg-akili-charbon text-akili-papyrus ring-akili-charbon'
          : 'bg-white text-akili-charbon-soft ring-akili-line hover:bg-akili-papyrus-deep'
      )}
    >
      {children}
    </button>
  );
}

function TemplateCard({ template, isInstalled, isInstalling, onAction }) {
  const t = template;
  const cat = CATEGORIES[t.category] || { label: 'Autre', color: 'indigo' };
  return (
    <Card variant="flat" padding="md" interactive className="h-full flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-akili bg-akili-${cat.color}-50 flex items-center justify-center text-akili-${cat.color} transition-transform group-hover:scale-110`}>
          <t.Icon size={20} strokeWidth={1.75} />
        </div>
        <Badge variant={cat.color}>{cat.label}</Badge>
      </div>
      <h3 className="font-display font-extrabold text-base tracking-[-0.01em] text-balance">
        {t.name}
      </h3>
      <p className="font-sans text-xs text-akili-charbon-soft mt-1.5 leading-[1.55] flex-1">
        {t.desc}
      </p>
      <div className="mt-4 pt-4 border-t border-akili-line flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {(t.integrations || []).slice(0, 4).map((int) => (
            <IntegrationLogo key={int} id={int} />
          ))}
          {(t.integrations || []).length > 4 && (
            <span className="text-[10px] text-akili-charbon-mute font-medium">+{t.integrations.length - 4}</span>
          )}
        </div>
        <span className="font-mono text-[11px] text-akili-success font-medium">{t.savings}</span>
      </div>
      <Button
        size="sm"
        variant={isInstalled ? 'outline' : 'primary'}
        fullWidth
        loading={isInstalling}
        className="mt-3"
        onClick={() => onAction?.(t)}
      >
        {isInstalled ? 'Configurer' : isInstalling ? 'Installation...' : 'Installer'}
      </Button>
    </Card>
  );
}

function TemplateRow({ template, isInstalled, isInstalling, onAction }) {
  const t = template;
  const cat = CATEGORIES[t.category] || { label: 'Autre', color: 'indigo' };
  return (
    <div className="px-5 py-4 flex items-center gap-4 border-b border-akili-line last:border-b-0 hover:bg-akili-papyrus-warm transition-colors">
      <span className={`w-10 h-10 rounded-akili bg-akili-${cat.color}-50 flex items-center justify-center text-akili-${cat.color}`}>
        <t.Icon size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm">{t.name}</span>
          <Badge variant={cat.color}>{cat.label}</Badge>
        </div>
        <div className="text-xs text-akili-charbon-mute mt-0.5 truncate">{t.desc}</div>
      </div>
      <span className="hidden sm:inline font-mono text-xs text-akili-success font-medium">{t.savings}</span>
      <Button
        size="sm"
        variant={isInstalled ? 'outline' : 'primary'}
        loading={isInstalling}
        onClick={() => onAction?.(t)}
      >
        {isInstalled ? 'Configurer' : isInstalling ? '...' : 'Installer'}
      </Button>
    </div>
  );
}
