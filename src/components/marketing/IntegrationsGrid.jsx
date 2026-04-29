/**
 * IntegrationsGrid — Grille complète des 21 intégrations Akili.
 *
 * Pattern volé à Activepieces : catalogue filtrable par catégorie,
 * chaque card cliquable mène vers la future page /integrations/{slug}
 * (à créer en PR #20).
 *
 * Différent de IntegrationsMarquee qui est une bande défilante.
 * Ici c'est une grille statique exhaustive avec catégories et search.
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass } from '@phosphor-icons/react';
import {
  SiGmail, SiGoogledrive, SiStripe, SiSlack, SiNotion, SiGithub, SiDiscord,
  SiGooglecalendar, SiGooglesheets, SiPostgresql, SiX, SiVercel, SiToggl,
  SiAirtable, SiTrello, SiZoom, SiDropbox, SiLinear, SiFigma, SiAsana,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa6';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

const CATEGORIES = [
  { id: 'all',           label: 'Toutes' },
  { id: 'email',         label: 'Email' },
  { id: 'storage',       label: 'Stockage' },
  { id: 'payments',      label: 'Paiements' },
  { id: 'communication', label: 'Communication' },
  { id: 'productivity',  label: 'Productivité' },
  { id: 'devops',        label: 'DevOps' },
  { id: 'design',        label: 'Design' },
];

const INTEGRATIONS = [
  { slug: 'gmail',     name: 'Gmail',           Icon: SiGmail,          color: '#EA4335', category: 'email',         desc: 'Trier, archiver, forward, répondre auto.' },
  { slug: 'drive',     name: 'Google Drive',    Icon: SiGoogledrive,    color: '#1FA463', category: 'storage',       desc: 'Renommer, sauvegarder, watcher des dossiers.' },
  { slug: 'sheets',    name: 'Google Sheets',   Icon: SiGooglesheets,   color: '#1FA463', category: 'productivity',  desc: 'Lire, écrire, déclencher sur changement.' },
  { slug: 'calendar',  name: 'Google Calendar', Icon: SiGooglecalendar, color: '#4285F4', category: 'productivity',  desc: 'Sync, récap quotidien, alertes.' },
  { slug: 'stripe',    name: 'Stripe',          Icon: SiStripe,         color: '#635BFF', category: 'payments',      desc: 'Factures auto, relances, notifs ventes.' },
  { slug: 'slack',     name: 'Slack',           Icon: SiSlack,          color: '#4A154B', category: 'communication', desc: 'Notifs, récap, alertes status.' },
  { slug: 'discord',   name: 'Discord',         Icon: SiDiscord,        color: '#5865F2', category: 'communication', desc: 'Webhooks, notifs canal, alertes.' },
  { slug: 'notion',    name: 'Notion',          Icon: SiNotion,         color: '#000000', category: 'productivity',  desc: 'Sync bases, backups, templates auto.' },
  { slug: 'github',    name: 'GitHub',          Icon: SiGithub,         color: '#171515', category: 'devops',        desc: 'Webhooks, notifs PR, déploiements.' },
  { slug: 'vercel',    name: 'Vercel',          Icon: SiVercel,         color: '#000000', category: 'devops',        desc: 'Auto-deploy, monitoring, rollbacks.' },
  { slug: 'postgres',  name: 'Postgres',        Icon: SiPostgresql,     color: '#336791', category: 'devops',        desc: 'Backups, requêtes scheduled, dumps.' },
  { slug: 's3',        name: 'AWS S3',          Icon: FaAws,            color: '#FF9900', category: 'storage',       desc: 'Backups, sync de fichiers, archivage.' },
  { slug: 'twitter',   name: 'X (Twitter)',     Icon: SiX,              color: '#000000', category: 'communication', desc: 'Posts auto, threads, scheduling.' },
  { slug: 'toggl',     name: 'Toggl',           Icon: SiToggl,          color: '#E57CD8', category: 'productivity',  desc: 'Tracking temps, exports rapport.' },
  { slug: 'airtable',  name: 'Airtable',        Icon: SiAirtable,       color: '#FFB400', category: 'productivity',  desc: 'CRUD bases, déclencheurs sur ajout.' },
  { slug: 'trello',    name: 'Trello',          Icon: SiTrello,         color: '#0079BF', category: 'productivity',  desc: 'Cartes auto, déplacements de listes.' },
  { slug: 'zoom',      name: 'Zoom',            Icon: SiZoom,           color: '#0B5CFF', category: 'communication', desc: 'Création réunion, recap auto, notifs.' },
  { slug: 'dropbox',   name: 'Dropbox',         Icon: SiDropbox,        color: '#0061FF', category: 'storage',       desc: 'Sync, backups, watchers de dossiers.' },
  { slug: 'linear',    name: 'Linear',          Icon: SiLinear,         color: '#5E6AD2', category: 'productivity',  desc: 'Création issues, sync GitHub, notifs.' },
  { slug: 'figma',     name: 'Figma',           Icon: SiFigma,          color: '#F24E1E', category: 'design',        desc: 'Webhooks fichiers, notifs commentaires.' },
  { slug: 'asana',     name: 'Asana',           Icon: SiAsana,          color: '#F06A6A', category: 'productivity',  desc: 'Tâches auto, recap weekly, notifs.' },
];

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function IntegrationsGrid() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const visible = useMemo(() => {
    let list = INTEGRATIONS;
    if (filter !== 'all') list = list.filter((i) => i.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  return (
    <section id="catalogue" className="py-22 bg-akili-papyrus">
      <Container size="xl">
        {/* Filters + search row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          {/* Catégories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  'px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-200',
                  filter === c.id
                    ? 'bg-akili-indigo text-akili-papyrus shadow-akili-md'
                    : 'bg-white text-akili-charbon-soft border border-akili-line hover:border-akili-indigo hover:text-akili-indigo'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-akili-charbon-mute"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher une intégration…"
              className="w-full h-10 pl-9 pr-3 bg-white border border-akili-line rounded-full font-sans text-sm placeholder:text-akili-charbon-mute focus:border-akili-or focus:ring-2 focus:ring-akili-or/30 outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((integration, i) => (
              <motion.a
                key={integration.slug}
                layout
                href={`/integrations/${integration.slug}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-50px' }}
                variants={reveal}
                className="group bg-white border border-akili-line rounded-akili p-4 hover:border-akili-or hover:shadow-akili-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col items-center text-center"
              >
                <span
                  className="w-10 h-10 rounded-akili flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${integration.color}15`, color: integration.color }}
                >
                  <integration.Icon size={22} />
                </span>
                <div className="font-display font-bold text-sm mt-3 text-akili-charbon">
                  {integration.name}
                </div>
                <div className="font-sans text-[11px] text-akili-charbon-mute mt-1 leading-tight line-clamp-2">
                  {integration.desc}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="text-center py-16">
            <p className="font-display font-bold text-lg text-akili-charbon-mute">
              Aucune intégration ne correspond à ta recherche.
            </p>
            <button
              onClick={() => { setFilter('all'); setSearch(''); }}
              className="mt-4 font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors"
            >
              Réinitialiser les filtres →
            </button>
          </div>
        )}

        {/* Roadmap africaine */}
        <div className="mt-16 p-6 lg:p-8 bg-akili-indigo text-akili-papyrus rounded-akili relative overflow-hidden">
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              right: -50, top: -50, width: 240, height: 240,
              background: 'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 60%)',
            }}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
            <div>
              <Badge variant="or">Roadmap Q3 2026</Badge>
              <h3 className="font-display font-extrabold text-2xl mt-3 tracking-[-0.02em]">
                3 nouvelles intégrations africaines arrivent.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Wave', flag: '🇸🇳', desc: 'Envois & réceptions' },
                { name: 'Orange Money', flag: '🇨🇮', desc: 'Paiements mobile' },
                { name: 'MTN MoMo', flag: '🇬🇭', desc: 'Wallet africain' },
              ].map((p) => (
                <div
                  key={p.name}
                  className="flex-1 min-w-[140px] bg-akili-indigo-700 px-4 py-3 rounded-akili border border-akili-indigo-700"
                >
                  <div className="text-2xl mb-1">{p.flag}</div>
                  <div className="font-display font-bold text-sm">{p.name}</div>
                  <div className="font-sans text-[11px] text-akili-charbon-mute">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
