/**
 * ProductShowcase — Aperçu visuel du dashboard avec callouts annotés.
 *
 * Mockup HTML/Tailwind plutôt qu'un screenshot statique → reste net
 * en haute densité, pas de fichier image lourd, et réutilise les
 * vrais tokens du design system (cohérence garantie).
 *
 * 4 callouts pointent les éléments clés : KPIs, sparkline, heatmap,
 * automatisations actives.
 */
import { motion } from 'framer-motion';
import {
  Lightning as Zap, PlayCircle, Hourglass, FlowArrow as Workflow,
  TrendUp as TrendingUp, CheckCircle, ArrowRight,
} from '@phosphor-icons/react';
import { SiGmail, SiStripe, SiSlack, SiNotion } from 'react-icons/si';
import { Container } from '@/components/ui/Container';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// Mini sparkline SVG inline
function Sparkline({ color = '#FF6B5C', points = '0,20 10,15 20,18 30,8 40,12 50,5 60,7 70,3' }) {
  return (
    <svg viewBox="0 0 70 22" className="w-full h-full overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`${points} 70,22 0,22`} fill={color} fillOpacity="0.1" stroke="none" />
    </svg>
  );
}

// Mini heatmap GitHub-style
function HeatmapMini() {
  // 7 rows × 12 cols, intensité aléatoire mais déterministe
  const cells = Array.from({ length: 84 }, (_, i) => {
    const seed = (i * 31) % 11;
    const intensities = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
    return intensities[seed];
  });
  const colors = [
    'bg-akili-papyrus-deep',
    'bg-akili-or-100',
    'bg-akili-or-300',
    'bg-akili-or',
    'bg-akili-or-700',
  ];
  return (
    <div className="grid grid-cols-12 gap-1">
      {cells.map((c, i) => (
        <div key={i} className={`aspect-square rounded-sm ${colors[c]}`} />
      ))}
    </div>
  );
}

const AUTOMATIONS = [
  { Icon: SiStripe, name: 'Factures Stripe → PDF', runs: '247', status: 'running' },
  { Icon: SiGmail,  name: 'Backup pièces jointes Gmail', runs: '1,832', status: 'success' },
  { Icon: SiSlack,  name: 'Récap quotidien à 8h', runs: '124', status: 'success' },
  { Icon: SiNotion, name: 'Sync Notion ↔ Calendar', runs: '892', status: 'success' },
];

const STATUS = {
  running: { dot: 'bg-akili-coral animate-pulse', label: 'En cours', text: 'text-akili-coral-700' },
  success: { dot: 'bg-akili-success', label: 'OK',       text: 'text-akili-success' },
};

