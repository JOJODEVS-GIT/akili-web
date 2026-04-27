import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Plus, Sparkles, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NewAutomationModal } from '@/components/dashboard/NewAutomationModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useToast } from '@/components/ui/Toast';
import { TEMPLATES, CATEGORIES } from '@/data/templates';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'mine',     label: 'Mes automatisations' },
  { id: 'templates', label: 'Marketplace' },
];

export default function AutomationsPage() {
  const [tab, setTab] = useState('mine');
  const [view, setView] = useState('grid'); // grid | list
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const newModal = useDisclosure();
  const { toast } = useToast();

  const handleInstall = (template) => {
    toast({
      type: 'success',
      title: 'Template installé',
      description: `« ${template.name} » est dans tes automatisations.`,
    });
  };

  const handleConfigure = (template) => {
    toast({
      type: 'info',
      title: 'Configuration',
      description: `Modal de config pour « ${template.name} » — bientôt en V2.`,
    });
  };

  // Mes automatisations = sous-ensemble des templates pour la démo
  const myAutomations = TEMPLATES.slice(0, 5);

  const items = tab === 'mine' ? myAutomations : TEMPLATES;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (q && !`${t.name} ${t.desc}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [items, query, category]);

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
        <Button variant="primary" iconLeft={<Plus size={16} />} onClick={newModal.open}>
          Nouvelle automatisation
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-akili-line">
        {TABS.map((t) => {
          const isActive = tab === t.id;
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
              {t.id === 'templates' && (
                <Badge variant="or" className="ml-2">
                  {TEMPLATES.length}
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
      {view === 'grid' ? (
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
                isInstalled={tab === 'mine'}
                onAction={tab === 'mine' ? handleConfigure : handleInstall}
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
              isInstalled={tab === 'mine'}
              onAction={tab === 'mine' ? handleConfigure : handleInstall}
            />
          ))}
        </Card>
      )}

      {filtered.length === 0 && (
        <Card variant="flat" padding="lg" className="mt-5 text-center">
          <Sparkles size={28} className="mx-auto text-akili-charbon-mute" />
          <p className="mt-3 font-display font-bold">Aucun template pour ce filtre.</p>
        </Card>
      )}

      <NewAutomationModal
        isOpen={newModal.isOpen}
        onClose={newModal.close}
        onCreate={() => {}}
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

function TemplateCard({ template, isInstalled, onAction }) {
  const t = template;
  const cat = CATEGORIES[t.category];
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
          {t.integrations.slice(0, 3).map((int) => (
            <span
              key={int}
              className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-akili-papyrus-deep text-akili-charbon-soft font-bold"
            >
              {int}
            </span>
          ))}
          {t.integrations.length > 3 && (
            <span className="text-[10px] text-akili-charbon-mute">+{t.integrations.length - 3}</span>
          )}
        </div>
        <span className="font-mono text-[11px] text-akili-success font-medium">{t.savings}</span>
      </div>
      <Button
        size="sm"
        variant={isInstalled ? 'outline' : 'primary'}
        fullWidth
        className="mt-3"
        onClick={() => onAction?.(t)}
      >
        {isInstalled ? 'Configurer' : 'Installer'}
      </Button>
    </Card>
  );
}

function TemplateRow({ template, isInstalled, onAction }) {
  const t = template;
  const cat = CATEGORIES[t.category];
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
      <Button size="sm" variant={isInstalled ? 'outline' : 'primary'} onClick={() => onAction?.(t)}>
        {isInstalled ? 'Configurer' : 'Installer'}
      </Button>
    </div>
  );
}
