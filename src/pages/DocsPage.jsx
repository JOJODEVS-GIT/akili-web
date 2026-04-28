import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass as Search, ArrowRight, Rocket, BookOpen, Plugs as PlugZap, Code as Code2, Warning as AlertTriangle, Sparkle as Sparkles, CaretDown as ChevronDown, CaretRight as ChevronRight, EnvelopeSimple as Mail, ChatCircle as MessageCircle, GithubLogo as Github } from '@phosphor-icons/react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const CATEGORIES = [
  { id: 'start',     Icon: Rocket,         label: 'Premiers pas',    color: 'coral',  count: 6 },
  { id: 'templates', Icon: Sparkles,       label: 'Templates',       color: 'or',     count: 20 },
  { id: 'connect',   Icon: PlugZap,        label: 'Connexions',      color: 'indigo', count: 12 },
  { id: 'api',       Icon: Code2,          label: 'Référence API',   color: 'indigo', count: 18 },
  { id: 'trouble',   Icon: AlertTriangle,  label: 'Troubleshooting', color: 'coral',  count: 9 },
];

const POPULAR = [
  { id: 'p1', title: 'Créer ta première automatisation en 3 étapes',  category: 'start',     readTime: '4 min', isNew: true },
  { id: 'p2', title: 'Connecter Stripe à Akili',                       category: 'connect',   readTime: '3 min' },
  { id: 'p3', title: 'Comment fonctionne la planification cron',       category: 'templates', readTime: '5 min' },
  { id: 'p4', title: 'Gérer les erreurs et les reprises automatiques', category: 'trouble',   readTime: '6 min' },
  { id: 'p5', title: 'Webhooks : recevoir des événements externes',    category: 'api',       readTime: '7 min' },
  { id: 'p6', title: 'Bonnes pratiques pour automatiser ses factures', category: 'templates', readTime: '5 min', isNew: true },
];

const FAQ = [
  {
    q: 'Combien d\'automatisations puis-je créer ?',
    a: 'Sur le plan Atelier (gratuit), tu peux créer jusqu\'à 5 automatisations actives en parallèle. Le plan Pro lève cette limite et ajoute des exécutions illimitées.',
  },
  {
    q: 'Mes données sont-elles en sécurité ?',
    a: 'Oui. Akili est hébergé en Europe, chiffre toutes les données au repos et en transit, et n\'utilise jamais tes données pour entraîner des modèles. Tes connexions OAuth sont stockées chiffrées.',
  },
  {
    q: 'Que se passe-t-il quand une automatisation échoue ?',
    a: 'Akili tente automatiquement 3 fois avec un backoff exponentiel. Si l\'échec persiste, tu reçois une notification (email + Slack si connecté) avec les logs complets et un bouton "Relancer".',
  },
  {
    q: 'Puis-je connecter mes propres outils via API ?',
    a: 'Oui, via l\'API REST Akili et les webhooks personnalisés. Va dans Connexions > Clés API & webhooks pour générer ta clé.',
  },
  {
    q: 'Comment annuler mon abonnement ?',
    a: 'Dans Paramètres > Facturation. L\'annulation prend effet à la fin de la période en cours, tes automatisations restent actives jusque-là.',
  },
  {
    q: 'Akili fonctionne-t-il avec mes outils africains (Wave, MTN, Orange Money) ?',
    a: 'On y travaille. Wave et MTN MoMo sont en bêta privée, ouverte cet été. Inscris-toi sur la liste d\'attente depuis ta page Connexions.',
  },
];

const QUICKSTART = [
  { n: '01', title: 'Crée ton compte',          desc: 'En 30 secondes avec ton email ou Google.' },
  { n: '02', title: 'Connecte ton premier outil', desc: 'Drive, Gmail, Stripe... un OAuth en 2 clics.' },
  { n: '03', title: 'Choisis un template',      desc: '20 modèles prêts, classés par catégorie.' },
  { n: '04', title: 'Lance et oublie',          desc: 'Manuel, programmé, ou déclenché par un événement.' },
];