export function ProductShowcase() {
  return (
    <section id="produit-apercu" className="py-30 bg-akili-papyrus-warm relative overflow-hidden">
      {/* Halo or top */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: -100, top: -80, width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(242,201,76,0.18) 0%, rgba(242,201,76,0) 60%)',
        }}
      />

      <Container size="xl" className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
            · Aperçu produit ·
          </span>
          <h2 className="font-display font-extrabold text-[44px] sm:text-[56px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
            Voilà à quoi ressemble{' '}
            <span className="text-akili-coral">ton dimanche soir.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-akili-charbon-soft mt-5">
            Un dashboard clair, pas un cockpit d'avion. Tu vois en un coup d'œil
            ce qui tourne, ce qui a tourné, ce qui t'a fait gagner du temps.
          </p>
        </motion.div>

        {/* Mockup dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl shadow-akili-xl border border-akili-line overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 h-10 bg-akili-papyrus-deep border-b border-akili-line">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-akili-coral/60" />
                <span className="w-3 h-3 rounded-full bg-akili-or/60" />
                <span className="w-3 h-3 rounded-full bg-akili-success/60" />
              </div>
              <div className="ml-4 flex-1 max-w-sm h-6 rounded-md bg-white border border-akili-line/60 px-3 flex items-center font-mono text-[11px] text-akili-charbon-mute">
                akili.app/app
              </div>
            </div>

            {/* Dashboard layout */}
            <div className="grid grid-cols-[200px_1fr] min-h-[460px]">
              {/* Sidebar */}
              <aside className="bg-akili-indigo p-4 border-r border-akili-indigo-700">
                <div className="flex items-center gap-2 mb-6 pl-2">
                  <span className="w-7 h-7 rounded-akili bg-akili-or flex items-center justify-center font-display font-extrabold text-akili-indigo text-xs">
                    A
                  </span>
                  <span className="font-display font-extrabold text-sm text-akili-papyrus tracking-tight">
                    Akili
                  </span>
                </div>
                <nav className="flex flex-col gap-1">
                  {['Dashboard', 'Automatisations', 'Runs', 'Connexions', 'Documentation'].map((item, i) => (
                    <span
                      key={item}
                      className={`px-3 py-2 rounded-md font-display font-bold text-[11px] tracking-tight ${
                        i === 0
                          ? 'bg-akili-or text-akili-indigo'
                          : 'text-akili-papyrus/70'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </nav>
              </aside>

              {/* Main */}
              <main className="p-6 bg-akili-papyrus relative">
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <h3 className="font-display font-extrabold text-xl tracking-[-0.02em] text-akili-charbon">
                      Bonjour, Aïcha 👋
                    </h3>
                    <p className="font-sans text-[12px] text-akili-charbon-mute mt-0.5">
                      Tu as économisé <span className="font-bold text-akili-coral">8 h cette semaine</span>.
                    </p>
                  </div>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-4 gap-3 relative">
                  {[
                    { Icon: Workflow,    label: 'Actives',    value: '14', accent: 'text-akili-indigo' },
                    { Icon: PlayCircle,  label: 'Runs (mois)',value: '3,247', accent: 'text-akili-coral' },
                    { Icon: Zap,         label: 'Succès',     value: '99.2%', accent: 'text-akili-success' },
                    { Icon: Hourglass,   label: 'Heures gagnées', value: '47 h', accent: 'text-akili-or-700' },
                  ].map(({ Icon, label, value, accent }, i) => (
                    <div key={label} className="bg-white border border-akili-line rounded-akili p-3">
                      <div className="flex items-center gap-2 text-akili-charbon-mute">
                        <span className={`w-7 h-7 rounded-md bg-akili-papyrus-deep flex items-center justify-center ${accent}`}>
                          <Icon size={14} weight="duotone" />
                        </span>
                        <span className="font-sans text-[10px] text-akili-charbon-soft truncate">{label}</span>
                      </div>
                      <div className="font-display font-extrabold text-xl tracking-[-0.02em] mt-2 leading-none flex items-baseline gap-1.5">
                        {value}
                        {i === 1 && (
                          <span className="inline-flex items-center gap-0.5 font-mono text-[9px] text-akili-success">
                            <TrendingUp size={9} weight="bold" />+12%
                          </span>
                        )}
                      </div>
                      {i === 1 && (
                        <div className="mt-2 h-5">
                          <Sparkline color="#FF6B5C" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Two cols : automatisations + heatmap */}
                <div className="grid grid-cols-[1.2fr_1fr] gap-3 mt-3">
                  {/* Liste automatisations */}
                  <div className="bg-white border border-akili-line rounded-akili p-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-display font-bold text-[11px] uppercase tracking-wider text-akili-charbon-soft">
                        Automatisations actives
                      </h4>
                      <span className="font-mono text-[9px] text-akili-charbon-mute">14 actives</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {AUTOMATIONS.map(({ Icon: BrandIcon, name, runs, status }) => {
                        const s = STATUS[status];
                        return (
                          <div key={name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-akili-papyrus-deep transition-colors">
                            <span className="w-6 h-6 rounded-sm bg-akili-papyrus-deep flex items-center justify-center text-akili-charbon-soft">
                              <BrandIcon size={12} />
                            </span>
                            <span className="flex-1 font-sans text-[11px] text-akili-charbon truncate">
                              {name}
                            </span>
                            <span className="font-mono text-[10px] text-akili-charbon-mute">
                              {runs}
                            </span>
                            <span className={`inline-flex items-center gap-1 ${s.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                              <span className="font-display font-bold text-[9px] uppercase tracking-wider">
                                {s.label}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Heatmap */}
                  <div className="bg-white border border-akili-line rounded-akili p-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="font-display font-bold text-[11px] uppercase tracking-wider text-akili-charbon-soft">
                        Activité 12 semaines
                      </h4>
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] text-akili-success">
                        <CheckCircle size={9} weight="fill" />
                        99.2%
                      </span>
                    </div>
                    <HeatmapMini />
                    <div className="flex items-center justify-between mt-2.5 font-mono text-[9px] text-akili-charbon-mute">
                      <span>Moins</span>
                      <div className="flex gap-0.5">
                        {['bg-akili-papyrus-deep', 'bg-akili-or-100', 'bg-akili-or-300', 'bg-akili-or', 'bg-akili-or-700'].map((c, i) => (
                          <div key={i} className={`w-2 h-2 rounded-sm ${c}`} />
                        ))}
                      </div>
                      <span>Plus</span>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

        </motion.div>

        {/* Callouts annotés — placés SOUS la mockup pour ne pas se superposer
            (anciennement en absolute, qui overlapait le dashboard). */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden md:grid grid-cols-2 gap-10 lg:gap-16 mt-10 max-w-4xl mx-auto"
        >
          {/* Callout 1 — KPIs */}
          <div>
            <div className="bg-akili-coral text-white px-3 py-1.5 rounded-pill font-display font-bold text-[11px] uppercase tracking-wider shadow-akili-coral inline-block">
              ① 4 KPI live
            </div>
            <p className="font-sans text-[14px] text-akili-charbon-soft mt-3 leading-relaxed">
              Actifs, runs du mois, taux de succès, heures gagnées — actualisés toutes les 30 s.
            </p>
          </div>

          {/* Callout 2 — heatmap */}
          <div className="text-right">
            <div className="bg-akili-or text-akili-indigo px-3 py-1.5 rounded-pill font-display font-bold text-[11px] uppercase tracking-wider shadow-akili-or inline-block">
              ② Heatmap 12 sem
            </div>
            <p className="font-sans text-[14px] text-akili-charbon-soft mt-3 leading-relaxed">
              Une cellule = un jour. Plus c'est doré, plus tu as automatisé.
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors group"
          >
            Voir le vrai dashboard en live
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <span className="font-sans text-sm text-akili-charbon-mute text-center">
            Sans carte · Compte gratuit · 30 secondes
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
