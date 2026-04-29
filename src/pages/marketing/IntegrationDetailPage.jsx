/**
 * /integrations/{slug} — Page détaillée par intégration (21 pages SEO).
 *
 * Une seule page React qui se génère dynamiquement selon l'URL param.
 * Chaque intégration a sa propre URL indexable Google : /integrations/gmail,
 * /integrations/stripe, etc.
 *
 * Pattern volé à Activepieces : pages /pieces/{provider} ultra-focalisées
 * SEO avec capabilities, triggers, actions, et templates qui utilisent
 * cette intégration.
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Lightning, FlowArrow, Plug } from '@phosphor-icons/react';
import { MarketingLayout } from '@/components/marketing/MarketingLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CTA } from '@/components/landing/CTA';
import { getIntegrationBySlug, getRelatedIntegrations, INTEGRATION_CATEGORIES } from '@/data/integrations';
import { TEMPLATES } from '@/data/templates';

export default function IntegrationDetailPage() {
  const { slug } = useParams();
  const integration = getIntegrationBySlug(slug);

  // 404 si slug inconnu
  if (!integration) {
    return <Navigate to="/integrations" replace />;
  }

  const related = getRelatedIntegrations(slug);
  const category = INTEGRATION_CATEGORIES[integration.category];

  // Templates qui utilisent cette intégration
  const usedInTemplates = TEMPLATES.filter((t) => t.integrations.includes(slug)).slice(0, 4);

  return (
    <MarketingLayout>
      {/* Hero spécifique à l'intégration */}
      <section className="relative overflow-hidden bg-akili-papyrus pt-24 pb-26">
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            right: -80,
            top: 40,
            width: 420,
            height: 420,
            background: `radial-gradient(circle, ${integration.color}22 0%, ${integration.color}00 60%)`,
          }}
        />

        <Container size="xl" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            {/* Texte */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider text-akili-charbon-mute">
                <Link to="/integrations" className="hover:text-akili-coral transition-colors">
                  Intégrations
                </Link>
                <span>·</span>
                <span>{category.label}</span>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <span
                  className="w-16 h-16 rounded-akili flex items-center justify-center shadow-akili-md"
                  style={{ background: `${integration.color}15`, color: integration.color }}
                >
                  <integration.Icon size={32} />
                </span>
                <h1 className="font-display font-extrabold text-[44px] sm:text-[56px] tracking-[-0.04em] leading-[0.98]">
                  {integration.name}
                </h1>
              </div>

              <p className="font-sans text-lg leading-relaxed text-akili-charbon-soft mt-6 max-w-[560px]">
                {integration.long}
              </p>

              <div className="flex flex-wrap gap-3.5 mt-8">
                <Link to="/signup">
                  <Button size="lg" variant="primary" shape="pill" iconRight={<ArrowRight size={18} />}>
                    Connecter {integration.name}
                  </Button>
                </Link>
                <Link to="/integrations">
                  <Button size="lg" variant="outline" shape="pill">
                    Voir toutes les intégrations
                  </Button>
                </Link>
              </div>

              <p className="font-sans text-sm text-akili-charbon-mute mt-6">
                Connexion via OAuth officiel · Aucun mot de passe stocké · Révocation 1-clic
              </p>
            </div>

            {/* Visuel mockup connexion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-akili shadow-akili-xl border border-akili-line p-6 lg:p-8"
            >
              <div className="font-display font-bold text-[10px] uppercase tracking-wider text-akili-charbon-mute mb-4">
                Aperçu connexion
              </div>
              <div className="flex items-center gap-4 p-4 rounded-akili bg-akili-papyrus-warm">
                <span
                  className="w-12 h-12 rounded-akili flex items-center justify-center shrink-0"
                  style={{ background: `${integration.color}15`, color: integration.color }}
                >
                  <integration.Icon size={22} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm text-akili-charbon">{integration.name}</div>
                  <div className="font-sans text-[12px] text-akili-charbon-mute">{integration.short}</div>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-akili-success/10 text-akili-success text-[11px] font-display font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-akili-success animate-pulse" />
                  Connecté
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-akili-line">
                <div className="font-display font-bold text-[10px] uppercase tracking-wider text-akili-charbon-mute mb-3">
                  Compatible avec
                </div>
                <div className="flex flex-wrap gap-2">
                  {related.slice(0, 3).map((r) => (
                    <span
                      key={r.slug}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-akili-papyrus-deep border border-akili-line"
                      style={{ color: r.color }}
                    >
                      <r.Icon size={12} />
                      <span className="font-display font-bold text-[11px] text-akili-charbon">
                        {r.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-22 bg-akili-papyrus-warm">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Capabilities card */}
            <div>
              <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.18em] text-akili-coral">
                <Lightning size={14} weight="duotone" /> Capacités
              </div>
              <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mt-3">
                Ce qu'Akili peut faire
              </h2>
              <ul className="mt-5 space-y-2.5">
                {integration.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5 text-[14px] text-akili-charbon-soft leading-[1.5]">
                    <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5 text-akili-coral" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Triggers card */}
            <div>
              <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.18em] text-akili-or-900">
                <Plug size={14} weight="duotone" /> Déclencheurs
              </div>
              <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mt-3">
                Quand l'automatisation se lance
              </h2>
              <ul className="mt-5 space-y-2.5">
                {integration.triggers.map((trigger) => (
                  <li key={trigger} className="flex items-start gap-2.5 text-[14px] text-akili-charbon-soft leading-[1.5]">
                    <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5 text-akili-or-700" />
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions card */}
            <div>
              <div className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-[0.18em] text-akili-indigo">
                <FlowArrow size={14} weight="duotone" /> Actions
              </div>
              <h2 className="font-display font-extrabold text-2xl tracking-[-0.02em] mt-3">
                Ce qu'Akili sait faire dessus
              </h2>
              <ul className="mt-5 space-y-2.5">
                {integration.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2.5 text-[14px] text-akili-charbon-soft leading-[1.5]">
                    <CheckCircle size={16} weight="fill" className="shrink-0 mt-0.5 text-akili-indigo" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Templates qui utilisent cette intégration */}
      {usedInTemplates.length > 0 && (
        <section className="py-22 bg-akili-papyrus">
          <Container size="xl">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
                · Templates avec {integration.name} ·
              </span>
              <h2 className="font-display font-extrabold text-[36px] sm:text-[44px] leading-[1.05] tracking-[-0.03em] mt-4 text-balance">
                {usedInTemplates.length} template{usedInTemplates.length > 1 ? 's' : ''} qui utilise{usedInTemplates.length > 1 ? 'nt' : ''} {integration.name}.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {usedInTemplates.map((template) => (
                <Link
                  key={template.id}
                  to={`/templates/${template.id}`}
                  className="bg-white border border-akili-line rounded-akili p-5 hover:border-akili-coral hover:shadow-akili-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-akili bg-akili-papyrus-deep text-akili-coral flex items-center justify-center mb-4">
                    <template.Icon size={20} weight="duotone" />
                  </div>
                  <Badge variant="indigo" className="self-start">
                    {template.category}
                  </Badge>
                  <h3 className="font-display font-bold text-[15px] leading-[1.25] mt-3 text-balance">
                    {template.name}
                  </h3>
                  <p className="font-sans text-[12px] text-akili-charbon-mute mt-2 line-clamp-2">
                    {template.desc}
                  </p>
                  <div className="mt-auto pt-4 inline-flex items-center gap-1.5 font-display font-bold text-[11px] uppercase tracking-wider text-akili-coral">
                    Voir <ArrowRight size={11} weight="bold" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/templates" className="font-display font-bold text-sm text-akili-coral hover:text-akili-coral-700 transition-colors">
                Voir les 20 templates →
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Related integrations */}
      {related.length > 0 && (
        <section className="py-22 bg-akili-papyrus-warm">
          <Container size="xl">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-display font-bold text-xs tracking-[0.18em] uppercase text-akili-coral">
                · Souvent utilisé avec ·
              </span>
              <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] leading-[1.05] tracking-[-0.02em] mt-4">
                Combinaisons populaires avec {integration.name}
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/integrations/${r.slug}`}
                  className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-akili-line rounded-full hover:border-akili-or hover:shadow-akili-md transition-all duration-300"
                >
                  <span style={{ color: r.color }}>
                    <r.Icon size={18} />
                  </span>
                  <span className="font-display font-bold text-sm">{r.name}</span>
                  <ArrowRight size={12} weight="bold" className="text-akili-charbon-mute" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA />
    </MarketingLayout>
  );
}