export default function DocsPage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POPULAR.filter((a) => {
      if (activeCat !== 'all' && a.category !== activeCat) return false;
      if (q && !a.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, activeCat]);

  return (
    <DashboardLayout query={query} onQueryChange={setQuery}>
      {/* Header */}
      <div>
        <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
          Documentation
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-[40px] tracking-[-0.03em] leading-[1.1] mt-2 text-balance">
          Tout pour avancer <span className="text-akili-charbon-mute">sans bloquer.</span>
        </h1>
      </div>

      {/* Big search */}
      <div className="mt-8 relative max-w-2xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-akili-charbon-mute pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cherche un sujet, une intégration, un template..."
          className="w-full h-14 pl-12 pr-4 bg-white border-2 border-akili-line rounded-akili font-sans text-base text-akili-charbon outline-none focus:border-akili-indigo focus:ring-4 focus:ring-akili-indigo-50 transition-all duration-200"
        />
      </div>

      {/* Quickstart */}
      <Card variant="indigo" padding="lg" className="mt-8 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            right: -80, top: -80, width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 70%)',
          }}
        />
        <div className="relative">
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-or">
            Quickstart
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-[-0.02em] mt-2 text-akili-papyrus">
            De 0 à ta première automatisation,
            <br />
            <span className="text-akili-or">en 4 étapes</span>.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {QUICKSTART.map((s) => (
              <div key={s.n} className="bg-akili-indigo-700/40 backdrop-blur rounded-akili p-4">
                <span className="font-mono text-[11px] text-akili-or font-medium tracking-wider">
                  {s.n}
                </span>
                <h3 className="font-display font-bold text-sm mt-1 text-akili-papyrus">
                  {s.title}
                </h3>
                <p className="font-sans text-xs text-akili-indigo-100 mt-1.5 leading-[1.55]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Categories */}
      <div className="mt-10">
        <h2 className="font-display font-extrabold text-xl tracking-[-0.02em] mb-4">
          Catégories
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <CategoryCard
            label="Tout"
            Icon={BookOpen}
            color="indigo"
            count={POPULAR.length}
            active={activeCat === 'all'}
            onClick={() => setActiveCat('all')}
          />
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              label={c.label}
              Icon={c.Icon}
              color={c.color}
              count={c.count}
              active={activeCat === c.id}
              onClick={() => setActiveCat(c.id)}
            />
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="mt-10">
        <h2 className="font-display font-extrabold text-xl tracking-[-0.02em] mb-4">
          {activeCat === 'all' ? 'Articles populaires' : 'Articles'}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <Card variant="flat" padding="lg" className="lg:col-span-2 text-center">
              <Sparkles size={28} className="mx-auto text-akili-charbon-mute" />
              <p className="mt-3 font-display font-bold">Aucun résultat pour cette recherche.</p>
            </Card>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="font-display font-extrabold text-xl tracking-[-0.02em] mb-4">
          Questions fréquentes
        </h2>
        <Card variant="flat" padding="md" className="!p-0 overflow-hidden">
          {FAQ.map((item, i) => (
            <FaqItem
              key={i}
              question={item.q}
              answer={item.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </Card>
      </div>

      {/* Help footer */}
      <Card variant="flat" padding="lg" className="mt-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-display font-extrabold text-lg">
              Tu n'as pas trouvé ce que tu cherchais ?
            </h3>
            <p className="font-sans text-sm text-akili-charbon-soft mt-1">
              On répond à toutes les questions en moins de 24h, ouvré ou pas.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" iconLeft={<Mail size={14} />}>support@akili.app</Button>
            <Button variant="outline" size="sm" iconLeft={<MessageCircle size={14} />}>Discord</Button>
            <Button variant="outline" size="sm" iconLeft={<Github size={14} />}>GitHub</Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}

function CategoryCard({ label, Icon, color, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-4 rounded-akili border-2 text-left transition-all duration-200',
        active
          ? `bg-akili-${color}-50 border-akili-${color}`
          : 'bg-white border-akili-line hover:border-akili-charbon-mute'
      )}
    >
      <div className={`w-10 h-10 rounded-akili bg-akili-${color}-50 flex items-center justify-center text-akili-${color} mb-3`}>
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="font-display font-bold text-sm">{label}</div>
      <div className="font-mono text-xs text-akili-charbon-mute mt-0.5">
        {count} article{count > 1 ? 's' : ''}
      </div>
    </button>
  );
}

function ArticleCard({ article }) {
  return (
    <Card variant="flat" padding="md" interactive className="group flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display font-bold text-[15px] tracking-[-0.01em]">
            {article.title}
          </h3>
          {article.isNew && <Badge variant="coral">Nouveau</Badge>}
        </div>
        <div className="font-mono text-xs text-akili-charbon-mute mt-1">
          {article.readTime} de lecture
        </div>
      </div>
      <ArrowRight size={16} className="text-akili-charbon-mute group-hover:translate-x-1 group-hover:text-akili-coral transition-all" />
    </Card>
  );
}

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-akili-line last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-akili-papyrus-warm transition-colors"
      >
        <span className="font-display font-bold text-[15px]">{question}</span>
        {isOpen ? <ChevronDown size={16} className="text-akili-charbon-mute shrink-0" /> : <ChevronRight size={16} className="text-akili-charbon-mute shrink-0" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-akili-charbon-soft leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
